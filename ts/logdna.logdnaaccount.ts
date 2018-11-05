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
  public async sendLogdnaMessage(logdnaMessageArg: LogdnaMessage) {
    const lm = logdnaMessageArg;
    const euc = encodeURIComponent;

    const uriHostname = euc(lm.options.hostname);
    const uriMac = euc(lm.options.mac);
    const uriIp = euc(lm.options.ip);
    const uriTags = euc(
      (() => {
        return lm.options.tags.reduce((reduced, newItem) => {
          return `${reduced},${newItem}`;
        });
      })()
    );

    // let construct the request uri
    const requestUrlWithParams = `?hostname=${uriHostname}&mac=${uriMac}&ip=1${uriIp}&tags=${uriTags}`;

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
    this.sendLogdnaMessage(LogdnaMessage.fromSmartLogPackage(smartlogPackageArg));
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
