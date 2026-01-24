import * as z from 'zod';

export const areaSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  oficina: z.string().min(3, 'La oficina debe tener al menos 3 caracteres'),
});
