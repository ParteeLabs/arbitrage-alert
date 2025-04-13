import { CoinSimplePrice } from './types';

export async function getCoinPrices(coinIds: string[], vsCurrency: string): Promise<CoinSimplePrice> {
  const url = new URL('https://api.coingecko.com/api/v3/simple/price');
  url.searchParams.set('ids', coinIds.join(','));
  url.searchParams.set('vs_currencies', vsCurrency);
  const response = await fetch(url);
  return await response.json();
}
