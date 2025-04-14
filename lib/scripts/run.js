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
require("module-alias/register");
require("dotenv/config");
const core_1 = require("src/core");
const uniswap_v2_pool_1 = require("src/evm/uniswap-v2-pool");
const console_notifier_1 = require("src/notification/console-notifier");
const telergram_notifier_1 = require("../src/notification/telergram-notifier");
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const core = new core_1.Core(getPoolProvider(), getNotifier());
        yield core.run();
    });
}
run();
