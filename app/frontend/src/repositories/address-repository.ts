import Building from "../models/building";
import BaseRepository from "./base-repository";

export default class AddressRepository extends BaseRepository {
  private readonly baseUrl: string = '/address';

  public index(address = ''): Promise<Building> {
    return this.http.get(this.baseUrl, { params: { address } })
      .then(({ data }: any) => {
        return new Building(data.attributes);
      })
  }
}
