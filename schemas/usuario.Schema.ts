import * as z from 'zod';

export const UsuarioSchema = z.object({
  nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  correo: z.string().email({ message: 'El correo debe ser válido' }),
  oficina: z.number().int({ message: 'La oficina debe ser un número entero' }),
  area: z.number().int({ message: 'El área debe ser un número entero' }),
  rol: z.number().int({ message: 'El rol debe ser un número entero' }),
});
