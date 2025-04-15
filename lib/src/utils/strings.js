"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownV2Escape = markdownV2Escape;
function markdownV2Escape(str) {
    return str.replaceAll(/>|\.|-|!/g, (m) => `\\${m}`);
}
