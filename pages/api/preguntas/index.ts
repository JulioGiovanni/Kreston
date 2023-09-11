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
    case 'POST':
      return createNewPregunta(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const createNewPregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.body);
  try {
    const {
      pregunta,
      cuestionarioId,
      preguntaPadre,
      posicion,
      tipoPregunta,
      valorAnidado,
      posiblesRespuestas,
    } = req.body;
    if (!pregunta)
      return res.status(400).json({ message: 'La pregunta es requerida', type: 'nombre' });

    const newPregunta = await prisma.pregunta.create({
      data: {
        pregunta,
        cuestionarioId: Number(cuestionarioId),
        tipo: tipoPregunta,
        preguntaPadre: preguntaPadre ?? null,
        posicion: posicion,
        valorAnidado: valorAnidado ?? null,
        posiblesRespuestas: posiblesRespuestas ?? {},
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
    console.log(error);
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
