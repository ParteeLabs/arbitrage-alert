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
exports.getERC20Decimals = getERC20Decimals;
const ethers_1 = require("ethers");
const erc20_abi_1 = require("../abi/erc20.abi");
const evm_1 = require("./evm");
function getERC20Decimals(tokenAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = new ethers_1.ethers.Contract(tokenAddress, erc20_abi_1.erc20ABI, evm_1.provider);
            const decimals = yield contract.decimals();
            return decimals;
        }
        catch (error) {
            throw new Error(`Failed to fetch decimals: ${error}`);
        }
    });
}
