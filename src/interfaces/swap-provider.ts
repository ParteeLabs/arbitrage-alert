import { Extra } from './notification-provider';

export interface SwapProvider {
  getExtras(leftAddress: string, rightAddress: string): Extra[];
}
