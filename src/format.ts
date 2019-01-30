import { ChangelogConfig } from './config';
import { ReleaseResult, Release } from './dry-run';
import { escapeMarkdownCharacters, indentAfterNewLines } from './filename-utils';

export declare function markdown(message: string): void;

export function formatSafeNote(note: string): string {
  return indentAfterNewLines(escapeMarkdownCharacters(note));
}

export function formatChangelogSection(release: ReleaseResult): string {
  const { nextRelease } = release;

  if (nextRelease === false) {
    return ``;
  }

  const notes = nextRelease.notes.reduce((list, current) => {
    return `${list}\n*${formatSafeNote(current)}`;
  }, '');
  return `# Release Notes\n${notes}\n`;
}

export function formatCommitSlug(commit: string): string {
  return commit.substr(0, Math.min(commit.length, 8));
}

export function formatCommitLink(commit: string): string {
  return escapeMarkdownCharacters(`../blob/${commit}`);
}

export function formatVersionRow(name: string, release: Release | false): string {
  if (release === false) {
    return `No ${name} | | | `;
  }

  const slug = formatCommitSlug(release.gitHead);
  return `${name} | ${release.version} | [${slug}](${formatCommitLink(release.gitHead)})`;
}

export function formatVersionSection(release: ReleaseResult): string {
  const nextName = release.nextRelease !== false ? `Next(${release.nextRelease.type})` : 'Next';

  return `# Version Info
Release | Version | Git Commit
------- | ------- | ----------
${formatVersionRow('Last', release.lastRelease)}
${formatVersionRow(nextName, release.nextRelease)}

`;
}

export function formatMessage(config: ChangelogConfig, release: ReleaseResult): string | undefined {
  if (config.showChangelog === false && config.showProjectedVersion === false) {
    return;
  }

  const version = formatVersionSection(release);
  const notes = formatChangelogSection(release);
  let body = '';
  if (config.showProjectedVersion) {
    body += version;
  }
  if (config.showChangelog) {
    body += notes;
  }
  return body;
}
