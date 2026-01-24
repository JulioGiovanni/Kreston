import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../db';
import bcrypt from 'bcryptjs';
import { Data } from '../../../server/types/jsonResponse.type';

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllUsers(req, res);
    case 'POST':
      return createNewUser(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed', data: [] });
      break;
  }
}

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { nombre, rol, page = 1, perPage = 10 } = req.query;
  const offset: any = (Number(page) - 1) * Number(perPage);
  const take: number = Number(perPage);

  try {
    const include = {
      rol: {
        select: {
          nombre: true,
        },
      },
      oficina: {
        select: {
          nombre: true,
        },
      },
      area: {
        select: {
          nombre: true,
        },
      },
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
    if (rol) {
      where = {
        rolId: Number(rol),
      };
    }

    const users = await prisma.usuario.findMany({
      where,
      include,
      take,
      skip: offset,
    });

    const total = await prisma.usuario.count({
      where,
    });

    return res.status(200).json({
      message: 'ok',
      total,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      data: error,
    });
  }
};

const createNewUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { nombre, correo, contrasena, oficina, area, rol } = req.body.data;
    if (!nombre)
      return res.status(400).json({
        message: 'El nombre es requerido',
        type: 'Nombre',
        data: null,
      });
    if (!correo)
      return res.status(400).json({
        message: 'El correo es requerido',
        type: 'Correo',
        data: null,
      });
    if (!contrasena)
      return res.status(400).json({
        message: 'La contraseña es requerida',
        type: 'Contrasena',
        data: null,
      });
    if (!oficina)
      return res.status(400).json({
        message: 'Debe seleccionar una oficina',
        type: 'Oficina',
        data: null,
      });
    if (!area)
      return res.status(400).json({
        message: 'Debe seleccionar un area',
        type: 'Area',
        data: null,
      });
    if (!rol)
      return res.status(400).json({
        message: 'Debe seleccionar un rol',
        type: 'Rol',
        data: null,
      });

    const found = await prisma.usuario.findUnique({
      where: {
        correo,
      },
    });
    if (found) {
      return res.status(400).json({
        message: 'El correo ya existe',
        type: 'Correo',
        data: null,
      });
    }

    const securePassword = await bcrypt.hash(contrasena, 10);

    const user = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        contrasena: securePassword,
        oficinaId: oficina,
        areaId: area,
        rolId: rol,
        createdAt: new Date(),
      },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: {
          select: {
            nombre: true,
          },
        },
        oficina: {
          select: {
            nombre: true,
          },
        },
        area: {
          select: {
            nombre: true,
          },
        },
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
