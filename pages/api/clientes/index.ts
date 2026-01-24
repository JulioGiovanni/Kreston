import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';
import { Data } from '../../../server/types/jsonResponse.type';

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllClientes(req, res);
    case 'POST':
      return createNewCliente(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed', data: null });
      break;
  }
}

const getAllClientes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { nombre, page, perPage } = req.query;
    const offset: any = (Number(page) - 1) * Number(perPage);
    const take: number = Number(perPage);
    let where = {};
    if (nombre) {
      where = {
        nombre: {
          contains: nombre.toString(),
          mode: 'insensitive',
        },
      };
    }

    const clientes = await prisma.cliente.findMany({
      where,
      take: perPage ? take : undefined,
      skip: page ? offset : undefined,
    });
    const total = await prisma.cliente.count({
      where,
    });
    return res.status(200).json({
      message: 'ok',
      total,
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
  try {
    const { nombre, correo, telefono, domicilio, tipoPersona, socioEncargado, gerenteEncargado } =
      req.body;
    if (!nombre)
      return res
        .status(400)
        .json({ message: 'El nombre de la oficina es requrido', type: 'nombre', data: req.body });
    // if (!domilicio)
    //   return res
    //     .status(400)
    //     .json({ message: 'La dirección de la oficina es requrido', type: 'direccion' });

    const found = await prisma.cliente.findFirst({
      where: {
        nombre,
      },
    });

    if (found)
      return res
        .status(400)
        .json({ message: 'Ese cliente ya existe', type: 'nombre', data: req.body });

    const foundCorreo = await prisma.cliente.findFirst({
      where: {
        correo,
      },
    });

    if (foundCorreo)
      return res
        .status(400)
        .json({ message: 'Ese correo ya existe', type: 'correo', data: req.body });

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

    socioEncargado.forEach(async (socio: string) => {
      await prisma.usuarioCliente.create({
        data: {
          clienteId: cliente.id,
          usuarioId: socio,
        },
      });
    });

    gerenteEncargado.forEach(async (gerente: string) => {
      await prisma.usuarioCliente.create({
        data: {
          clienteId: cliente.id,
          usuarioId: gerente,
        },
      });
    });

    return res.status(200).json({
      message: 'ok',
      data: cliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
