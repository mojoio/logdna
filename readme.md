# @mojoio/logdna
anunoffical package for the logdna api

## Availabililty
[![npm](https://mojoio.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/@mojoio/logdna)
[![git](https://mojoio.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/mojoio/logdna)
[![git](https://mojoio.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/mojoio/logdna)
[![docs](https://mojoio.gitlab.io/assets/repo-button-docs.svg)](https://mojoio.gitlab.io/logdna/)

## Status for master
[![build status](https://GitLab.com/mojoio/logdna/badges/master/build.svg)](https://GitLab.com/mojoio/logdna/commits/master)
[![coverage report](https://GitLab.com/mojoio/logdna/badges/master/coverage.svg)](https://GitLab.com/mojoio/logdna/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@mojoio/logdna.svg)](https://www.npmjs.com/package/@mojoio/logdna)
[![Known Vulnerabilities](https://snyk.io/test/npm/@mojoio/logdna/badge.svg)](https://snyk.io/test/npm/@mojoio/logdna)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
Use TypeScript for best in class instellisense.

This package is an unofficial package for the logdna. It comes with the following festures:

* aggregates logs that require the same uri query parameters and sends them as bundle. This ensures the correct order of logs
* resends logs that failed to send.
* supports smartlog messages and the smartlog ecosystem

```typescript
import { ILogPackage } from '@pushrocks/smartlog-interfaces'

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

const logDnaMessage = LogdnaMessage.fromSmartLogPackage(smartlogPackage);

logDnaAccount.sendLogDnaMessage(logDnaMessage);

// alternatively simply send the smartlogPackage
// creation of the LogdnaMessage is done for you
logDnaAccount.sendSmartlogPackage(smartlogPackage)

// most of the above funtions return promises should you want to wait for a log to be fully sent
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://mojoio.gitlab.io/assets/repo-footer.svg)](https://mojo.io)
