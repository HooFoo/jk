export default class Advertisement {
  public title: string;
  public description: string;
  public price: number;
  public currency: string;
  public due: string;
  public category: string;
  public img: string;
  public phone: string;

  constructor(params: any) {
    Object.assign(this, params)
  }
}
