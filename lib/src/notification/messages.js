"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVELS = void 0;
exports.getLevel = getLevel;
exports.LEVELS = [
    {
        icon: '🟤',
        percents: 1,
        text: 'Very Low',
    },
    {
        icon: '🔹',
        percents: 10,
        text: 'Low',
    },
    {
        icon: '🔵',
        percents: 25,
        text: 'Moderate',
    },
    {
        icon: '🔸',
        percents: 50,
        text: 'High',
    },
    {
        icon: '🟠',
        percents: 75,
        text: 'Very High',
    },
    {
        icon: '♦️',
        percents: 100,
        text: 'Extremely High',
    },
    {
        icon: '🔴',
        percents: 150,
        text: 'Insane / Unusual',
    },
    {
        icon: '💥',
        percents: 200,
        text: 'Suspiciously High',
    },
];
function getLevel(percents) {
    if (percents > exports.LEVELS[exports.LEVELS.length - 1].percents) {
        return exports.LEVELS[exports.LEVELS.length - 1];
    }
    let level = exports.LEVELS[0];
    for (let i = 1; i < exports.LEVELS.length; i++) {
        if (percents <= exports.LEVELS[i].percents) {
            level = exports.LEVELS[i];
            break;
        }
    }
    return level;
}
