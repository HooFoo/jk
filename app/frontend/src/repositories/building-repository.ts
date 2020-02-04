import axios, {AxiosInstance, AxiosResponse} from 'axios';
import Building from "../models/building";
import BaseRepository from "./base-repository";
import { Inject } from '../dependency-injection/inject.decorator';

export default class BuildingRepository extends BaseRepository {
  private readonly baseUrl = '/buildings';

  @Inject
  public inject(): void {
  }

  public index(boundary: any = {}): Promise<Building[]> {
    return this.http.get(this.baseUrl, { params: boundary })
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
