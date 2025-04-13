export interface NotificationProvider {
  sendMessage(message: string): Promise<void>;
}
