const semanticRelease = require('semantic-release'); // Semantic release API doesn't have any types
import { WritableStreamBuffer } from 'stream-buffers';

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
  lastRelease: Release | false;
  nextRelease: NextRelease | false;
}

export async function dryRunRelease(): Promise<ReleaseResult | undefined> {
  const stdoutBuffer = new WritableStreamBuffer(); // Silences output from semantic release
  const stderrBuffer = new WritableStreamBuffer();
  const result = await semanticRelease({ dryRun: true }, { stdout: stdoutBuffer, stderr: stderrBuffer });

  if (!result) {
    // The API returns false instead of undefined for some reason.
    return undefined;
  }
  return result;
}
