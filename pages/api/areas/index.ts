import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';

type Data = {
  message?: string;
  data?: any;
  type?: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllAreas(req, res);
    case 'POST':
      return createNewArea(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getAllAreas = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const areas = await prisma.area.findMany({
      include: {
        oficina: true,
      },
    });
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
const createNewArea = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { nombre, oficina } = req.body.data;
    if (!nombre)
      return res.status(400).json({ message: 'El nombre del área es requrido', type: 'nombre' });
    if (!oficina)
      return res.status(400).json({ message: 'Debe seleccionar una oficina', type: 'oficina' });

    const found = await prisma.area.findFirst({
      where: {
        nombre: nombre,
        oficina: {
          id: oficina,
        },
      },
    });

    if (found)
      return res
        .status(400)
        .json({ message: 'El área ya existe para esa oficina', type: 'nombre' });

    const area = await prisma.area.create({
      data: {
        nombre,
        oficinaId: oficina,
        createdAt: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        oficina: {
          select: {
            id: true,
            nombre: true,
          },
        },
        createdAt: true,
      },
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
