import * as plugins from './logdna.plugins';

import { TLogLevel, TEnvironment, ILogPackage } from '@pushrocks/smartlog-interfaces';

/**
 * the constructor options for LogdnaMessage
 */
export interface ILogdnaMessageContructorOptions {
  /**
   * the hostname where the log message was created
   */
  hostname: string;

  /**
   * mac
   */
  mac: string;

  /**
   * the ip ip where the message was created
   */
  ip: string;

  /**
   * a text message, that is the core part 
   */
  line: string;

  /**
   * the app name of the app logging
   */
  app: string;

  /**
   * the level of the log message
   */
  level: TLogLevel;

  /**
   * the environment of the log message
   */
  env: TEnvironment;

  /**
   * any metadata that is used
   */
  metaData: any;

  /**
   * an array of strings
   */
  tags: string[];
}

/**
 * a basic LogdnaMessage
 */
export class LogdnaMessage {
  static fromSmartLogPackage (smartlogPackageArg: ILogPackage): LogdnaMessage {
    return new LogdnaMessage({
      line: smartlogPackageArg.message,
      metaData: smartlogPackageArg.logContext,
      env: smartlogPackageArg.logContext.environment,
      hostname: smartlogPackageArg.logContext.zone,
      level: smartlogPackageArg.logLevel,
      app: smartlogPackageArg.logContext.zone,
      tags: [],
      ip: '0.0.0.0',
      mac: 'aa:aa:aa:aa:aa:aa'
    });
  };

  options: ILogdnaMessageContructorOptions;
  constructor(optionsArg: ILogdnaMessageContructorOptions) {
    this.options = optionsArg;
  };
}