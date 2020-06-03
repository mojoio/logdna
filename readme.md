# @mojoio/logdna
an unoffical package for the logdna api

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@mojoio/logdna)
* [gitlab.com (source)](https://gitlab.com/mojoio/logdna)
* [github.com (source mirror)](https://github.com/mojoio/logdna)
* [docs (typedoc)](https://mojoio.gitlab.io/logdna/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://gitlab.com/mojoio/logdna/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://gitlab.com/mojoio/logdna/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/@mojoio/logdna)](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/mojoio/logdna)](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/@mojoio/logdna)](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/@mojoio/logdna)](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/@mojoio/logdna)](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

## Usage

Use TypeScript for best in class instellisense.

This package is an unofficial package for the logdna.com service. It comes with the following features:

- aggregate logs that require the same uri query parameters and sends them as bundle. This ensures the correct order of logs within logdna.
- resend logs that failed to send.
- support smartlog messages and the smartlog ecosystem
- support giraffe.cloud ecosystem

```typescript
import { ILogPackage } from '@pushrocks/smartlog-interfaces';

import { LogdnaAccount, LogdnaMessage } from '@mojoio/logdna';

// lets create a logDnaAccount
const logDnaAccount = new LogdnaAccount(process.env.LOGDNA_APIKEY);

// lets create a smartlog message (smartlog normally takes care of creating those objects)
const smartlogPackage: ILogPackage = {
  timestamp: Date.now(),
  type: 'log',
  level: 'info',
  context: {
    company: 'Lossless GmbH',
    companyunit: 'lossless.cloud',
    containerName: 'ci-mojoio-logdna',
    environment: 'test',
    runtime: 'node',
    zone: 'shipzone'
  },
  message: 'this is an awesome log message sent by the tapbundle test'
};

const logdnaMessage = LogdnaMessage.fromSmartLogPackage(smartlogPackage);

logDnaAccount.sendLogdnaMessage(logdnaMessage);

// alternatively simply send the smartlogPackage
// creation of the LogdnaMessage is done for you
logDnaAccount.sendSmartlogPackage(smartlogPackage);

// most of the above funtions return promises should you want to wait for a log to be fully sent
```

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
