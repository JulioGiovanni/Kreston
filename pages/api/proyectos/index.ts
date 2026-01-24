import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';
import { Data } from '../../../server/types/jsonResponse.type';

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllProyectos(req, res);
    case 'POST':
      return createNewProyecto(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed', data: null });
      break;
  }
}

const getAllProyectos = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { nombre, page = 1, perPage = 10 } = req.query;
    const offset: any = (Number(page) - 1) * Number(perPage);
    const take: number = Number(perPage);
    const include = {
      usuario: true,
      oficina: true,
      area: true,
      cliente: true,
    };
    let where = {};
    if (nombre) {
      where = {
        nombre: {
          contains: nombre.toString(),
          mode: 'insensitive',
        },
      };
    }
    const proyectos = await prisma.proyecto.findMany({
      where,
      include,
      take,
      skip: offset,
    });
    const total = await prisma.proyecto.count({
      where,
    });
    return res.status(200).json({
      message: 'ok',
      total,
      data: proyectos,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
const createNewProyecto = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { nombre, descripcion, usuario, oficina, area, fechaInicio, cliente, estado } =
      req.body.data;
    if (!nombre)
      return res
        .status(400)
        .json({ message: 'El nombre del proyecto es requerido', type: 'nombre', data: req.body });
    if (!descripcion)
      return res.status(400).json({
        message: 'La descripción del proyecto es requrido',
        type: 'descripcion',
        data: req.body,
      });
    if (!usuario)
      return res.status(400).json({
        message: 'El usuario de este proyecto es requrido',
        type: 'usuario',
        data: req.body,
      });
    if (!oficina)
      return res.status(400).json({
        message: 'La oficina para este proyecto es requrido',
        type: 'oficina',
        data: req.body,
      });
    if (!area)
      return res
        .status(400)
        .json({ message: 'El área de este proyecto es requrido', type: 'area', data: req.body });
    if (!cliente)
      return res.status(400).json({
        message: 'El cliente de este proyecto es requrido',
        type: 'cliente',
        data: req.body,
      });

    const found = await prisma.proyecto.findFirst({
      where: {
        oficina: {
          id: Number(oficina),
        },
        nombre,
      },
    });

    if (found)
      return res.status(400).json({
        message: 'El nombre de este proyecto para la oficina seleccionada ya existe',
        type: 'nombre',
        data: req.body,
      });

    const Proyecto = await prisma.proyecto.create({
      data: {
        usuarioId: usuario,
        areaId: Number(area),
        oficinaId: Number(oficina),
        nombre,
        descripcion,
        estado: estado || 'NUEVO',
        fechaInicio: fechaInicio ? fechaInicio : new Date(),
        clienteId: Number(cliente),
        createdAt: new Date(),
        fechaFin: null,
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        estado: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
          },
        },
        oficina: {
          select: {
            id: true,
            nombre: true,
          },
        },
        area: {
          select: {
            id: true,
            nombre: true,
          },
        },
        fechaInicio: true,
        fechaFin: true,
        cliente: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: 'ok',
      data: Proyecto,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};
