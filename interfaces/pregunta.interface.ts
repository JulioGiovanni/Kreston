export interface IPregunta {
  id: number;
  cuestionarioId: number;
  pregunta: string;
  preguntaPadre?: number;
  posicion: number;
  createdAt: Date;
  updatedAt: Date;
}
