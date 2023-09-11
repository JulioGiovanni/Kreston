import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createUsers = async () => {
  const pass = await bcrypt.hash('123456', 10);
  const users = [
    // {
    //   nombre: 'Julio Giovanni Flores Zermeño',
    //   correo: 'jg250998@gmail.com',
    //   contrasena: pass,
    //   oficinaId: 1,
    //   areaId: 1,
    //   rolId: 1,
    //   createdAt: new Date(),
    // },
    {
      nombre: 'Marco Antonio Carrillo Velasco',
      correo: 'mcarrillo@kcsm.mx',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 1,
      createdAt: new Date(),
    },
    {
      nombre: 'Saulo Manuel Lomelí Garcia',
      correo: 'everest_5@msn.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 1,
      createdAt: new Date(),
    },
  ];
  const user = await prisma.usuario.createMany({
    data: users,
  });

  //   const createProyecto = async () => {
  //     await prisma.proyecto.create({
  //       data: {
  //         nombre: 'Syc Motors',
  //         descripcion: 'Proyecto de prueba',
  //         clienteId: 1,
  //         createdAt: new Date(),
  //         fechaInicio: new Date(),
  //         oficinaId: 1,
  //         areaId: 1,
  //         usuarioId: users[0].id,
  //       },
  //     });
  //   };
  //   await createProyecto();
};

const createCuestionario = async () => {
  await prisma.cuestionario.create({
    data: {
      proyectoId: 1,
      usuariosAsignados: ['clcqxmjcg00014yqr4uo944cm', 'clcqy3jik00004yfl93qq56sk'],
      createdAt: new Date(),
    },
  });
};

const createCliente = async () => {
  await prisma.cliente.create({
    data: {
      nombre: 'Syc Motors',
      correo: 'cliente@correo.com',
      domicilio: 'Calle falsa 123',
      telefono: '1234567890',
      tipoPersona: 'FISICA',
      createdAt: new Date(),
    },
  });
};

const createOficina = async () => {
  await prisma.oficina.create({
    data: {
      nombre: 'Guadalajara',
      direccion: 'Calle falsa 123',
      createdAt: new Date(),
    },
  });
};

const createArea = async () => {
  await prisma.area.create({
    data: {
      nombre: 'Desarrollo',
      oficinaId: 1,
      createdAt: new Date(),
    },
  });
};

const createRol = async () => {
  await prisma.role.create({
    data: {
      nombre: 'Administrador',
      createdAt: new Date(),
    },
  });
};

async function main() {
  //   await createOficina();
  //   await createArea();
  //   await createRol();
  //   await createCliente();
  //   await createUsers();
  await createCuestionario();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
