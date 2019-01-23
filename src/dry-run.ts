const semanticRelease = require('semantic-release'); // Semantic release API doesn't have any types

export interface Release {
  version: string;
  gitHead: string;
  gitTag: string;
}

export interface NextRelease extends Release {
  notes: string[];
  type: 'patch' | 'minor' | 'major';
}

export interface ReleaseResult {
  lastRelease: Release;
  nextRelease: NextRelease;
}

export function dryRunRelease(): Promise<ReleaseResult | undefined> {
  return semanticRelease({ dryRun: true });
}
