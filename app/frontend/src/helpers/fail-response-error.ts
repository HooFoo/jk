import * as humps from 'humps';

export default class FailResponseError extends Error {
  public failResponse: any;
  public errors: any;
  public json: any;

  constructor(response:any, errors: any, json: any) {
    super(errors);

    this.failResponse = response;
    this.errors = humps.camelizeKeys(errors);
    this.json = json;
  }
}
