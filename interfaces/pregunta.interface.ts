export interface Pregunta {
  id: number;
  cuestionarioId: number;
  pregunta: string;
  preguntaPadre?: number;
  createdAt: Date;
  updatedAt: Date;
}
