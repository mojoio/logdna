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
    const requestUrlWithParams = `${this.baseUrl}?hostname=${euc(
      lm.options.hostname
    )}&mac=${euc(lm.options.mac)}&ip=1${euc(lm.options.ip)}&now=${Date.now()}`;
    await plugins.smartrequest.postJson(requestUrlWithParams, {
      headers: {
        'Authorization': this.createBasicAuth(),
        'charset': 'UTF-8'
      },
      requestBody: { 
        "lines": [ 
          { 
            "line":"This is an awesome log statement", 
            "app":"myapp",
            "level": "INFO",
            "env": "production",
            "meta": {
              "customfield": {
                "nestedfield": "nestedvalue"
              }
            }
          }
        ] 
     }
    });
  }
}
