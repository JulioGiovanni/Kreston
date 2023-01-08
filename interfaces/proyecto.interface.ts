import { IUsuario, IArea, IOficina } from './';
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
  createdAt: string;
  updatedAt: string;
}
