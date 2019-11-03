export default class Building {
  constructor(params) {
    Object.assign(this, params)
  }

  location() {
    return [this.latitude, this.longtitude];
  }
}
