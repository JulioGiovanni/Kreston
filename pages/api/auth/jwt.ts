
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';
import { jwt } from '../../../utils';
//login endpoint
const JWT = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return ValidateJWT(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}

const ValidateJWT = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    let payload = {};

    try {
        payload = await jwt.verifyToken(token);
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    const user = await prisma.usuario.findUnique({
        where: {
            id: payload.id,
        },
    })

    if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }


    // res.status(200).json({ message: 'ok', data: jwt.verifyToken(token) });
    res.status(200).json({ message: 'ok', token: jwt.signToken(user.id, user.correo),user });
}

export default JWT;