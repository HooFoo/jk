import axios, {AxiosInstance, AxiosResponse} from 'axios';
import Category from "../models/category";

export default class CategoryRepository {
  private readonly baseUrl = '/buildings/{building_id}/categories';
  private http: AxiosInstance;

  public constructor() {
    this.http = axios;
  }

  public index(building_id: string): Promise<Category[]> {
    return this.http.get(this.url(building_id))
      .then(({ data }: AxiosResponse) => {
        return data.map((b: any) => {
          return new Category(b.attributes);
        })
      })
  }

  public url(building_id:string, id?: string) {
    let base = this.baseUrl.replace('{building_id}', building_id);
    if(id) {
      base += id;
    }
    return base;
  }
}
