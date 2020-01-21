import * as humps from 'humps';

export default class FailResponseError {
  public failResponse: any;
  public errors: any;
  public json: any;

  constructor(response:any, errors: any, json: any) {
    this.failResponse = response;
    this.errors = humps.camelizeKeys(errors);
    this.json = json;
  }
}

FailResponseError.prototype = Object.create(Error.prototype);
