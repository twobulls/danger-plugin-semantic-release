import { escapeMarkdownCharacters } from './filename-utils';

describe('escapeMarkdownCharacters', () => {
  it("escapes filenames with '|,(,),[,],#,*,{,},-,+,_,!,\\,`>' characters", () => {
    const filename = `src/file-with-characters{[(|#*-+_!\`)]}.ts`;
    const expectedFilename = `src/file\\-with\\-characters\\{\\[\\(\\|\\#\\*\\-\\+\\_\\!\\\`\\)\\]\\}.ts`;
    const output = escapeMarkdownCharacters(filename);
    expect(output).toEqual(expectedFilename);
  });
});
