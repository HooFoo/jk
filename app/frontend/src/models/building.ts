export default class Building {
  public latitude: number;
  public longitude: number;
  public address: string;
  public uid: string;

  constructor(params: any) {
    Object.assign(this, params)
  }

  location() {
    return [this.latitude, this.longitude];
  }
}
