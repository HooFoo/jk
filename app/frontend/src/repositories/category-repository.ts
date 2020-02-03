import Category from "../models/category";
import BaseRepository from "./base-repository";
import { AxiosResponse } from "axios";

export default class CategoryRepository extends BaseRepository {
  private readonly baseUrl = '/categories';

  public index(): Promise<Category[]> {
    return this.http.get(this.baseUrl)
      .then(({ data }: AxiosResponse) => {
        return data.map((b: any) => {
          return new Category(b.attributes);
        })
      })
  }
}
