import { address_types, type AddressType } from '../../domain/schema/address-type-param.schema.js';
import { parameterService } from './parameter.service.js';

export const { get } = parameterService<AddressType>(address_types);

//export const insert = async (data: any) => {
//   let phone = new RPhoneType();
//   return await phone.insert(data);
//}
//
//export const update = async (data: any) => {
//   let phone = new RPhoneType();
//   return await phone.update(data);
//}
