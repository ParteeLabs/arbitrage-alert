import { NotificationProvider } from '../interfaces/notification-provider';

export class ConsoleNotifier implements NotificationProvider {
  async sendMessage(message: string): Promise<void> {
    console.log(message);
  }
}
