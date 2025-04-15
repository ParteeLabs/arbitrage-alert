"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ancient8Swap = void 0;
class Ancient8Swap {
    getExtras(leftAddress, rightAddress) {
        return [
            {
                text: 'Swap now!',
                link: `https://app.ancient8.gg/swap?in=${leftAddress}&out=${rightAddress}`,
                type: 'open-link',
            },
        ];
    }
}
exports.Ancient8Swap = Ancient8Swap;
