import { ethers } from 'ethers';
import { erc20ABI } from '../abi/erc20.abi';
import { provider } from './evm';

export async function getERC20Decimals(tokenAddress: string): Promise<number> {
  const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
  const decimals = await contract.decimals();
  return decimals;
}
