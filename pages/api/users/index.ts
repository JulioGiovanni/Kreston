import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../db';
import bcrypt from 'bcryptjs';

type Data = {
  message?: string;
  data?: any;
  type?: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllUsers(req, res);
    case 'POST':
      return createNewUser(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const users = await prisma.usuario.findMany({
      include: {
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
      });
    if (!correo)
      return res.status(400).json({
        message: 'El correo es requerido',
        type: 'Correo',
      });
    if (!contrasena)
      return res.status(400).json({
        message: 'La contraseña es requerida',
        type: 'Contrasena',
      });
    if (!oficina)
      return res.status(400).json({
        message: 'Debe seleccionar una oficina',
        type: 'Oficina',
      });
    if (!area)
      return res.status(400).json({
        message: 'Debe seleccionar un area',
        type: 'Area',
      });
    if (!rol)
      return res.status(400).json({
        message: 'Debe seleccionar un rol',
        type: 'Rol',
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
