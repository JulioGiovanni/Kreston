import { IRole } from './role.interface';
import { IArea } from './area.interface';
import { IOficina } from './oficina.interface';
export interface IUsuario {
  id?: string;
  nombre: string;
  correo: string;
  contrasena: string;
  oficinaId: number;
  oficina?: IOficina;
  areaId: number;
  area?: IArea;
  rolId: number;
  rol?: IRole;
  activo?: boolean;
  lastModifiedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
