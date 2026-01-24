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
      return;
    case 'PATCH':
      return;
    case 'DELETE':
      return deletArea(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const deletArea = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    //convert the id to number
    const idNumber = Number(id);
    const area = await prisma.area.delete({
      where: { id: idNumber },
    });
    return res.status(200).json({
      message: 'ok',
      data: area,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
