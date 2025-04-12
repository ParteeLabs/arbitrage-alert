import { CoinMarketData } from './types';

export async function getCoinPrices(coinIds: string[], vsCurrency: string): Promise<Record<string, CoinMarketData>> {
  const url = new URL('https://api.coingecko.com/api/v3/simple/price');
  url.searchParams.set('ids', coinIds.join(','));
  url.searchParams.set('vs_currencies', vsCurrency);
  const response = await fetch(url);
  const data: Array<CoinMarketData> = await response.json();
  return Object.fromEntries(data.map((coin) => [coin.id, coin]));
}
