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

/**
 * Adds two characters of indentation after every new line.
 * @param source  The source string to add indents to.
 * @returns An indented version of the string.
 */
export function indentAfterNewLines(source: string) {
  return [...source].map(c => (c === '\n' ? '\n  ' : c)).join('');
}
