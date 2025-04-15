"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const coin_gecko_1 = require("./coingecko/coin-gecko");
const messages_1 = require("./notification/messages");
class Core {
    constructor(poolProvider, notificationProvider, swapProvider) {
        this.poolProvider = poolProvider;
        this.notificationProvider = notificationProvider;
        this.swapProvider = swapProvider;
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
    async run() {
        await Promise.all([this.loadPrices(), this.getQuote()]);
        const askSideProfit = this.getProfit(this.valuesInDollar[0], this.valuesInDollar[1]);
        const bidSideProfit = this.getProfit(this.valuesInDollar[1], this.valuesInDollar[2]);
        console.log(`Ask side profit: ${askSideProfit.toPrecision(4)}%`);
        console.log(`Bid side profit: ${bidSideProfit.toPrecision(4)}%`);
        const messages = [`Network: ${process.env.NETWORK_NAME || process.env.NETWORK_RPC}`];
        let extras;
        if (askSideProfit > this.minProfit) {
            messages.unshift(`Arbitrage opportunity found! ${(0, messages_1.getLevel)(askSideProfit).icon}`);
            messages.push(`${this.leftTokenId} -> ${this.rightTokenId}: ${askSideProfit.toPrecision(4)}%`);
            extras = this.swapProvider.getExtras(this.leftTokenAddress, this.rightTokenAddress);
        }
        else if (bidSideProfit > this.minProfit) {
            messages.unshift(`Arbitrage opportunity found! ${(0, messages_1.getLevel)(bidSideProfit).icon}`);
            messages.push(`${this.rightTokenId} -> ${this.leftTokenId}: ${bidSideProfit.toPrecision(4)}%`);
            extras = this.swapProvider.getExtras(this.rightTokenAddress, this.leftTokenAddress);
        }
        else {
            return;
        }
        await this.notificationProvider.sendMessage(messages.join('\n'), extras);
    }
    async loadPrices() {
        const { [this.leftTokenId]: left, [this.rightTokenId]: right } = await (0, coin_gecko_1.getCoinPrices)([this.leftTokenId, this.rightTokenId], 'usd');
        if (!left) {
            throw new Error('Price not found for LEFT token.');
        }
        if (!right) {
            throw new Error('Price not found for RIGHT token.');
        }
        this.leftTokenPrice = left;
        this.rightTokenPrice = right;
    }
    async getQuote() {
        /// Read sample amount.
        let sampleAmount = +(process.env.SAMPLE_AMOUNT || 1);
        /// Retch tokens global rates.
        const quote = await this.poolProvider.getQuote(sampleAmount, [
            this.leftTokenAddress,
            this.rightTokenAddress,
            this.leftTokenAddress,
        ]);
        this.valuesInDollar = [
            this.leftTokenPrice.usd * quote[0],
            this.rightTokenPrice.usd * quote[1],
            this.leftTokenPrice.usd * quote[2],
        ];
        console.log(`Values in dollar: ${this.valuesInDollar.join(' -> ')}`);
    }
    getProfit(leftValue, rightValue) {
        const delta = rightValue - leftValue;
        return (delta / leftValue) * 100;
    }
}
exports.Core = Core;
