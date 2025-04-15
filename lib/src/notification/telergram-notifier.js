"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramNotifier = void 0;
const strings_1 = require("../utils/strings");
class TelegramNotifier {
    constructor() {
        this.botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!this.botToken) {
            throw new Error('TELEGRAM_BOT_TOKEN is missing!');
        }
        this.chatId = process.env.TELEGRAM_CHAT_ID;
        if (!this.chatId) {
            throw new Error('TELEGRAM_CHAT_ID is missing!');
        }
    }
    async sendMessage(message, extras = []) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        const payload = {
            chat_id: this.chatId,
            text: (0, strings_1.markdownV2Escape)(message),
            parse_mode: 'MarkdownV2',
            reply_markup: {
                inline_keyboard: [
                    extras
                        .filter(({ type }) => ['open-link'].includes(type))
                        .map((extra) => ({
                        text: extra.text,
                        url: extra.link,
                    })),
                ],
            },
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
        }
        catch (error) {
            console.error('Error sending message via Telegram:', error);
        }
    }
}
exports.TelegramNotifier = TelegramNotifier;
