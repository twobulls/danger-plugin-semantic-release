import {
  formatChangelogSection,
  formatCommitSlug,
  formatCommitLink,
  formatVersionRow,
  formatVersionSection,
  formatMessage
} from './format';
import { ReleaseResult, Release, NextRelease } from './dry-run';
import { ChangelogConfig } from './config';

function makeReleaseResult(): ReleaseResult {
  return {
    lastRelease: {
      version: '1.0.0',
      gitHead: 'AAAAAA',
      gitTag: '1.0.0'
    },
    nextRelease: {
      version: '1.0.1',
      gitHead: 'AAAAAB',
      notes: 'ABC',
      type: 'minor',
      gitTag: '1.0.1'
    }
  };
}

describe('formatChangelogSection', () => {
  it('formats the release notes as a markdown list', () => {
    const notes = 'The notes';
    const release = makeReleaseResult();
    (release.nextRelease as NextRelease).notes = notes;
    const changelog = formatChangelogSection(release);
    expect(changelog).toMatchInlineSnapshot(`
"# Release Notes
The first note,The second note,The third note
"
`);
  });
});

describe('formatCommitSlug', () => {
  it('shortens the commit slug to 8 characters', () => {
    const result = formatCommitSlug('ABCDEFGHIJKLMNOPQRST');
    expect(result).toBe('ABCDEFGH');
  });
});

describe('formatCommitLink', () => {
  it('returns a relative blob url', () => {
    const result = formatCommitLink('ABCDEFGHIJKLMNOPQRST');
    expect(result).toBe('../blob/ABCDEFGHIJKLMNOPQRST');
  });
});

describe('formatVersionRow', () => {
  it('returns a row with the correct version info', () => {
    const release: Release = {
      gitHead: 'ABCDEFGH',
      gitTag: '1.0.0',
      version: '1.0.0'
    };
    const result = formatVersionRow('Next', release);
    expect(result).toMatchInlineSnapshot(`"Next | 1.0.0 | [ABCDEFGH](../blob/ABCDEFGH)"`);
  });
});

describe('formatVersionSection', () => {
  it('returns a table with next and previous release info ', () => {
    const release = makeReleaseResult();
    const result = formatVersionSection(release);
    expect(result).toMatchInlineSnapshot(`
"# Version Info
Release | Version | Git Commit
------- | ------- | ----------
Last | 1.0.0 | [AAAAAA](../blob/AAAAAA)
Next(minor) | 1.0.1 | [AAAAAB](../blob/AAAAAB)

"
`);
  });
});

describe('formatMessage', () => {
  it('returns undefined if nothing is set to be displayed', () => {
    const release = makeReleaseResult();
    const config: ChangelogConfig = { showChangelog: false, showProjectedVersion: false };
    const result = formatMessage(config, release);
    expect(result).toBeUndefined();
  });
  it('returns just the version section if only that is enabled', () => {
    const release = makeReleaseResult();
    const config: ChangelogConfig = { showChangelog: false, showProjectedVersion: true };
    const result = formatMessage(config, release);
    const version = formatVersionSection(release);
    expect(result).toBe(version);
  });
  it('returns just the changelog section if only that is enabled', () => {
    const release = makeReleaseResult();
    const config: ChangelogConfig = { showChangelog: true, showProjectedVersion: false };
    const result = formatMessage(config, release);
    const changelog = formatChangelogSection(release);
    expect(result).toBe(changelog);
  });

  it('returns the version and changelog sections when both are enabled', () => {
    const release = makeReleaseResult();
    const config: ChangelogConfig = { showChangelog: true, showProjectedVersion: true };
    const result = formatMessage(config, release);
    const changelog = formatChangelogSection(release);
    const version = formatVersionSection(release);
    expect(result).toBe(`${version}${changelog}`);
  });
});
