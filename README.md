# arbitrage-alert

crypto arbitrage detection tool that monitors liquidity pools and notifies you whenever a profitable arbitrage opportunity is found.
Ideal for DeFi traders, market makers, or anyone looking to take advantage of price inefficiencies between pools or exchanges.

# Usage

## Pre-requirements

- Node.js 14+
- npm 6+
- pnpm 10

## Installation & run

1. Install package dependencies

```
pnpm install --production
```

2. Add `.env` file with following environment variables:

| Variable              | Description                                                | Example                                      |
| --------------------- | ---------------------------------------------------------- | -------------------------------------------- |
| `NETWORK_RPC`         | Targeted network RPC URL                                   | `https://rpc.ancient8.gg`                    |
| `NETWORK_NAME`        | Targeted network name                                      | `Ethereum`                                   |
| `ROUTER_ADDRESS`      | Targeted router contract address                           | `0x88030786602B30f41E9e8ADAfaFb2A7C16A4dBBF` |
| `LEFT_TOKEN_ID`       | Left token ID from CoinGecko                               | `ancient8`                                   |
| `LEFT_TOKEN_ADDRESS`  | Address of left side token                                 | `0xD812d616A7C54ee1C8e9c9CD20D72090bDf0d424` |
| `RIGHT_TOKEN_ID`      | Right token ID from CoinGecko                              | `ethereum`                                   |
| `RIGHT_TOKEN_ADDRESS` | Address of right side token                                | `0x4200000000000000000000000000000000000006` |
| `MIN_PROFIT`          | Minimum profit percentage for the tool to trigger an alert | `1`                                          |
| `NOTIFIER`            | Notification method                                        | `console` or `telegram`                      |
| `POOL_PROVIDER`       | Pool provider to fetch the pair from                       | `uniswap-v2`                                 |
| `TELEGRAM_BOT_TOKEN`  | Telegram bot token                                         | `123456:XXXXXXXXXXX`                         |
| `TELEGRAM_CHAT_ID`    | Telegram chat ID                                           | `-100XXXXXXXX`                               |
| `SAMPLE_AMOUNT`       | Sample amount to calculate profit                          | `100`                                        |
| `SWAP_PROVIDER`       | Swap provider to use extra functions                       | `ancient8-swap`                              |

3. Run start script

```
pnpm start
```
