import * as plugins from './logdna.plugins';

import { LogdnaMessage } from './logdna.classes.logmessage';

/**
 * the main logdna account
 */
export class LogdnaAccount {
  apiKey: string;
  baseUrl = 'https://logs.logdna.com/logs/ingest';

  /**
   * Create basic authentication
   */
  createBasicAuth() {
    const userNamePasswordString = `${this.apiKey}:`;
    return `Basic ${plugins.smartstring.base64.encode(userNamePasswordString)}`;
  }

  /**
   *
   * @param apiKeyArg
   */
  constructor(apiKeyArg: string) {
    this.apiKey = apiKeyArg;
  }

  /**
   * sends a logmessage
   * async, so it returns a Promise. In most cases it does not make sense to wait for it though.
   */
  public async sendLogDnaMessage(logdnaMessageArg: LogdnaMessage) {
    const lm = logdnaMessageArg;
    const euc = encodeURIComponent;

    // let construct the request uri
    const requestUrlWithParams = `${this.baseUrl}?hostname=${euc(lm.options.hostname)}&mac=${euc(
      lm.options.mac
    )}&ip=1${euc(lm.options.ip)}&now=${Date.now()}`;

    const requestBodyObject = {
      lines: [
        {
          line: lm.options.line,
          app: lm.options.app,
          level: lm.options.level,
          env: lm.options.env,
          meta: lm.options.meta,
          tags: (() => {
            return lm.options.tags.reduce((reduced, newItem) => {
              return `${reduced},${newItem}`;
            });
          })()
        }
      ]
    };

    // console.log(requestBodyObject);

    // lets post the message to logdna
    await plugins.smartrequest.postJson(requestUrlWithParams, {
      headers: {
        Authorization: this.createBasicAuth(),
        charset: 'UTF-8'
      },
      requestBody: requestBodyObject
    });
  }
}
