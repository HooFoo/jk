import http from '../helpers/fetch-helpers';
import Building from "../models/building";
import Injectable from "../dipendency-injection/injectable";
import { Inject } from '../dipendency-injection/inject.decorator';

export default class AddressRepository extends Injectable {
  private readonly baseUrl: string = '/api/v1/address';

  @Inject
  public inject(http: http): void {
  }

  public index(address = ''): Promise<Building> {
    return this.resolve<http>().get(this.baseUrl, { address })
      .then((response) => {
        return new Building(response.attributes);
      })
  }
}
