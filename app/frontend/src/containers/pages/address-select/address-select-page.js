import inject from "../../inject";
import AddressRepository from "../../../repositories/address-repository";
import AddressSelectPage from '../../../pages/address-select/index';

const dependencies = {
  addressRepository: AddressRepository
};

export default inject(dependencies, AddressSelectPage);
