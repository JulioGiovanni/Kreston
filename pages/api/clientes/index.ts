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
      return getAllClientes(req, res);
    case 'POST':
      return createNewCliente(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getAllClientes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const clientes = await prisma.cliente.findMany({});
    return res.status(200).json({
      message: 'ok',
      data: clientes,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
const createNewCliente = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.body);
  try {
    const { nombre, correo, telefono, domicilio, tipoPersona } = req.body;
    if (!nombre)
      return res
        .status(400)
        .json({ message: 'El nombre de la oficina es requrido', type: 'nombre' });
    // if (!domilicio)
    //   return res
    //     .status(400)
    //     .json({ message: 'La dirección de la oficina es requrido', type: 'direccion' });

    const found = await prisma.cliente.findFirst({
      where: {
        nombre,
      },
    });

    if (found) return res.status(400).json({ message: 'Ese cliente ya existe', type: 'nombre' });

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        correo,
        telefono,
        domicilio,
        tipoPersona,
        createdAt: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        domicilio: true,
        telefono: true,
        correo: true,
        tipoPersona: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: 'ok',
      data: cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
