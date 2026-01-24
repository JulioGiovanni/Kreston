import * as z from 'zod';

const tipos = [
  'CUESTIONARIO_INDEPENDENCIA_PROYECTO',
  'CUESTIONARIO_INDEPENDENCIA_ANUAL',
  'CUESTIONARIO_ACEPTACION',
  'CUESTIONARIO_CONTINUIDAD',
] as const;

export const cuestionarioSchema = z.object({
  tipo: z.enum(tipos),
});
