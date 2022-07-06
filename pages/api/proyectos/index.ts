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
            return getAllProyectos(req, res);
        case 'POST':
            return createNewProyecto(req, res);
        default:
            res.status(405).json({ message: 'Method not allowed' })
            break
    }

}


const getAllProyectos = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        const proyectos = await prisma.proyecto.findMany({});
        return res.status(200).json({
            message: 'ok',
            data: proyectos
        });
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            data: error
        });
    }
}
const createNewProyecto = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { nombre, descripcion, usuario, oficina, area} = req.body.data;
        if(!nombre) return res.status(400).json({ message: 'El nombre del proyecto es requerido', type: 'nombre' })
        if(!descripcion) return res.status(400).json({ message: 'La descripción del proyecto es requrido', type: 'descripcion' })
        if(!usuario) return res.status(400).json({ message: 'El usuario de este proyecto es requrido', type: 'usuario' })
        if(!oficina) return res.status(400).json({ message: 'La oficina para este proyecto es requrido', type: 'oficina' })
        if(!area) return res.status(400).json({ message: 'El área de este proyecto es requrido', type: 'area' })

        const found = await prisma.proyecto.findFirst({
            where: {
                nombre: nombre,
            }
        });

        if(found) return res.status(400).json({ message: 'El nombre de este proyecto ya existe', type: 'nombre' })

        const proyecto = await prisma.proyecto.create({
            data: {
                nombre,
                descripcion,
                estado: 'activo',
                usuarioId: usuario,
                oficinaId: oficina,
                areaId: area,
                createdAt: new Date(),
            }
        })
        return res.status(200).json({
            message: 'ok',
            data: proyecto
        });

    } catch (error) {
        return res.status(500).json({
            message: 'error',
            data: error
        });
    }
}
