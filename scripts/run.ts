import 'module-alias/register';
import 'dotenv/config';
import { Core } from 'src/core';
import { UniswapV2Pool } from 'src/evm/uniswap-v2-pool';
import { ConsoleNotifier } from 'src/notification/console-notifier';
import { TelegramNotifier } from '../src/notification/telergram-notifier';
import { Ancient8Swap } from '../src/swap/ancient8-swap';

function getPoolProvider() {
  switch (process.env.POOL_PROVIDER) {
    case 'uniswap-v2':
    default:
      return new UniswapV2Pool();
  }
}

function getNotifier() {
  switch (process.env.NOTIFIER) {
    case 'telegram':
      return new TelegramNotifier();
    case 'console':
    default:
      return new ConsoleNotifier();
  }
}

function getSwapProvider() {
  switch (process.env.SWAP_PROVIDER) {
    case 'ancient8-swap':
    default:
      return new Ancient8Swap();
  }
}

async function run() {
  const core = new Core(getPoolProvider(), getNotifier(), getSwapProvider());
  await core.run();
}

run();
