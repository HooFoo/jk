import axios, {AxiosInstance} from 'axios';

export default class BaseRepository {
    protected http: AxiosInstance;

    constructor() {
        this.http = axios;
    }
}
