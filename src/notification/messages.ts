export const LEVELS = [
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

export function getLevel(percents: number) {
  if (percents > LEVELS[LEVELS.length - 1].percents) {
    return LEVELS[LEVELS.length - 1];
  }
  let level = LEVELS[0];
  for (let i = 1; i < LEVELS.length; i++) {
    if (percents <= LEVELS[i].percents) {
      level = LEVELS[i];
      break;
    }
  }
  return level;
}
