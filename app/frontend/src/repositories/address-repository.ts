import Http from '../helpers/fetch-helpers';
import Building from "../models/building";
import Injectable from "../dipendency-injection/injectable";
import { Inject } from '../dipendency-injection/inject.decorator';

export default class AddressRepository extends Injectable {
  private readonly baseUrl: string = '/api/v1/address';
  private http: Http;

  @Inject
  public inject(http: Http): void {
    this.http = http;
  }

  public index(address = ''): Promise<Building> {
    return this.http.get(this.baseUrl, { address })
      .then((response) => {
        return new Building(response.attributes);
      })
  }
}
