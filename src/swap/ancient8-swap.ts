import { Extra } from '../interfaces/notification-provider';
import { SwapProvider } from '../interfaces/swap-provider';

export class Ancient8Swap implements SwapProvider {
  getExtras(leftAddress: string, rightAddress: string): Extra[] {
    return [
      {
        text: 'Swap now!',
        link: `https://app.ancient8.gg/swap?in=${leftAddress}&out=${rightAddress}`,
        type: 'open-link',
      },
    ];
  }
}
