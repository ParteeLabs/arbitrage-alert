"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2Pool = void 0;
const ethers_1 = require("ethers");
const uniswap_v2_abi_1 = require("../abi/uniswap-v2.abi");
const evm_1 = require("./evm");
const erc20_1 = require("./erc20");
// Create a contract instance
class UniswapV2Pool {
    constructor() {
        if (!process.env.ROUTER_ADDRESS) {
            throw new Error('ROUTER_ADDRESS is missing!');
        }
        this.contract = new ethers_1.ethers.Contract(process.env.ROUTER_ADDRESS, uniswap_v2_abi_1.routerABI, evm_1.provider);
    }
    async getQuote(amountIn, path) {
        const amountsOutDecimals = await Promise.all(path.map(erc20_1.getERC20Decimals));
        try {
            const amounts = await this.contract.getAmountsOut((0, ethers_1.parseUnits)(amountIn.toString(), 18), path);
            return amounts.map((amount, i) => parseFloat((0, ethers_1.formatUnits)(amount, amountsOutDecimals[i])));
        }
        catch (error) {
            throw new Error(`Failed to fetch quote: ${error}`);
        }
    }
}
exports.UniswapV2Pool = UniswapV2Pool;
