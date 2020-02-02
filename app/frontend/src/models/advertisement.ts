export default class Advertisement {
  public id: string;
  public title: string;
  public description: string;
  public price: number;
  public currency: string;
  public due: string;
  public category: string;
  public img: string;
  public phone: string;
  public files: string[];
  public editable: boolean;

  constructor(params: any) {
    Object.assign(this, params)
  }
}
