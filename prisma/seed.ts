import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

const createUser = async () => {
    const pass = await bcrypt.hash('123456', 10);
    await prisma.usuario.create({
        data: {
            nombre: 'Julio Giovanni Flores Zermeño',
            correo: 'jg250998@gmail.com',
            contrasena: pass,
            oficinaId: 1,
            areaId: 1,
            rolId: 1,
            createdAt: new Date(),
        }
    })
}

const createOficina = async () => {
    await prisma.oficina.create({
        data: {
            nombre: 'Guadalajara',
            direccion: 'Calle falsa 123',
            createdAt: new Date(),
        }
    })
}

const createArea = async () => {
    await prisma.area.create({
        data: {
            nombre: 'Desarrollo',
            oficinaId: 1,
            createdAt: new Date(),
        }
    })
}

const createRol = async () => {
    await prisma.role.create({
        data: {
            nombre: 'Administrador',
            createdAt: new Date(),
        }
    })
}

async function main() {
    await createOficina()
    await createArea()
    await createRol()
    await createUser()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


 
  