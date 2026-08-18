
import { get } from '../services/address-type-param.service.js';
import { list } from './parameter.controller.js';

export const listAddressType = list(get);

