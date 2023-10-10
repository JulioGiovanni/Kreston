import * as z from 'zod';

const tipos = ['aceptacion', 'continuidad', 'proyecto', 'anual'] as const;

export const cuestionarioSchema = z.object({
  tipo: z.enum(tipos),
});
