import http from '../helpers/fetch-helpers';
import Advertisement from "../models/advertisement";
import Injectable from '../dipendency-injection/injectable';
import { Inject } from '../dipendency-injection/inject.decorator';

export default class AdvertisementRepository extends Injectable {
  private readonly baseUrl = '/api/v1/buildings/{building_id}/advertisements';

  @Inject
  public inject(http: http): void {
  }
  
  public index(building_id: string): Promise<Advertisement[]> {
    return this.resolve<http>().get(this.url(building_id))
      .then((response) => {
        return response.map((b: any) => {
          return new Advertisement(b.attributes);
        })
      })
  }

  public show(building_id: string, id: string): Promise<Advertisement> {
    return this.resolve<http>().get(this.url(building_id, id))
      .then((response) => {
        return new Advertisement(response.attributes);
      })
  }

  public create(building_id: string, params: any): Promise<Advertisement> {
    return this.resolve<http>().post(this.url(building_id), params)
      .then((response) => {
        return new Advertisement(response.attributes);
      })
  }

  public update(building_id: string, id: string, params: any): Promise<Advertisement> {
    return this.resolve<http>().put(this.url(building_id, id), params)
      .then((response) => {
        return new Advertisement(response.attributes);
      })
  }

  public delete(building_id: string, id: string): Promise<any> {
    return this.resolve<http>().delete(this.url(building_id, id));
  }

  public url(building_id: string, id?: string): string {
    let base = this.baseUrl.replace('{building_id}', building_id);
    if (id) {
      base += id;
    }
    return base;
  }
}
