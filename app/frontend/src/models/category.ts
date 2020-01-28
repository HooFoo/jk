export default class Category {
  public id: string;
  public name: string;

  constructor(params: any) {
    Object.assign(this, params)
  }
}
