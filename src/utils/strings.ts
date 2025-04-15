export function markdownV2Escape(str: string) {
  return str.replaceAll(/\.|-|!/g, (m) => `\\${m}`);
}
