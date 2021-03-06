import axios, {AxiosInstance} from 'axios';
import Injectable from "../dependency-injection/injectable";
import { Inject } from "../dependency-injection/inject.decorator";

export default abstract class BaseRepository extends Injectable {
    protected http: AxiosInstance;

    constructor() {
        super()
        this.http = axios;
    }
}
