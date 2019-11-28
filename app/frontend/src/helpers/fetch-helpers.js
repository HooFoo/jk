import axios from 'axios';
import humps from 'humps';

import FailResponseError from './fail-response-error';

export default {
  post(url, params) {
    return execute(url, () => axios.post(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  get(url, params = {}) {
    return execute(url, () => axios.get(url,
      {
        params: humps.decamelizeKeys(params),
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  put(url, params) {
    return execute(url, () => axios.put(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  patch(url, params) {
    return execute(url, () => axios.patch(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },

  delete(url) {
    return execute(url, () => axios.delete(url,
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(checkSuccess)
      .then(extractData)
      .then(humps.camelizeKeys));
  },
};

const mockedUrls = {
  "/api/v1/address": "address.json",
  "/api/v1/buildings/": "buildings.json",
  "/api/v1/buildings/1074669391/advertisements": "chat-advertisements.json",
  "/api/v1/buildings/1074669392/advertisements": "chat-advertisements.json",
  "/api/v1/buildings/1074669393/advertisements": "chat-advertisements.json",
  "/api/v1/buildings/1074669391/categories": "chat-categories.json",
  "/api/v1/buildings/1074669392/categories": "chat-categories.json",
  "/api/v1/buildings/1074669393/categories": "chat-categories.json",
};

function execute(url, action) {
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

function checkSuccess(response) {
  if (response.status >= 400) {
    return response.json().then((json) => {
      throw new FailResponseError(response, json.errors, json);
    });
  }

  return response;
}

function extractData(response) {
  return response.data.data;
}
