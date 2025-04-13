import { ethers, formatUnits, parseUnits } from 'ethers';
import { routerABI } from '../abi/uniswap-v2.abi';
import { provider } from './evm';
import { getERC20Decimals } from './erc20';
import { PoolProvider } from '../interfaces/pool-provider';

// Create a contract instance
export class UniswapV2Pool implements PoolProvider {
  private contract: ethers.Contract;

  constructor() {
    if (!process.env.ROUTER_ADDRESS) {
      throw new Error('ROUTER_ADDRESS is missing!');
    }
    this.contract = new ethers.Contract(process.env.ROUTER_ADDRESS!, routerABI, provider);
  }

  async getQuote(amountIn: number, path: string[]): Promise<number[]> {
    const amountsOutDecimals = await Promise.all(path.map(getERC20Decimals));
    try {
      const amounts: bigint[] = await this.contract.getAmountsOut(parseUnits(amountIn.toString(), 18), path);
      return amounts.map((amount, i) => parseFloat(formatUnits(amount, amountsOutDecimals[i])));
    } catch (error) {
      throw new Error(`Failed to fetch quote: ${error}`);
    }
  }
}
