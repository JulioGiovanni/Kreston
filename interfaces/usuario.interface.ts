export interface IUsuario {
  id?: string;
  nombre: string;
  correo: string;
  contrasena: string;
  oficinaId: number;
  areaId: number;
  rolId: number;
  activo?: boolean;
  lastModifiedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
