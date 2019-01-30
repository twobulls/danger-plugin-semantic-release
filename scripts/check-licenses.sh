#!/usr/bin/env bash
set -e

# Only check dev dependencies have compatible licenses
LICENSES="Apache 1.1;Apache-1.1;BSD*;BSD-2-Clause;BSD-3-Clause;ISC;MIT;WTFPL;Unlicense;"
EXCEPTIONS="aws-sign2@0.7.0;before-after-hook@1.3.2;bin-links@1.1.2;caseless@0.12.0;forever-agent@0.6.1;genfun@4.0.1;gentle-fs@2.0.1;json-schema@0.2.3;npm-lifecycle@2.1.0;npm@6.5.0;oauth-sign@0.9.0;qrcode-terminal@0.12.0;request@2.88.0;spdx-correct@3.0.0;spdx-correct@3.1.0;spdx-exceptions@2.1.0;spdx-exceptions@2.2.0;spdx-license-ids@3.0.0;spdx-license-ids@3.0.3;tunnel-agent@0.6.0;validate-npm-package-license@3.0.4;danger-plugin-semantic-release@0.0.0-development"

$(yarn bin)/license-checker --production --onlyAllow "$LICENSES" --excludePackages "$EXCEPTIONS"
