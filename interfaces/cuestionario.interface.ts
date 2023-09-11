import { IProyecto } from './proyecto.interface';
export interface ICuestionario {
  id: number;
  proyectoId: number;
  proyecto: IProyecto;
  pregunta: string;
  createdAt: string;
  updatedAt: string;
}
