import axios, { AxiosResponse } from 'axios';
import * as humps from 'humps';

import FailResponseError from './fail-response-error';
import Injectable from '../dipendency-injection/injectable';
import { Inject } from '../dipendency-injection/inject.decorator';

type Dictionary = { [index: string]: string }

export default class Http extends Injectable {
  private readonly headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  @Inject
  public inject(): void {}

  public post(url: string, params: any): Promise<any> {
    return this.execute(url, () => axios.post(url, humps.decamelizeKeys(params),
      {
        headers: this.headers,
      })
      .then(this.checkSuccess)
      .then(this.extractData)
      .then(humps.camelizeKeys));
  }

  public get(url: string, params: any = {}): Promise<any> {
    return this.execute(url, () => axios.get(url,
      {
        params: humps.decamelizeKeys(params),
        headers: this.headers,
      })
      .then(this.checkSuccess)
      .then(this.extractData)
      .then(humps.camelizeKeys));
  }

  public put(url: string, params: any = {}): Promise<any> {
    return this.execute(url, () => axios.put(url, humps.decamelizeKeys(params),
      {
        headers: this.headers,
      })
      .then(this.checkSuccess)
      .then(this.extractData)
      .then(humps.camelizeKeys));
  }

  public patch(url: string, params: any = {}): Promise<any> {
    return this.execute(url, () => axios.patch(url, humps.decamelizeKeys(params),
      {
        headers: this.headers,
      })
      .then(this.checkSuccess)
      .then(this.extractData)
      .then(humps.camelizeKeys));
  }

  public delete(url: string): Promise<any> {
    return this.execute(url, () => axios.delete(url,
      {
        headers: this.headers,
      })
      .then(this.checkSuccess)
      .then(this.extractData)
      .then(humps.camelizeKeys));
  }

  private checkSuccess(response: AxiosResponse<any>) {
    if (response.status >= 400) {
      throw new FailResponseError(response, response.data.errors, response.data);
    }
  
    return response;
  }
  
  private extractData(response: AxiosResponse<any>) {
    return response.data.data;
  }

  private readonly mockedUrls : Dictionary = {
    "/api/v1/address": "address.json",
    "/api/v1/buildings/": "buildings.json",
    "/api/v1/buildings/1074669391/advertisements": "chat-advertisements.json",
    "/api/v1/buildings/1074669392/advertisements": "chat-advertisements.json",
    "/api/v1/buildings/1074669393/advertisements": "chat-advertisements.json",
    "/api/v1/buildings/1074669391/categories": "chat-categories.json",
    "/api/v1/buildings/1074669392/categories": "chat-categories.json",
    "/api/v1/buildings/1074669393/categories": "chat-categories.json",
  };

  private execute(url: string, action: () => Promise<any>): Promise<any> {
    if  (process.env.MODE != "mockdata" || !this.mockedUrls[url]) {
      return action();
    }
  
    return axios.get(this.mockedUrls[url])
      .then(this.checkSuccess)
      .then(this.extractData)
      .then(humps.camelizeKeys);
  };
}