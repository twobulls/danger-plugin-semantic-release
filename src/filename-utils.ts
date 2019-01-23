function isEscapedCharacter(char: string) {
  const escapedCharacters = ['|', '(', ')', '[', ']', '#', '*', '{', '}', '-', '+', '_', '!', '\\', '`'];
  for (const escapedChar of escapedCharacters) {
    if (char === escapedChar) {
      return true;
    }
  }
  return false;
}

/**
 * Escapes the characters |()[]#*{}-+_!\,`> from a string.
 * @param source The source to escape
 * @returns An escaped version of the string
 */
export function escapeMarkdownCharacters(source: string) {
  return [...source].map(c => (isEscapedCharacter(c) ? `\\${c}` : c)).join('');
}
