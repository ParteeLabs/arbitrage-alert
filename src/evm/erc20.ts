import { ethers } from 'ethers';
import { erc20ABI } from '../abi/erc20.abi';
import { provider } from './evm';

const cache = new Map<string, number>();

export async function getERC20Decimals(tokenAddress: string): Promise<number> {
  try {
    if (cache.has(tokenAddress)) {
      return cache.get(tokenAddress)!;
    }
    const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
    const decimals = await contract.decimals();
    cache.set(tokenAddress, decimals);
    return decimals;
  } catch (error) {
    throw new Error(`Failed to fetch decimals: ${error}`);
  }
}
