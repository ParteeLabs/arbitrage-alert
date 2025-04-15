"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleNotifier = void 0;
class ConsoleNotifier {
    async sendMessage(message, extras = []) {
        console.log(message, ...extras.map(({ text, link }) => `${text}: ${link}`));
    }
}
exports.ConsoleNotifier = ConsoleNotifier;
