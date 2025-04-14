import { getCoinPrices } from './coingecko/coin-gecko';
import { PoolProvider } from './interfaces/pool-provider';
import { NotificationProvider } from './interfaces/notification-provider';
import { getLevel } from './notification/messages';

export class Core {
  private readonly leftTokenId: string;
  private readonly leftTokenAddress: string;
  private readonly rightTokenId: string;
  private readonly rightTokenAddress: string;
  private readonly minProfit: number;

  constructor(
    private readonly poolProvider: PoolProvider,
    private readonly notificationProvider: NotificationProvider
  ) {
    this.leftTokenId = process.env.LEFT_TOKEN_ID!;
    if (!this.leftTokenId) {
      throw new Error('LEFT_TOKEN_ID is missing!');
    }
    this.leftTokenAddress = process.env.LEFT_TOKEN_ADDRESS!;
    if (!this.leftTokenAddress) {
      throw new Error('LEFT_TOKEN_ADDRESS is missing!');
    }
    this.rightTokenId = process.env.RIGHT_TOKEN_ID!;
    if (!this.rightTokenId) {
      throw new Error('RIGHT_TOKEN_ID is missing!');
    }
    this.rightTokenAddress = process.env.RIGHT_TOKEN_ADDRESS!;
    if (!this.rightTokenAddress) {
      throw new Error('RIGHT_TOKEN_ADDRESS is missing!');
    }
    this.minProfit = +(process.env.MIN_PROFIT || 5);
  }

  // TODO: implement main function for setup token IDs, token addresses; fetch prices, check pool quote, alerts, etc...
  async run() {
    /// Read sample amount.
    let sampleAmount = +(process.env.SAMPLE_AMOUNT || 1);
    /// Retch tokens global rates.
    const { [this.leftTokenId]: leftTokenPrice, [this.rightTokenId]: rightTokenPrice } = await getCoinPrices(
      [this.leftTokenId, this.rightTokenId],
      'usd'
    );
    if (!leftTokenPrice) {
      throw new Error('Price not found for LEFT token');
    }
    if (!rightTokenPrice) {
      throw new Error('Price not found for RIGHT token');
    }

    const quote = await this.poolProvider.getQuote(sampleAmount, [
      this.leftTokenAddress,
      this.rightTokenAddress,
      this.leftTokenAddress,
    ]);
    const valuesInDollar = [
      leftTokenPrice.usd * quote[0],
      rightTokenPrice.usd * quote[1],
      leftTokenPrice.usd * quote[2],
    ];
    console.log(`Values in dollar: ${valuesInDollar.join(' -> ')}`);
    /// Ask side check
    const askSideProfit = await this.getProfit(valuesInDollar[0], valuesInDollar[1]);
    console.log(`Ask side profit: ${askSideProfit.toPrecision(4)}%`);
    if (askSideProfit > this.minProfit) {
      await this.notificationProvider.sendMessage(
        [
          `Arbitrage opportunity found! ${getLevel(askSideProfit).icon}`,
          `Network: ${process.env.NETWORK_NAME || process.env.NETWORK_RPC}`,
          `${this.leftTokenId} -> ${this.rightTokenId}: ${askSideProfit.toPrecision(4)}%`,
        ].join('\n')
      );
      return;
    }

    /// Bid side check
    const bidSideProfit = await this.getProfit(valuesInDollar[1], valuesInDollar[2]);
    console.log(`Bid side profit: ${bidSideProfit.toPrecision(4)}%`);
    if (bidSideProfit > this.minProfit) {
      await this.notificationProvider.sendMessage(
        [
          `Arbitrage opportunity found! ${getLevel(bidSideProfit).icon}`,
          `Network: ${process.env.NETWORK_NAME || process.env.NETWORK_RPC}`,
          `${this.rightTokenId} -> ${this.leftTokenId}: ${bidSideProfit.toPrecision(4)}%`,
        ].join('\n')
      );
    }
  }

  private async getProfit(leftValue: number, rightValue: number) {
    const delta = rightValue - leftValue;
    return (delta / leftValue) * 100;
  }
}
