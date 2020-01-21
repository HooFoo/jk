import http from '../helpers/fetch-helpers';
import Building from "../models/building";

export default class AddressRepository {
  static baseUrl = '/api/v1/address';

  static index(address = '') {
    return http.get(this.baseUrl, { address })
      .then((response) => {
        return new Building(response.attributes);
      })
  }
}
