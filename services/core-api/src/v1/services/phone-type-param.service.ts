import { phone_types } from '../../domain/schema/phone-type-param.schema.js';
import { parameterService } from './parameter.service.js';

export const { get } = parameterService(phone_types);

//export const insert = async (data: any) => {
//   let phone = new RPhoneType();
//   return await phone.insert(data);
//}
//
//export const update = async (data: any) => {
//   let phone = new RPhoneType();
//   return await phone.update(data);
//}
