import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../db';
type Data = {
  message?: string;
  data?: any;
  type?: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllPreguntasFromCuestionario(req, res);
    case 'PUT':
      return updatePregunta(req, res);

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getAllPreguntasFromCuestionario = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const preguntas = await prisma.pregunta.findMany({
      where: {
        cuestionarioId: Number(req.query.id),
      },
    });
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

const updatePregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    const data = req.body;

    const pregunta = await prisma.pregunta.update({
      where: { id: Number(id) },
      data,
    });

    return res.status(200).json({
      message: 'ok',
      data: pregunta,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};

// const updatePositionPregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   try {
//     const { id, posicion } = req.body;
//     const pregunta = await prisma.pregunta.update({
//       where: { id },
//       data: { posicion },
//     });
//     return res.status(200).json({
//       message: 'ok',
//       data: pregunta,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: 'error',
//       data: error,
//     });
//   }
// };
