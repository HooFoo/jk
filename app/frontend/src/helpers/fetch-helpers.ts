import axios, { AxiosResponse } from 'axios';
import * as humps from 'humps';

import FailResponseError from './fail-response-error';

export default {
  post(url: string, params: any) {
    return execute(url, () => axios.post(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  get(url: string, params: any = {}) {
    return execute(url, () => axios.get(url,
      {
        params: humps.decamelizeKeys(params),
        headers: headers(),
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  put(url: string, params: any = {}) {
    return execute(url, () => axios.put(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  patch(url: string, params: any = {}) {
    return execute(url, () => axios.patch(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  delete(url: string) {
    return execute(url, () => axios.delete(url,
      {
        headers: headers(),
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },
};

type Dictionary = { [index: string]: string }
const mockedUrls : Dictionary = {
  "/api/v1/address": "address.json",
  "/api/v1/buildings/": "buildings.json",
  "/api/v1/buildings/1074669391/advertisements": "chat-advertisements.json",
  "/api/v1/buildings/1074669392/advertisements": "chat-advertisements.json",
  "/api/v1/buildings/1074669393/advertisements": "chat-advertisements.json",
  "/api/v1/buildings/1074669391/categories": "chat-categories.json",
  "/api/v1/buildings/1074669392/categories": "chat-categories.json",
  "/api/v1/buildings/1074669393/categories": "chat-categories.json",
};

function execute(url: string, action: () => Promise<any>) {
  if  (process.env.MODE != "mockdata" || !mockedUrls[url]) {
    return action();
  }

  return axios.get(mockedUrls[url])
    .then(checkSuccess)
    .then(extractData)
    .then(humps.camelizeKeys);
};

function headers() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
}

function checkSuccess(response: AxiosResponse<any>) {
  if (response.status >= 400) {
    throw new FailResponseError(response, response.data.errors, response.data);
  }

  return response;
}

function extractData(response: AxiosResponse<any>) {
  return response.data.data;
}
