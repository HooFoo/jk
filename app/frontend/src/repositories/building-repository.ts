import Http from '../helpers/fetch-helpers';
import Building from "../models/building";
import Injectable from '../dipendency-injection/injectable';
import { Inject } from '../dipendency-injection/inject.decorator';

export default class BuildingRepository extends Injectable {
  private readonly baseUrl = '/api/v1/buildings/';
  private http: Http;

  @Inject
  public inject(http: Http): void {
    this.http = http;
  }

  public index(boundary: any = {}): Promise<Building[]> {
    return this.http.get(this.baseUrl, boundary)
      .then((response) => {
        return response.map((b: any) => {
          return new Building(b.attributes);
        })
      })
  }

  public show(id:string): Promise<Building> {
    return this.http.get(this.url(id))
      .then((response) => {
        return new Building(response.attributes);
      })
  }

  public url(id: string) {
    return this.baseUrl + id;
  }
}
