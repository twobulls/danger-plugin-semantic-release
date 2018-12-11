# danger-plugin-changelog

[![build status](https://cloud.drone.io/api/badges/twobulls/danger-plugin-changelog/status.svg)](https://cloud.drone.io/twobulls/danger-plugin-changelog)
[![npm version](https://badge.fury.io/js/danger-plugin-changelog.svg)](https://badge.fury.io/js/danger-plugin-semantic-release)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

> Danger.js plugin that surfaces changelog information about your semantically released npm packages.

## Usage

### At a Glance

```js
import { schedule } from 'danger';
import { changelog } from 'danger-plugin-changelog';

scheduler(changelog());
```

### In Depth

```js
import { schedule } from 'danger';
import { changelog } from 'danger-plugin-changelog';

scheduler(
  changelog({
    branches: ['master'], // Only logs when pushing to one of these branches. If left empty or unspecified, always logs. Exact matches only.
    showProjectedVersion: true, // Show the projected version of the next release. Defaults to true
    showChangelog: true // Show the changelog that would be generated if this change is published. Defaults to true
  })
);
```

## Vision

When using tools like semantic-release, often it's not always clear what the next version of the package being released will be, or what the changelog will look like. This library tackles that problem by previewing changelog additions and version changes, before it's too late to fix it.

## Changelog

See the GitHub [release history](https://github.com/twobulls/danger-plugin-changelog/releases).

## Contributing

Check our our [contributor](CONTRIBUTING.md) and [developer](DEVELOPER.md) guides.
