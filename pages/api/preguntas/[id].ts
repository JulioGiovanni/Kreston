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
    case 'PATCH':
      return updatePregunta(req, res);
    case 'PUT':
      return updateMultiplePositionsPregunta(req, res);
    case 'DELETE':
      return deletePregunta(req, res);
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
      orderBy: {
        posicion: 'asc',
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

const updateMultiplePositionsPregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const data = req.body;
    const preguntas = await prisma.$transaction(
      data.map((pregunta: any) => {
        return prisma.pregunta.update({
          where: { id: pregunta.id },
          data: { posicion: pregunta.posicion },
        });
      })
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

const deletePregunta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    const pregunta = await prisma.pregunta.delete({
      where: { id: Number(id) },
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
