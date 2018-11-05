import { expect, tap } from '@pushrocks/tapbundle';
import * as logdna from '../ts/index';

import { Qenv } from '@pushrocks/qenv';
import { ILogPackage } from '@pushrocks/smartlog-interfaces';

const testQenv = new Qenv('./', './.nogit');

let testLogDnaAccount: logdna.LogdnaAccount;
let testLogMessage: logdna.LogdnaMessage;

tap.test('should create a valid logDna account', async () => {
  testLogDnaAccount = new logdna.LogdnaAccount(process.env.LOGDNA_APIKEY);
});

tap.test('should create a standard log message', async () => {
  testLogMessage = logdna.LogdnaMessage.fromSmartLogPackage({
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
  });
});

tap.test('should send the message', async () => {
  await testLogDnaAccount.sendLogdnaMessage(testLogMessage);
});

tap.test('should send in order', async () => {
  let i = 1;
  while (i < 21) {
    const testSmartlogMessage: ILogPackage = {
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
      message: `this is an awesome log message sent by the tapbundle test #${i}`
    };
    testLogDnaAccount.sendSmartlogPackage(testSmartlogMessage);
    i++;
  }
  
  
})

tap.start();
