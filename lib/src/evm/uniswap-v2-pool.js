"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getQuote(amountIn, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const amountsOutDecimals = yield Promise.all(path.map(erc20_1.getERC20Decimals));
            try {
                const amounts = yield this.contract.getAmountsOut((0, ethers_1.parseUnits)(amountIn.toString(), 18), path);
                return amounts.map((amount, i) => parseFloat((0, ethers_1.formatUnits)(amount, amountsOutDecimals[i])));
            }
            catch (error) {
                throw new Error(`Failed to fetch quote: ${error}`);
            }
        });
    }
}
exports.UniswapV2Pool = UniswapV2Pool;
