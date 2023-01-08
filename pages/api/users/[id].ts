import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../db';

type Data = {
  message?: string;
  data?: any;
  type?: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'PUT':
      return updateUser(req, res);
    case 'PATCH':
      return reactivateUser(req, res);
    case 'DELETE':
      return deactivateUser(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {};

const deactivateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    const user = await prisma.usuario.update({
      where: { id },
      data: {
        activo: false,
      },
    });
    return res.status(200).json({
      message: 'ok',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
const reactivateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    //convert the id to number

    const user = await prisma.usuario.update({
      where: { id },
      data: {
        activo: true,
      },
    });
    return res.status(200).json({
      message: 'ok',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
