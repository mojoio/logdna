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
  meta: any;

  /**
   * an array of strings
   */
  tags: string[];
}

/**
 * a basic LogdnaMessage
 */
export class LogdnaMessage {
  /**
   * create lgdna messages from smartlog package
   * @param smartlogPackageArg
   */
  static fromSmartLogPackage(smartlogPackageArg: ILogPackage): LogdnaMessage {
    return new LogdnaMessage({
      line: smartlogPackageArg.message,
      meta: smartlogPackageArg.logContext,
      env: smartlogPackageArg.logContext.environment,
      hostname: smartlogPackageArg.logContext.zone,
      level: smartlogPackageArg.logLevel,
      app: smartlogPackageArg.logContext.zone,
      tags: (() => {
        const tagArray: string[] = [];
        tagArray.push(smartlogPackageArg.logContext.company);
        tagArray.push(smartlogPackageArg.logContext.companyunit);
        return tagArray;
      })(),
      ip: '0.0.0.0',
      mac: 'aa:aa:aa:aa:aa:aa'
    });
  }

  /**
   * the options of this log message
   */
  public options: ILogdnaMessageContructorOptions;
  constructor(optionsArg: ILogdnaMessageContructorOptions) {
    this.options = optionsArg;
  }
}
