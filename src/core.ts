import { getCoinPrices } from './coingecko/coin-gecko';
import { PoolProvider } from './interfaces/pool-provider';
import { NotificationProvider } from './interfaces/notification-provider';
import { getLevel } from './notification/messages';
import { SwapProvider } from './interfaces/swap-provider';
import { CoinSimplePrice } from './coingecko/types';

export class Core {
  private readonly leftTokenId: string;
  private readonly leftTokenAddress: string;
  private readonly rightTokenId: string;
  private readonly rightTokenAddress: string;
  private readonly minProfit: number;

  private leftTokenPrice!: CoinSimplePrice[''];
  private rightTokenPrice!: CoinSimplePrice[''];
  private valuesInDollar!: number[];

  constructor(
    private readonly poolProvider: PoolProvider,
    private readonly notificationProvider: NotificationProvider,
    private readonly swapProvider: SwapProvider
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
    await Promise.all([this.loadPrices(), this.getQuote()]);
    const askSideProfit = this.getProfit(this.valuesInDollar[0], this.valuesInDollar[1]);
    const bidSideProfit = this.getProfit(this.valuesInDollar[1], this.valuesInDollar[2]);
    console.log(`Ask side profit: ${askSideProfit.toPrecision(4)}%`);
    console.log(`Bid side profit: ${bidSideProfit.toPrecision(4)}%`);

    const messages = [`Network: ${process.env.NETWORK_NAME || process.env.NETWORK_RPC}`];

    if (askSideProfit > this.minProfit) {
      messages.unshift(`Arbitrage opportunity found! ${getLevel(askSideProfit).icon}`);
      messages.push(`${this.leftTokenId} -> ${this.rightTokenId}: ${askSideProfit.toPrecision(4)}%`);
    } else if (bidSideProfit > this.minProfit) {
      messages.unshift(`Arbitrage opportunity found! ${getLevel(bidSideProfit).icon}`);
      messages.push(`${this.rightTokenId} -> ${this.leftTokenId}: ${bidSideProfit.toPrecision(4)}%`);
    } else {
      return;
    }

    await this.notificationProvider.sendMessage(
      messages.join('\n'),
      this.swapProvider.getExtras(this.leftTokenAddress, this.rightTokenAddress)
    );
  }

  private async loadPrices() {
    const { [this.leftTokenId]: left, [this.rightTokenId]: right } = await getCoinPrices(
      [this.leftTokenId, this.rightTokenId],
      'usd'
    );
    if (!left) {
      throw new Error('Price not found for LEFT token.');
    }
    if (!right) {
      throw new Error('Price not found for RIGHT token.');
    }
    this.leftTokenPrice = left;
    this.rightTokenPrice = right;
  }

  private async getQuote() {
    /// Read sample amount.
    let sampleAmount = +(process.env.SAMPLE_AMOUNT || 1);
    /// Retch tokens global rates.

    const quote = await this.poolProvider.getQuote(sampleAmount, [
      this.leftTokenAddress,
      this.rightTokenAddress,
      this.leftTokenAddress,
    ]);
    this.valuesInDollar = [
      this.leftTokenPrice.usd * quote[0],
      this.rightTokenPrice.usd * quote[1],
      this.leftTokenPrice.usd * quote[2],
    ];
    console.log(`Values in dollar: ${this.valuesInDollar.join(' -> ')}`);
  }

  private getProfit(leftValue: number, rightValue: number) {
    const delta = rightValue - leftValue;
    return (delta / leftValue) * 100;
  }
}
