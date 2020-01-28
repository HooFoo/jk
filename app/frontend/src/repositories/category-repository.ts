import Http from '../helpers/fetch-helpers';
import Category from "../models/category";
import { Inject } from '../dipendency-injection/inject.decorator';
import Injectable from '../dipendency-injection/injectable';

export default class CategoryRepository extends Injectable {
  private readonly baseUrl = '/api/v1/buildings/{building_id}/categories';
  private http: Http;

  @Inject
  public inject(http: Http): void {
    this.http = http;
  }
  
  public index(building_id: string): Promise<Category[]> {
    return this.http.get(this.url(building_id))
      .then((response) => {
        return response.map((b: any) => {
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
