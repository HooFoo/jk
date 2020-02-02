import axios from 'axios';
import * as humps from 'humps';

import FailResponseError from './errors/fail-response-error';

type Dictionary = { [index: string]: string }

const MOCKED_URLS : Dictionary = {
  "/address": "address.json",
  "/buildings": "buildings.json",
  "/buildings/1074669391/advertisements": "chat-advertisements.json",
  "/buildings/1074669392/advertisements": "chat-advertisements.json",
  "/buildings/1074669393/advertisements": "chat-advertisements.json",
  "/buildings/1074669391/categories": "chat-categories.json",
  "/buildings/1074669392/categories": "chat-categories.json",
  "/buildings/1074669393/categories": "chat-categories.json",
};

if (process.env.MODE !== "mockdata") axios.defaults.baseURL = `/api/v1`;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use((config: any) => {
  console.log('intercept request', config);
  if  (process.env.MODE == "mockdata" || !MOCKED_URLS[config['url']]) {
    config['url'] = MOCKED_URLS[config['url']];
    config['method'] = 'get';
  }

  console.log('after intercept request', config);
  return config;
});

axios.interceptors.request.use((config: any) => {
  config['params'] = humps.decamelizeKeys(config['params']);
  return config;
});

axios.interceptors.response.use((response: any) => {
  if (response.status >= 400) {
    throw new FailResponseError(response, response.data.errors, response.data);
  }

  return response;
});

axios.interceptors.response.use((response: any) => {
  response['data'] = humps.camelizeKeys(response['data']['data']);
  return response;
});
