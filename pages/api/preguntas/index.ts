import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';
import { IPregunta } from '../../../interfaces/pregunta.interface';

type Data = {
  message?: string;
  data?: any;
  type?: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllPreguntasFromCuestionario(req, res);
    case 'POST':
      return createNewPregunta(req, res);
    case 'PUT':
      return updateMultiplePositionsPregunta(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getAllPreguntasFromCuestionario = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const areas = await prisma.area.findMany({});
    return res.status(200).json({
      message: 'ok',
      data: areas,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
const createNewPregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { pregunta, cuestionarioId, preguntaPadre, posicion } = req.body;
    if (!pregunta)
      return res.status(400).json({ message: 'La pregunta es requerida', type: 'nombre' });

    const newPregunta = await prisma.pregunta.create({
      data: {
        pregunta,
        cuestionarioId,
        preguntaPadre: preguntaPadre ?? null,
        posicion: posicion,
      },
      select: {
        id: true,
        pregunta: true,
        cuestionarioId: true,
        preguntaPadre: true,
      },
    });
    return res.status(200).json({
      message: 'ok',
      data: newPregunta,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};

const updatePositionPregunta = async (id: number, posicion: number) => {
  try {
    const pregunta = await prisma.pregunta.update({
      where: { id },
      data: { posicion },
    });
  } catch (error) {
    return error;
  }
};

const updateMultiplePositionsPregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const data = req.body;
    const preguntas = await Promise.all(
      data.map((pregunta: IPregunta, index: number) =>
        updatePositionPregunta(pregunta.id, index + 1)
      )
    );
    return res.status(200).json({
      message: 'ok',
      data: preguntas,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
