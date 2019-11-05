import inject from "../../inject";
import BuildingRepository from "../../../repositories/building-repository";
import MapYandexWrapper from '../../../components/pages/address-select/map-yandex-wrapper';

const dependencies = {
  buildingsRepository: BuildingRepository
};

export default inject(dependencies, MapYandexWrapper);
