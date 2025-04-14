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
exports.Core = void 0;
const coin_gecko_1 = require("./coingecko/coin-gecko");
const messages_1 = require("./notification/messages");
class Core {
    constructor(poolProvider, notificationProvider) {
        this.poolProvider = poolProvider;
        this.notificationProvider = notificationProvider;
        this.leftTokenId = process.env.LEFT_TOKEN_ID;
        if (!this.leftTokenId) {
            throw new Error('LEFT_TOKEN_ID is missing!');
        }
        this.leftTokenAddress = process.env.LEFT_TOKEN_ADDRESS;
        if (!this.leftTokenAddress) {
            throw new Error('LEFT_TOKEN_ADDRESS is missing!');
        }
        this.rightTokenId = process.env.RIGHT_TOKEN_ID;
        if (!this.rightTokenId) {
            throw new Error('RIGHT_TOKEN_ID is missing!');
        }
        this.rightTokenAddress = process.env.RIGHT_TOKEN_ADDRESS;
        if (!this.rightTokenAddress) {
            throw new Error('RIGHT_TOKEN_ADDRESS is missing!');
        }
        this.minProfit = +(process.env.MIN_PROFIT || 5);
    }
    // TODO: implement main function for setup token IDs, token addresses; fetch prices, check pool quote, alerts, etc...
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            /// Read sample amount.
            let sampleAmount = +(process.env.SAMPLE_AMOUNT || 1);
            /// Retch tokens global rates.
            const { [this.leftTokenId]: leftTokenPrice, [this.rightTokenId]: rightTokenPrice } = yield (0, coin_gecko_1.getCoinPrices)([this.leftTokenId, this.rightTokenId], 'usd');
            if (!leftTokenPrice) {
                throw new Error('Price not found for LEFT token');
            }
            if (!rightTokenPrice) {
                throw new Error('Price not found for RIGHT token');
            }
            const quote = yield this.poolProvider.getQuote(sampleAmount, [
                this.leftTokenAddress,
                this.rightTokenAddress,
                this.leftTokenAddress,
            ]);
            /// Ask side check
            const askSideProfit = yield this.getProfit(leftTokenPrice.usd * sampleAmount, rightTokenPrice.usd * quote[0]);
            if (askSideProfit > this.minProfit) {
                yield this.notificationProvider.sendMessage([
                    `Arbitrage opportunity found! ${(0, messages_1.getLevel)(askSideProfit).icon}`,
                    `Network: ${process.env.NETWORK_NAME || process.env.NETWORK_RPC}`,
                    `${this.leftTokenId} -> ${this.rightTokenId}: ${askSideProfit.toPrecision(4)}%`,
                ].join('\n'));
                return;
            }
            /// Bid side check
            const bidSideProfit = yield this.getProfit(rightTokenPrice.usd * quote[1], leftTokenPrice.usd * quote[2]);
            if (bidSideProfit > this.minProfit) {
                this.notificationProvider.sendMessage([
                    `Arbitrage opportunity found! ${(0, messages_1.getLevel)(bidSideProfit).icon}`,
                    `Network: ${process.env.NETWORK_NAME || process.env.NETWORK_RPC}`,
                    `${this.rightTokenId} -> ${this.leftTokenId}: ${bidSideProfit.toPrecision(4)}%`,
                ].join('\n'));
            }
        });
    }
    getProfit(leftValue, rightValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const delta = leftValue - rightValue;
            return (delta / leftValue) * 100;
        });
    }
}
exports.Core = Core;
