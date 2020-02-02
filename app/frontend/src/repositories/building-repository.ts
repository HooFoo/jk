import axios, {AxiosInstance, AxiosResponse} from 'axios';
import Building from "../models/building";

export default class BuildingRepository {
  private readonly baseUrl = '/buildings';
  private http: AxiosInstance;

  public constructor() {
    this.http = axios;
  }

  public index(boundary: any = {}): Promise<Building[]> {
    return this.http.get(this.baseUrl, boundary)
      .then(({ data }: AxiosResponse) => {
        return data.map((b: any) => {
          return new Building(b.attributes);
        })
      })
  }

  public show(id: string): Promise<Building> {
    return this.http.get(this.url(id))
      .then(({ data }: AxiosResponse) => {
        return new Building(data.attributes);
      })
  }

  public url(id: string | null = null) {
    return this.baseUrl + (id ? `/${id}` : '');
  }
}
