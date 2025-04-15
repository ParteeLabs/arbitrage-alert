import { Extra, NotificationProvider } from '../interfaces/notification-provider';

export class ConsoleNotifier implements NotificationProvider {
  async sendMessage(message: string, extras: Extra[] = []): Promise<void> {
    console.log(message, ...extras.map(({ text, link }) => `${text}: ${link}`));
  }
}
