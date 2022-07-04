import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db';

type Data = {
    message?: string
    data?: any
}

export default function  (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getAllRoles(req, res);
        case 'POST':
            return createNewRol(req, res);
        default:
            res.status(405).json({ message: 'Method not allowed' })
            break
    }

}


const getAllRoles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        const users = await prisma.role.findMany({});
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
const createNewRol = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { nombre,} = req.body
        const rol = await prisma.role.create({
            data: {
                nombre,
                createdAt: new Date(),
            }
        })
        return res.status(200).json({
            message: 'ok',
            data: rol
        });
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            data: error
        });
    }
}
