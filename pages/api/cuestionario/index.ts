import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';
import { Data } from '../../../server/types/jsonResponse.type';

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllCuestionarios(req, res);
    case 'POST':
      return createNewCuestionario(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed', data: null });
      break;
  }
}

const getAllCuestionarios = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const cuestionarios = await prisma.cuestionario.findMany({
      include: {
        Preguntas: {},
      },
    });
    return res.status(200).json({
      message: 'ok',
      data: cuestionarios,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
const createNewCuestionario = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { tipo } = req.body.data;

    const cuestionarioExistente = await prisma.cuestionario.findFirst({
      where: {
        TipoCuestionario: tipo,
      },
    });
    if (cuestionarioExistente) {
      return res.status(400).json({
        message: 'error',
        type: 'tipo',
        data: 'Ya existe un cuestionario con ese tipo',
      });
    }

    const cuestionario = await prisma.cuestionario.create({
      data: {
        TipoCuestionario: tipo,
      },
    });
    return res.status(200).json({
      message: 'ok',
      data: cuestionario,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
