import http from '../helpers/fetch-helpers';
import Building from "../models/building";
import Injectable from "../dipendency-injection/injectable";
import { ClassDecorator } from '../dipendency-injection/ClassDecorator';
import { MethodDecorator } from '../dipendency-injection/MethodDecorator';

@ClassDecorator
export default class AddressRepository extends Injectable {

  @MethodDecorator
  public inject(http: http) {}

  public checkInjection() {

    let http = this.Resolve<http>();
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
