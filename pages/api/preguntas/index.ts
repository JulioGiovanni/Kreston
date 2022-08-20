import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';
import { Pregunta } from '../../../interfaces';

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
    const { mensaje, cuestionario, preguntaPadre } = req.body.data;
    if (!mensaje)
      return res.status(400).json({ message: 'La pregunta es requerida', type: 'nombre' });

    const newPregunta = await prisma.pregunta.create({
      data: {
        pregunta: mensaje,
        cuestionarioId: cuestionario,
        preguntaPadre,
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
