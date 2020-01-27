import http from '../helpers/fetch-helpers';
import Building from "../models/building";
import Injectable from '../dipendency-injection/injectable';
import { Inject } from '../dipendency-injection/inject.decorator';

export default class BuildingRepository extends Injectable {
  private readonly baseUrl = '/api/v1/buildings/';

  @Inject
  public inject(http: http): void {
  }

  public index(boundary: any = {}): Promise<Building[]> {
    return this.resolve<http>().get(this.baseUrl, boundary)
      .then((response) => {
        return response.map((b: any) => {
          return new Building(b.attributes);
        })
      })
  }

  public show(id:string): Promise<Building> {
    return this.resolve<http>().get(this.url(id))
      .then((response) => {
        return new Building(response.attributes);
      })
  }

  public url(id: string) {
    return this.baseUrl + id;
  }
}
