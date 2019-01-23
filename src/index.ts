import { completeConfiguration, ChangelogConfig } from 'config';
import { dryRunRelease } from 'dry-run';
import { formatMessage } from 'format';

declare function markdown(message: string): void;

export async function reportSemanticRelease(config?: Partial<ChangelogConfig>): Promise<void> {
  const completeConfig = completeConfiguration(config);

  const result = await dryRunRelease();
  if (result === undefined) {
    return;
  }
  const message = formatMessage(completeConfig, result);
  if (message) {
    markdown(message);
  }
}
