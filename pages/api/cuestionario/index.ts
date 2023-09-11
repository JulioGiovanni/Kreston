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
      return getAllCuestionarios(req, res);
    case 'POST':
      return createNewCuestionario(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getAllCuestionarios = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const cuestionarios = await prisma.cuestionario.findMany({
      include: {
        proyecto: true,
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
  console.log(req.body.data);
  try {
    const { usuarios, proyecto } = req.body.data;

    const cuestionario = await prisma.cuestionario.create({
      data: {
        proyectoId: proyecto,
        usuariosAsignados: usuarios,
      },
    });
    return res.status(200).json({
      message: 'ok',
      data: cuestionario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
