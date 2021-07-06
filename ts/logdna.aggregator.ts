import * as plugins from './logdna.plugins';
import { LogdnaAccount } from './logdna.logdnaaccount';

export interface ILogCandidate {
  urlIdentifier: string;
  logLines: any[];
}

export class LogAggregator {
  private apiKey: string;
  private baseUrl = 'https://logs.logdna.com/logs/ingest';

  private logObjectMap = new plugins.lik.ObjectMap<ILogCandidate>();

  constructor(apiKeyArg: string) {
    this.apiKey = apiKeyArg;
  }

  /**
   * Create basic authentication
   */
  private createBasicAuth() {
    const userNamePasswordString = `${this.apiKey}:`;
    return `Basic ${plugins.smartstring.base64.encode(userNamePasswordString)}`;
  }

  public addLog(urlIdentifierArg: string, logLineArg: any) {
    let existinglogCandidate = this.logObjectMap.find(logCandidate => {
      return logCandidate.urlIdentifier === urlIdentifierArg;
    });
    if (!existinglogCandidate) {
      existinglogCandidate = { urlIdentifier: urlIdentifierArg, logLines: [] };
      this.logObjectMap.add(existinglogCandidate);
      setTimeout(() => {
        this.sendAggregatedLogs(existinglogCandidate);
      }, 500);
    }
    existinglogCandidate.logLines.push(logLineArg);
  }

  private async sendAggregatedLogs(logCandidate: ILogCandidate) {
    this.logObjectMap.remove(logCandidate);
    // lets post the message to logdna
    const url = `${this.baseUrl}${logCandidate.urlIdentifier}&now=${Date.now()}`;
    const response = await plugins.smartrequest.postJson(
      url,
      {
        headers: {
          Authorization: this.createBasicAuth(),
          charset: 'UTF-8'
        },
        requestBody: {
          lines: logCandidate.logLines
        }
      }
    );
    if (response.statusCode !== 200) {
      console.log(response.body);
    }
  }
}
