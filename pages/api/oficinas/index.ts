import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db';

type Data = {
    message?: string
    data?: any
    type?: string
}

export default function  (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getAllOficinas(req, res);
        case 'POST':
            return createNewOficina(req, res);
        default:
            res.status(405).json({ message: 'Method not allowed' })
            break
    }

}


const getAllOficinas = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        const users = await prisma.area.findMany({});
        return res.status(200).json({
            message: 'ok',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            data: error
        });
    }
}
const createNewOficina = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { nombre,direccion} = req.body.data;
        if(!nombre) return res.status(400).json({ message: 'El nombre de la oficina es requrido', type: 'nombre' })
        if(!direccion) return res.status(400).json({ message: 'La dirección de la oficina es requrido', type: 'direccion' })

        const found = await prisma.oficina.findFirst({
            where: {
                nombre: nombre,
            }
        });

        if(found) return res.status(400).json({ message: 'La oficina ya existe', type: 'nombre' })

        const oficina = await prisma.oficina.create({
            data: {
                nombre,
                direccion,
                createdAt: new Date(),
            }
        })
        return res.status(200).json({
            message: 'ok',
            data: oficina
        });

    } catch (error) {
        return res.status(500).json({
            message: 'error',
            data: error
        });
    }
}
