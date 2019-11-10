import inject from "../../inject";
import AdvertisementRepository from "../../../repositories/advertisements-repository";
import Advertisements from '../../../components/pages/building/advertisements';

const dependencies = {
  advertisementsRepository: AdvertisementRepository
};

export default inject(dependencies, Advertisements);
