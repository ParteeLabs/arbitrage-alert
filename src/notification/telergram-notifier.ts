import { NotificationProvider } from '../interfaces/notification-provider';

export class TelegramNotifier implements NotificationProvider {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN!;
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is missing!');
    }
    this.chatId = process.env.TELEGRAM_CHAT_ID!;
    if (!this.chatId) {
      throw new Error('TELEGRAM_CHAT_ID is missing!');
    }
  }

  async sendMessage(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    const payload = {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'Markdown',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText} - ${await response.text()}`);
      }
    } catch (error) {
      console.error('Error sending message via Telegram:', error);
    }
  }
}
