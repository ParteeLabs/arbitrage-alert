"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getERC20Decimals = getERC20Decimals;
const ethers_1 = require("ethers");
const erc20_abi_1 = require("../abi/erc20.abi");
const evm_1 = require("./evm");
async function getERC20Decimals(tokenAddress) {
    try {
        const contract = new ethers_1.ethers.Contract(tokenAddress, erc20_abi_1.erc20ABI, evm_1.provider);
        const decimals = await contract.decimals();
        return decimals;
    }
    catch (error) {
        throw new Error(`Failed to fetch decimals: ${error}`);
    }
}
