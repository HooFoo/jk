import http from '../helpers/fetch-helpers';
import Building from "../models/building";

export default class BuildingRepository {
  static baseUrl = '/api/v1/buildings/';

  static index(boundary: any = {}): Promise<Building[]> {
    return http.get(this.baseUrl, boundary)
      .then((response) => {
        return response.map((b: any) => {
          return new Building(b.attributes);
        })
      })
  }

  static show(id:string): Promise<Building> {
    return http.get(this.url(id))
      .then((response) => {
        return new Building(response.attributes);
      })
  }

  static url(id: string) {
    return this.baseUrl + id;
  }
}
