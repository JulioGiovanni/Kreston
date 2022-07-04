
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';
//login endpoint
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            const { correo, contrasena } = req.body;

            const user = await prisma.usuario.findUnique({
                where: {
                correo,
                },
            });

            if (!user) return res.status(401).json({ message: 'El correo no existe', type:'correo' });
            
            if(user.activo === false) return res.status(401).json({ message: 'El usuario no esta activo', type:'activo' });
            
            if (!bcrypt.compareSync(contrasena,user?.contrasena )) return res.status(401).json({ message: 'Contraseña inválida', type:'contrasena' });
            
            const token = jwt.signToken(user.id, user.correo);
            
            return res.status(200).json({ message: 'Login exitoso', user,token });
                
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}

export default login;