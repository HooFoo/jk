import inject from "../../inject";
import HttpService from "../../../services/http-service";
import BuildingRepository from "../../../repositories/building-repository";
import MapYandexWrapper from '../../../components/pages/address-select/map-yandex-wrapper';

const dependencies = {
  httpService: new HttpService(),
  buildingsRepository: BuildingRepository
};

export default inject(dependencies, MapYandexWrapper);
