import { escapeMarkdownCharacters, indentAfterNewLines } from './filename-utils';

describe('escapeMarkdownCharacters', () => {
  it("escapes filenames with '|,(,),[,],#,*,{,},-,+,_,!,\\,`>' characters", () => {
    const filename = `src/file-with-characters{[(|#*-+_!\`)]}.ts`;
    const expectedFilename = `src/file\\-with\\-characters\\{\\[\\(\\|\\#\\*\\-\\+\\_\\!\\\`\\)\\]\\}.ts`;
    const output = escapeMarkdownCharacters(filename);
    expect(output).toEqual(expectedFilename);
  });
});

describe('indentAfterNewLines', () => {
  it('adds indentation after newline characters', () => {
    const input = `this is  a \nstring with two\nnew lines`;
    const expected = `this is  a \n  string with two\n  new lines`;
    const output = indentAfterNewLines(input);
    expect(output).toEqual(expected);
  });
});
