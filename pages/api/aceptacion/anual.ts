import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';
import { Data } from '../../../server/types/jsonResponse.type';

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAceptacionAnual(req, res);
    case 'POST':
      return createAceptacionAnual(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed', data: null });
      break;
  }
}

const getAceptacionAnual = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { year = new Date().getFullYear(), page = 1, perPage = 10 } = req.query;
  const offset: any = (Number(page) - 1) * Number(perPage);
  const take: number = Number(perPage);

  try {
    const total = await prisma.aceptacionAnual.count({
      where: {
        year: Number(year),
      },
    });

    const aceptacionAnual = await prisma.aceptacionAnual.findMany({
      where: {
        year: Number(year),
      },
      include: {
        usuario: true,
      },
      take,
      skip: offset,
    });

    return res.status(200).json({
      message: 'ok',
      total,
      data: aceptacionAnual,
    });
  } catch (error) {}
};

const createAceptacionAnual = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    let registrosCreados = 0;
    const usuarios = await prisma.usuario.findMany({});
    const aceptacionAnual = await prisma.aceptacionAnual.findMany({
      where: {
        year: new Date().getFullYear(),
      },
      include: {
        usuario: true,
      },
    });

    usuarios.map(async (usuario: any) => {
      const found = aceptacionAnual.find((aceptacion: any) => aceptacion.usuario.id === usuario.id);
      if (found) return;
      await prisma.aceptacionAnual.create({
        data: {
          usuario: {
            connect: {
              id: usuario.id,
            },
          },
          year: new Date().getFullYear(),
        },
      });
      registrosCreados++;
    });

    return res.status(200).json({
      message: 'ok',
      data: null,
      total: registrosCreados,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
