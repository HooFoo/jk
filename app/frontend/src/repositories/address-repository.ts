import http from '../helpers/fetch-helpers';
import Building from "../models/building";
import Injectable from "../dipendency-injection/injectable";
import { Inject } from '../dipendency-injection/inject.decorator';

export default class AddressRepository extends Injectable {

  @Inject
  public inject(http: http): void {
  }

  public checkInjection() {

    let http = this.resolve<http>();
    return http;

  }

  static baseUrl = '/api/v1/address';

  static index(address = ''): Promise<Building> {
    return http.get(this.baseUrl, { address })
      .then((response) => {
        return new Building(response.attributes);
      })
  }
}
