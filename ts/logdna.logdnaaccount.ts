import * as plugins from './logdna.plugins';

import { LogdnaMessage } from './logdna.classes.logmessage';
import { LogAggregator } from './logdna.aggregator';
import { ILogPackage, ILogDestination } from '@pushrocks/smartlog-interfaces';

/**
 * the main logdna account
 */
export class LogdnaAccount {
  private logAggregator: LogAggregator;

  /**
   *
   * @param apiKeyArg
   */
  constructor(apiKeyArg: string) {
    this.logAggregator = new LogAggregator(apiKeyArg);
  }

  /**
   * sends a logmessage
   * async, so it returns a Promise. In most cases it does not make sense to wait for it though.
   */
  public async sendLogDnaMessage(logdnaMessageArg: LogdnaMessage) {
    const lm = logdnaMessageArg;
    const euc = encodeURIComponent;

    // let construct the request uri
    const requestUrlWithParams = `?hostname=${euc(lm.options.hostname)}&mac=${euc(
      lm.options.mac
    )}&ip=1${euc(lm.options.ip)}&tags=${euc(
      (() => {
        return lm.options.tags.reduce((reduced, newItem) => {
          return `${reduced},${newItem}`;
        });
      })()
    )}`;
    
    const logLine = {
      timestamp: lm.options.timestamp,
      line: lm.options.line,
      app: lm.options.app,
      level: lm.options.level,
      env: lm.options.env,
      meta: lm.options.meta
    };

    this.logAggregator.addLog(requestUrlWithParams, logLine);
    
  }

  /**
   * convenience function for smartlog
   */
  public async sendSmartlogPackage(smartlogPackageArg: ILogPackage) {
    this.sendLogDnaMessage(LogdnaMessage.fromSmartLogPackage(smartlogPackageArg));
  }

  /**
   * returns a smartlog compatible log destination
   */
  public get smartlogDestination(): ILogDestination {
    return {
      handleLog: logPackageArg => {
        this.sendSmartlogPackage(logPackageArg);
      }
    };
  }
}
