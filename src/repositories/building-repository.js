import http from '../helpers/fetch-helpers';

export class Building {
  constructor(params) {
    Object.assign(this, params)
  }
}

export default class BuildingRepository {
  static baseUrl = '/api/v1/buildings';

  static index(boundary: {}) {
    http.get(this.baseUrl, boundary)
      .then((response) => {
        return response['buildings'].map((b) => {
          return new Building(b);
        })
      })
  }

  static show(id) {
    http.get(this.baseUrl, { id })
      .then((response) => {
        return new Building(response['building']);
      })
  }
}
