import http from '../helpers/fetch-helpers';
import Building from "../models/building";

export default class BuildingRepository {
  static baseUrl = '/api/v1/buildings';

  static index(boundary = {}) {
    return http.get(this.baseUrl, boundary)
      .then((response) => {
        return response.map((b) => {
          return new Building(b.attributes);
        })
      })
  }

  static show(id) {
    return http.get(this.url(id))
      .then((response) => {
        return new Building(response.attributes);
      })
  }

  static url(id) {
    return this.baseUrl + id;
  }
}
