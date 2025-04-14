"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramNotifier = void 0;
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
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
            const payload = {
                chat_id: this.chatId,
                text: message,
                parse_mode: 'Markdown',
            };
            try {
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    throw new Error(`Failed to send message: ${response.statusText} - ${yield response.text()}`);
                }
            }
            catch (error) {
                console.error('Error sending message via Telegram:', error);
            }
        });
    }
}
exports.TelegramNotifier = TelegramNotifier;
