import * as z from 'zod';

const estados = ['EN_PROCESO', 'FINALIZADO', 'NUEVO'] as const;

export const proyectoSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  descripcion: z.string().min(3, 'La descripcion debe tener al menos 3 caracteres'),
  cliente: z.string(),
  usuario: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
  oficina: z.string(),
  area: z.string(),
  estado: z.enum(estados),
  fechaInicio: z.date(),
});
