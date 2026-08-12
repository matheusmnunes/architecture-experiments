import { phoneSchemaBase } from "../../domain/schema/phone.schema.js";
import { z } from 'zod';

export const phoneResponseDTO = phoneSchemaBase.omit({ erased: true });
export type PhoneResponseDTO = z.output<typeof phoneSchemaBase>

export const phoneListResponseDTO = z.array(phoneResponseDTO);
export type PhoneListResponseDTO = z.output<typeof phoneListResponseDTO>;

//class Phone {
//    constructor(data: PhoneResponseDTO) { }
//}