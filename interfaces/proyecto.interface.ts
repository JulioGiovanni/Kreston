import { IUsuario, IArea, IOficina, ICliente } from './';
export interface IProyecto {
  id: number;
  usuarioId: number;
  usuario?: IUsuario;
  areaId: number;
  area?: IArea;
  oficinaId: number;
  oficina?: IOficina;
  nombre: string;
  descripcion: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  clienteId: number;
  cliente?: ICliente;
  createdAt: string;
  updatedAt: string;
}
