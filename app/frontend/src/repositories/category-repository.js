import http from '../helpers/fetch-helpers';
import Category from "../models/category";

export default class CategoryRepository {
  static baseUrl = '/api/v1/buildings/{building_id}/categories';

  static index(building_id) {
    return http.get(this.url(building_id))
      .then((response) => {
        return response.map((b) => {
          return new Category(b.attributes);
        })
      })
  }

  static url(building_id, id) {
    let base = this.baseUrl.replace('{building_id}', building_id);
    if(id) {
      base += id;
    }
    return base;
  }
}
