import { getQuoteFunc } from './interfaces/pair';

export class Core {
  constructor(private readonly getQuote: getQuoteFunc) {}

  // TODO: implement main function for setup token IDs, token addresses; fetch prices, check pool quote, alerts, etc...
  async run() {}
}
