import { z } from 'zod';

export const generateReportParamsDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const generateReportQueryDTO = z.object({
  client_id: z.coerce.number().int().positive(),
  lang     : z.string().default('pt_BR'),
});

export type GenerateReportParamsDTO =
  z.output<typeof generateReportParamsDTO>;

export type GenerateReportQueryDTO =
  z.output<typeof generateReportQueryDTO>;

export const generatedReportResponseDTO = z.object({ fileName: z.string() });