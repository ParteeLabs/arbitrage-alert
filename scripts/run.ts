import 'module-alias/register';
import 'dotenv/config';
import { Core } from 'src/core';
import { UniswapV2Pool } from 'src/evm/uniswap-v2-pool';
import { ConsoleNotifier } from 'src/notification/console-notifier';

function getPoolProvider() {
  switch (process.env.POOL_PROVIDER) {
    case 'uniswap-v2':
    default:
      return new UniswapV2Pool();
  }
}

function getNotifier() {
  switch (process.env.NOTIFIER) {
    case 'console':
    default:
      return new ConsoleNotifier();
  }
}

async function run() {
  const core = new Core(getPoolProvider(), getNotifier());
  await core.run();
}

run();
