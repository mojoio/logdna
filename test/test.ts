import { expect, tap } from '@pushrocks/tapbundle';
import * as logdna from '../ts/index';

import { Qenv } from '@pushrocks/qenv';

const testQenv = new Qenv('./', './.nogit');

let testLogDnaAccount: logdna.LogdnaAccount;
let testLogMessage: logdna.LogdnaMessage;

tap.test('should create a valid logDna account', async () => {
  testLogDnaAccount = new logdna.LogdnaAccount();
});

tap.test('should create a standard log message', async () => {
  
});

tap.start();
