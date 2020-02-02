import axios, { AxiosInstance } from 'axios';
import Building from "../models/building";

export default class AddressRepository {
  private readonly baseUrl: string = '/address';
  private http: AxiosInstance;

  public constructor() {
    this.http = axios;
  }

  public index(address = ''): Promise<Building> {
    return this.http.get(this.baseUrl, { params: { address } })
      .then(({ data }: any) => {
        return new Building(data.attributes);
      })
  }
}
