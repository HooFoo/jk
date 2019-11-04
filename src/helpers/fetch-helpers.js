import axios from 'axios';
import humps from 'humps';

import FailResponseError from './fail-response-error';

function headers() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
}

export default {
  checkSuccess(response) {
    if (response.status >= 400) {
      return response.json().then((json) => {
        throw new FailResponseError(response, json.errors, json);
      });
    }

    return response;
  },

  toJSON(response) {
    if (response.status === 204) {
      return response;
    }

    return response.json();
  },

  post(url, params) {
    return axios.post(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(this.checkSuccess)
      .then(this.toJSON)
      .then(humps.camelizeKeys);
  },

  get(url, params: {}) {
    return axios.get(url,
      {
        params: humps.decamelizeKeys(params),
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(this.checkSuccess)
      .then(this.toJSON)
      .then(humps.camelizeKeys);
  },

  put(url, params) {
    return axios.put(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(this.checkSuccess)
      .then(this.toJSON)
      .then(humps.camelizeKeys);
  },

  patch(url, params) {
    return axios.patch(url, humps.decamelizeKeys(params),
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(this.checkSuccess)
      .then(this.toJSON)
      .then(humps.camelizeKeys);
  },

  delete(url) {
    return axios.delete(url,
      {
        headers: headers(),
        credentials: 'same-origin'
      })
      .then(this.checkSuccess)
      .then(this.toJSON)
      .then(humps.camelizeKeys);
  },
};
