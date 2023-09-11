export interface IPregunta {
  id: number;
  cuestionarioId: number;
  pregunta: string;
  tipo: string;
  valorAnidado?: string;
  posiblesRespuestas?: any;
  preguntaPadre?: number;
  posicion?: number;
  createdAt: Date;
  updatedAt: Date;
}
