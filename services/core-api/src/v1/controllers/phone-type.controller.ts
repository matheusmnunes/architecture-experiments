
import { get } from '../services/phone-type.service.js';
import { list } from './parameter.controller.js';

export const listPhonesType = list(get);

