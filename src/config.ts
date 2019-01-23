export interface ChangelogConfig {
  showChangelog: boolean;
  showProjectedVersion: boolean;
}

export function completeConfiguration(config?: Partial<ChangelogConfig>): ChangelogConfig {
  const defaultConfig: ChangelogConfig = {
    showChangelog: true,
    showProjectedVersion: true
  };
  if (config === undefined) {
    return defaultConfig;
  }
  return { ...defaultConfig, ...config };
}
