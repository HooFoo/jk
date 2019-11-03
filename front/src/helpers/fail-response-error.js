import humps from 'humps';

export default class FailResponseError {
  constructor(response, errors, json) {
    this.failResponse = response;
    this.errors = humps.camelizeKeys(errors);
    this.json = json;
  }
}
FailResponseError.prototype = Object.create(Error.prototype);
