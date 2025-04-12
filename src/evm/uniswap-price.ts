import { ethers, formatUnits } from 'ethers';
import { routerABI } from '../abi/uniswap-v2.abi';
import { provider } from './evm';
import { getERC20Decimals } from './erc20';

// Create a contract instance
const routerV2 = new ethers.Contract(process.env.ROUTER_ADDRESS!, routerABI, provider);

export async function getQuote(amountIn: string, path: string[]): Promise<number[]> {
  const amounts: bigint[] = await routerV2.getAmountsOut(amountIn, path);

  const amountsOutDecimals = await Promise.all(path.map(getERC20Decimals));

  const result = amounts.map((amount, i) => parseFloat(formatUnits(amount, amountsOutDecimals[i])));

  return result;
}
