export default class Advertisement {
  public title: string;
  public description: string;
  public price: string;
  public currency: string;
  public due: string;
  public category: string;
  public img: string;

  constructor(params: any) {
    Object.assign(this, params)
  }
}
