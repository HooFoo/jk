import http from '../helpers/fetch-helpers';
import Advertisement from "../models/advertisement";

export default class AdvertisementRepository {
  static baseUrl = '/api/v1/buildings/{building_id}/advertisements';

  static index(building_id: string): Promise<Advertisement[]> {
    return http.get(this.url(building_id))
      .then((response) => {
        return response.map((b: any) => {
          return new Advertisement(b.attributes);
        })
      })
  }

  static show(building_id: string, id: string): Promise<Advertisement> {
    return http.get(this.url(building_id, id))
      .then((response) => {
        return new Advertisement(response.attributes);
      })
  }

  static create(building_id: string, params: any): Promise<Advertisement> {
    return http.post(this.url(building_id), params)
      .then((response) => {
        return new Advertisement(response.attributes);
      })
  }

  static update(building_id: string, id: string, params: any): Promise<Advertisement> {
    return http.put(this.url(building_id, id), params)
      .then((response) => {
        return new Advertisement(response.attributes);
      })
  }

  static delete(building_id: string, id: string): Promise<any> {
    return http.delete(this.url(building_id, id));
  }

  static url(building_id: string, id?: string): string {
    let base = this.baseUrl.replace('{building_id}', building_id);
    if (id) {
      base += id;
    }
    return base;
  }
}
