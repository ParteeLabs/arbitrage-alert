export type Extra = {
  text: string;
  link: string;
  type: 'open-link';
};

export interface NotificationProvider {
  sendMessage(message: string, extras?: Extra[]): Promise<void>;
}
