import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createUsers = async () => {
  const pass = await bcrypt.hash('123456', 10);
  const users = [
    {
      nombre: 'Julio Giovanni Flores Zermeño',
      correo: 'administrador@test.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 1,
      createdAt: new Date(),
    },
    {
      nombre: 'Marco Antonio Carrillo Velasco',
      correo: 'sociocalidad@test.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 5,
      createdAt: new Date(),
    },
    {
      nombre: 'Saulo Manuel Lomelí Garcia',
      correo: 'socio@test.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 3,
      createdAt: new Date(),
    },
    {
      nombre: 'Claudia Aracely Flores Zermeño',
      correo: 'gerente@test.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 2,
      createdAt: new Date(),
    },
    {
      nombre: 'Mónica Zermeño Ramírez',
      correo: 'encargado@test.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 4,
      createdAt: new Date(),
    },
    {
      nombre: 'Aracely Zermeño Ramírez',
      correo: 'usuario@test.com',
      contrasena: pass,
      oficinaId: 1,
      areaId: 1,
      rolId: 6,
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
  const clientes = [];
  let tipoPersona: string;
  for (let i = 0; i < 10; i++) {
    i % 2 === 0 ? (tipoPersona = 'FISICA') : (tipoPersona = 'MORAL');
    clientes.push({
      nombre: `Cliente ${i}`,
      correo: `cliente${i}@test.com`,
      domicilio: 'Calle falsa 123',
      telefono: '1234567890',
      tipoPersona: tipoPersona, // Asegúrate de que el valor sea "FISICA" o "MORAL"
      createdAt: new Date(),
    });
  }

  await prisma.cliente.createMany({
    data: [
      {
        nombre: 'Syc Motors',
        correo: 'cliente@correo.com',
        domicilio: 'Calle falsa 123',
        telefono: '1234567890',
        tipoPersona: 'FISICA', // Asegúrate de que el valor sea "FISICA" o "MORAL"
        createdAt: new Date(),
      },
      ...clientes,
    ],
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
  await prisma.role.createMany({
    data: [
      {
        nombre: 'Administrador',
        createdAt: new Date(),
      },
      {
        nombre: 'Gerente',
        createdAt: new Date(),
      },
      {
        nombre: 'Socio',
        createdAt: new Date(),
      },
      {
        nombre: 'Encargado',
        createdAt: new Date(),
      },
      {
        nombre: 'Socio de Calidad',
        createdAt: new Date(),
      },
      {
        nombre: 'Usuario',
        createdAt: new Date(),
      },
    ],
  });
};

async function main() {
  // await createRol();
  // await createOficina();
  await createArea();
  await createUsers();
  await createCliente();
  // await createCuestionario();
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
