import inject from "../../inject";
import BuildingRepository from "../../../repositories/building-repository";
import AdvertisementRepository from "../../../repositories/advertisements-repository";
import BuildingPage from '../../../pages/building/index';

const dependencies = {
  buildingsRepository: BuildingRepository,
  advertisementsRepository: AdvertisementRepository
};

export default inject(dependencies, BuildingPage);
