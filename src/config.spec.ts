import { completeConfiguration } from './config';

describe('completeConfiguration', () => {
  it('returns a default configuration when called without a configuration', () => {
    const output = completeConfiguration();
    expect(output).toEqual({ showChangelog: true, showProjectedVersion: true });
  });

  it('returns a config with overwritten values', () => {
    const output = completeConfiguration({ showChangelog: false });
    expect(output).toEqual({ showChangelog: false, showProjectedVersion: true });
  });
});
