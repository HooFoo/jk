import axios, {AxiosInstance} from 'axios'
import Advertisement from "../models/advertisement";

export default class AdvertisementRepository {
  private readonly baseUrl = '/buildings/{building_id}/advertisements';
  private http: AxiosInstance;

  public constructor()  {
    this.http = axios;
  }

  public index(building_id: string): Promise<Advertisement[]> {
    return this.http.get(this.url(building_id))
      .then(({ data }: any) => {
        return data.map((b: any) => {
          return new Advertisement(b.attributes);
        })
      })
  }

  public show(building_id: string, id: string): Promise<Advertisement> {
    return this.http.get(this.url(building_id, id))
      .then(({ data }: any) => {
        return new Advertisement(data.attributes);
      })
  }

  public create(building_id: string, params: any): Promise<Advertisement> {
    return this.http.post(this.url(building_id), params)
      .then(({ data }: any) => {
        return new Advertisement(data.attributes);
      })
  }

  public update(building_id: string, id: string, params: any): Promise<Advertisement> {
    return this.http.put(this.url(building_id, id), params)
      .then(({ data }: any) => {
        return new Advertisement(data.attributes);
      })
  }

  public delete(building_id: string, id: string): Promise<any> {
    return this.http.delete(this.url(building_id, id));
  }

  public url(building_id: string, id?: string): string {
    let base = this.baseUrl.replace('{building_id}', building_id);
    if (id) {
      base += `/${id}`;
    }
    return base;
  }
}
