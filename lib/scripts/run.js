"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("dotenv/config");
const core_1 = require("src/core");
const uniswap_v2_pool_1 = require("src/evm/uniswap-v2-pool");
const console_notifier_1 = require("src/notification/console-notifier");
const telergram_notifier_1 = require("../src/notification/telergram-notifier");
const ancient8_swap_1 = require("../src/swap/ancient8-swap");
function getPoolProvider() {
    switch (process.env.POOL_PROVIDER) {
        case 'uniswap-v2':
        default:
            return new uniswap_v2_pool_1.UniswapV2Pool();
    }
}
function getNotifier() {
    switch (process.env.NOTIFIER) {
        case 'telegram':
            return new telergram_notifier_1.TelegramNotifier();
        case 'console':
        default:
            return new console_notifier_1.ConsoleNotifier();
    }
}
function getSwapProvider() {
    switch (process.env.SWAP_PROVIDER) {
        case 'ancient8-swap':
        default:
            return new ancient8_swap_1.Ancient8Swap();
    }
}
async function run() {
    const core = new core_1.Core(getPoolProvider(), getNotifier(), getSwapProvider());
    await core.run();
}
run();
