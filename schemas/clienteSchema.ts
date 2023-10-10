import * as z from 'zod';

const tipoPersona = ['FISICA', 'MORAL'] as const;

export const clienteSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  correo: z.string().email('El correo debe ser valido'),
  telefono: z.string().min(10, 'El telefono debe tener al menos 10 caracteres'),
  domicilio: z.string().min(3, 'El domicilio debe tener al menos 3 caracteres'),
  tipoPersona: z.enum(tipoPersona),
  socioEncargado: z.string().array().min(1, 'Debe tener al menos un socio encargado'),
  gerenteEncargado: z.string().array().min(1, 'Debe tener al menos un gerente encargado'),
});
