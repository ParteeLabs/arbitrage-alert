import { ethers } from 'ethers';

export const provider = new ethers.JsonRpcProvider(process.env.NETWORK_RPC);
