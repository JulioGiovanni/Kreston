import { IProyecto } from './proyecto.interface';
import Preguntas from '../pages/cuestionarios/[id]';
export interface ICuestionario {
  id: number;
  Preguntas: any[];
  TipoCuestionario: string;
  createdAt: string;
  updatedAt: string;
}
