export interface PoolProvider {
  getQuote(amountIn: number, path: string[]): Promise<number[]>;
}
