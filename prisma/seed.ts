import { PrismaClient, Prisma, estadoProyecto, estadoAceptacion } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

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

const createOficina = async () => {
  await prisma.oficina.createMany({
    data: [
      {
        nombre: 'Guadalajara',
        direccion: 'Av. López Mateos Sur 2077, Col. Providencia, Guadalajara, Jalisco',
        createdAt: new Date(),
      },
      {
        nombre: 'Ciudad de México',
        direccion: 'Av. Reforma 350, Col. Juárez, Ciudad de México',
        createdAt: new Date(),
      },
      {
        nombre: 'Monterrey',
        direccion: 'Av. Constitución 1234, Col. Centro, Monterrey, Nuevo León',
        createdAt: new Date(),
      },
      {
        nombre: 'Querétaro',
        direccion: 'Blvd. Bernardo Quintana 200, Col. Centro Sur, Querétaro',
        createdAt: new Date(),
      },
    ],
  });
};

const createArea = async () => {
  const areas = [
    // Guadalajara (oficinaId: 1)
    { nombre: 'Auditoría', oficinaId: 1 },
    { nombre: 'Consultoría', oficinaId: 1 },
    { nombre: 'Fiscal', oficinaId: 1 },
    { nombre: 'Recursos Humanos', oficinaId: 1 },
    // Ciudad de México (oficinaId: 2)
    { nombre: 'Auditoría', oficinaId: 2 },
    { nombre: 'Consultoría', oficinaId: 2 },
    { nombre: 'Fiscal', oficinaId: 2 },
    // Monterrey (oficinaId: 3)
    { nombre: 'Auditoría', oficinaId: 3 },
    { nombre: 'Consultoría', oficinaId: 3 },
    // Querétaro (oficinaId: 4)
    { nombre: 'Auditoría', oficinaId: 4 },
    { nombre: 'Fiscal', oficinaId: 4 },
  ];

  await prisma.area.createMany({
    data: areas.map((area) => ({
      ...area,
      createdAt: new Date(),
    })),
  });
};

const createUsers = async () => {
  const pass = await bcrypt.hash('123456', 10);
  
  // Get IDs from database
  const roles = await prisma.role.findMany();
  const oficinas = await prisma.oficina.findMany();
  const areas = await prisma.area.findMany();

  const users = [
    // Administradores
    {
      nombre: 'Julio Giovanni Flores Zermeño',
      correo: 'administrador@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id, // Guadalajara
      areaId: areas[0].id, // Auditoría Guadalajara
      rolId: roles[0].id, // Administrador
      createdAt: new Date(),
    },
    {
      nombre: 'María González Pérez',
      correo: 'admin.cdmx@test.com',
      contrasena: pass,
      oficinaId: oficinas[1].id, // CDMX
      areaId: areas[4].id, // Auditoría CDMX
      rolId: roles[0].id, // Administrador
      createdAt: new Date(),
    },
    // Gerentes
    {
      nombre: 'Claudia Aracely Flores Zermeño',
      correo: 'gerente@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id,
      areaId: areas[1].id, // Consultoría Guadalajara
      rolId: roles[1].id, // Gerente
      createdAt: new Date(),
    },
    {
      nombre: 'Carlos Ramírez Martínez',
      correo: 'gerente.mty@test.com',
      contrasena: pass,
      oficinaId: oficinas[2].id, // Monterrey
      areaId: areas[7].id, // Auditoría Monterrey
      rolId: roles[1].id, // Gerente
      createdAt: new Date(),
    },
    // Socios
    {
      nombre: 'Saulo Manuel Lomelí Garcia',
      correo: 'socio@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id,
      areaId: areas[0].id,
      rolId: roles[2].id, // Socio
      createdAt: new Date(),
    },
    {
      nombre: 'Ana Patricia Sánchez López',
      correo: 'socio.cdmx@test.com',
      contrasena: pass,
      oficinaId: oficinas[1].id,
      areaId: areas[5].id, // Consultoría CDMX
      rolId: roles[2].id, // Socio
      createdAt: new Date(),
    },
    // Encargados
    {
      nombre: 'Mónica Zermeño Ramírez',
      correo: 'encargado@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id,
      areaId: areas[2].id, // Fiscal Guadalajara
      rolId: roles[3].id, // Encargado
      createdAt: new Date(),
    },
    {
      nombre: 'Roberto Hernández Torres',
      correo: 'encargado.qro@test.com',
      contrasena: pass,
      oficinaId: oficinas[3].id, // Querétaro
      areaId: areas[10].id, // Auditoría Querétaro
      rolId: roles[3].id, // Encargado
      createdAt: new Date(),
    },
    // Socios de Calidad
    {
      nombre: 'Marco Antonio Carrillo Velasco',
      correo: 'sociocalidad@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id,
      areaId: areas[0].id,
      rolId: roles[4].id, // Socio de Calidad
      createdAt: new Date(),
    },
    {
      nombre: 'Laura Martínez Díaz',
      correo: 'sociocalidad.mty@test.com',
      contrasena: pass,
      oficinaId: oficinas[2].id,
      areaId: areas[8].id, // Consultoría Monterrey
      rolId: roles[4].id, // Socio de Calidad
      createdAt: new Date(),
    },
    // Usuarios
    {
      nombre: 'Aracely Zermeño Ramírez',
      correo: 'usuario@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id,
      areaId: areas[0].id,
      rolId: roles[5].id, // Usuario
      createdAt: new Date(),
    },
    {
      nombre: 'Fernando López García',
      correo: 'usuario2@test.com',
      contrasena: pass,
      oficinaId: oficinas[0].id,
      areaId: areas[1].id,
      rolId: roles[5].id, // Usuario
      createdAt: new Date(),
    },
    {
      nombre: 'Patricia Morales Ruiz',
      correo: 'usuario3@test.com',
      contrasena: pass,
      oficinaId: oficinas[1].id,
      areaId: areas[4].id,
      rolId: roles[5].id, // Usuario
      createdAt: new Date(),
    },
    {
      nombre: 'Jorge Silva Mendoza',
      correo: 'usuario4@test.com',
      contrasena: pass,
      oficinaId: oficinas[2].id,
      areaId: areas[7].id,
      rolId: roles[5].id, // Usuario
      createdAt: new Date(),
    },
    {
      nombre: 'Carmen Vega Castro',
      correo: 'usuario5@test.com',
      contrasena: pass,
      oficinaId: oficinas[3].id,
      areaId: areas[10].id,
      rolId: roles[5].id, // Usuario
      createdAt: new Date(),
    },
  ];

  await prisma.usuario.createMany({
    data: users,
  });
};

const createCliente = async () => {
  const clientes = [];
  let tipoPersona: string;
  
  // Create more diverse clients
  const nombresFisicos = [
    'Juan Pérez García',
    'María López Hernández',
    'Carlos Rodríguez Martínez',
    'Ana Martínez Sánchez',
    'Pedro González Ramírez',
  ];

  const nombresMorales = [
    'Tech Solutions S.A. de C.V.',
    'Industrias del Norte S.A.',
    'Servicios Empresariales S.C.',
    'Comercializadora del Sur S.A. de C.V.',
    'Grupo Empresarial México S.A.',
  ];

  for (let i = 0; i < 5; i++) {
    clientes.push({
      nombre: nombresFisicos[i],
      correo: `cliente.fisico${i}@test.com`,
      domicilio: `Calle ${i + 1} de Mayo #${(i + 1) * 100}, Col. Centro`,
      telefono: `55${String(i).padStart(8, '0')}`,
      tipoPersona: 'FISICA',
      createdAt: new Date(),
    });
  }

  for (let i = 0; i < 5; i++) {
    clientes.push({
      nombre: nombresMorales[i],
      correo: `cliente.moral${i}@test.com`,
      domicilio: `Av. Empresarial ${i + 1} #${(i + 1) * 200}, Col. Industrial`,
      telefono: `81${String(i).padStart(8, '0')}`,
      tipoPersona: 'MORAL',
      createdAt: new Date(),
    });
  }

  await prisma.cliente.createMany({
    data: [
      {
        nombre: 'Syc Motors',
        correo: 'syc.motors@correo.com',
        domicilio: 'Av. Industrial 500, Col. Parque Industrial, Guadalajara, Jalisco',
        telefono: '3331234567',
        tipoPersona: 'MORAL',
        createdAt: new Date(),
      },
      {
        nombre: 'Grupo Empresarial ABC',
        correo: 'abc@correo.com',
        domicilio: 'Blvd. Revolución 1500, Col. Del Valle, Ciudad de México',
        telefono: '5559876543',
        tipoPersona: 'MORAL',
        createdAt: new Date(),
      },
      ...clientes,
    ],
  });
};

const createCuestionario = async () => {
  await prisma.cuestionario.createMany({
    data: [
      {
        TipoCuestionario: 'CUESTIONARIO_INDEPENDENCIA_PROYECTO',
      },
      {
        TipoCuestionario: 'CUESTIONARIO_INDEPENDENCIA_ANUAL',
      },
      {
        TipoCuestionario: 'CUESTIONARIO_ACEPTACION',
      },
      {
        TipoCuestionario: 'CUESTIONARIO_CONTINUIDAD',
      },
    ],
  });
};

const createPreguntas = async () => {
  const cuestionarios = await prisma.cuestionario.findMany();
  
  // Preguntas para CUESTIONARIO_INDEPENDENCIA_PROYECTO
  const indepProyecto = cuestionarios.find(
    (c) => c.TipoCuestionario === 'CUESTIONARIO_INDEPENDENCIA_PROYECTO'
  );
  
  if (indepProyecto) {
    await prisma.pregunta.createMany({
      data: [
        {
          cuestionarioId: indepProyecto.id,
          pregunta: '¿Tiene alguna relación financiera con el cliente?',
          posicion: 1,
          tipo: 'BOOLEANO',
          createdAt: new Date(),
        },
        {
          cuestionarioId: indepProyecto.id,
          pregunta: '¿Ha trabajado previamente para este cliente?',
          posicion: 2,
          tipo: 'BOOLEANO',
          createdAt: new Date(),
        },
        {
          cuestionarioId: indepProyecto.id,
          pregunta: '¿Tiene algún familiar que trabaje en el cliente?',
          posicion: 3,
          tipo: 'BOOLEANO',
          createdAt: new Date(),
        },
        {
          cuestionarioId: indepProyecto.id,
          pregunta: 'Si respondió afirmativamente, especifique los detalles',
          preguntaPadre: null, // Will be updated after creation
          posicion: 4,
          tipo: 'TEXTO',
          valorAnidado: 'true',
          createdAt: new Date(),
        },
      ],
    });

    // Update pregunta anidada
    const preguntas = await prisma.pregunta.findMany({
      where: { cuestionarioId: indepProyecto.id },
    });
    const preguntaAnidada = preguntas.find((p) => p.posicion === 4);
    const preguntaPadre = preguntas.find((p) => p.posicion === 3);
    
    if (preguntaAnidada && preguntaPadre) {
      await prisma.pregunta.update({
        where: { id: preguntaAnidada.id },
        data: { preguntaPadre: preguntaPadre.id },
      });
    }
  }

  // Preguntas para CUESTIONARIO_ACEPTACION
  const aceptacion = cuestionarios.find(
    (c) => c.TipoCuestionario === 'CUESTIONARIO_ACEPTACION'
  );
  
  if (aceptacion) {
    await prisma.pregunta.createMany({
      data: [
        {
          cuestionarioId: aceptacion.id,
          pregunta: '¿El cliente cumple con los requisitos éticos?',
          posicion: 1,
          tipo: 'SELECCION_UNICA',
          posiblesRespuestas: ['Sí', 'No', 'Requiere revisión'],
          createdAt: new Date(),
        },
        {
          cuestionarioId: aceptacion.id,
          pregunta: '¿El proyecto está alineado con nuestros valores?',
          posicion: 2,
          tipo: 'BOOLEANO',
          createdAt: new Date(),
        },
      ],
    });
  }

  // Preguntas para CUESTIONARIO_CONTINUIDAD
  const continuidad = cuestionarios.find(
    (c) => c.TipoCuestionario === 'CUESTIONARIO_CONTINUIDAD'
  );
  
  if (continuidad) {
    await prisma.pregunta.createMany({
      data: [
        {
          cuestionarioId: continuidad.id,
          pregunta: '¿El cliente ha cumplido con los pagos anteriores?',
          posicion: 1,
          tipo: 'BOOLEANO',
          createdAt: new Date(),
        },
        {
          cuestionarioId: continuidad.id,
          pregunta: '¿Hay cambios significativos en el proyecto?',
          posicion: 2,
          tipo: 'BOOLEANO',
          createdAt: new Date(),
        },
      ],
    });
  }
};

const createProyectos = async () => {
  const usuarios = await prisma.usuario.findMany();
  const clientes = await prisma.cliente.findMany();
  const oficinas = await prisma.oficina.findMany();
  const areas = await prisma.area.findMany();

  const proyectos = [
    {
      nombre: 'Auditoría Financiera 2024',
      descripcion: 'Auditoría anual de estados financieros para el ejercicio 2024',
      estado: estadoProyecto.EN_PROGRESO,
      fechaInicio: new Date('2024-01-15'),
      fechaFin: new Date('2024-03-31'),
      clienteId: clientes[0].id,
      usuarioId: usuarios[0].id,
      oficinaId: oficinas[0].id,
      areaId: areas[0].id, // Auditoría Guadalajara
      createdAt: new Date('2024-01-10'),
    },
    {
      nombre: 'Consultoría Estratégica',
      descripcion: 'Proyecto de consultoría para reestructuración organizacional',
      estado: estadoProyecto.NUEVO,
      fechaInicio: new Date('2024-02-01'),
      fechaFin: null,
      clienteId: clientes[1].id,
      usuarioId: usuarios[2].id,
      oficinaId: oficinas[0].id,
      areaId: areas[1].id, // Consultoría Guadalajara
      createdAt: new Date('2024-01-25'),
    },
    {
      nombre: 'Asesoría Fiscal 2024',
      descripcion: 'Servicios de asesoría fiscal y cumplimiento de obligaciones',
      estado: estadoProyecto.EN_PROGRESO,
      fechaInicio: new Date('2024-01-01'),
      fechaFin: new Date('2024-12-31'),
      clienteId: clientes[2].id,
      usuarioId: usuarios[6].id,
      oficinaId: oficinas[0].id,
      areaId: areas[2].id, // Fiscal Guadalajara
      createdAt: new Date('2023-12-15'),
    },
    {
      nombre: 'Auditoría Interna',
      descripcion: 'Auditoría de procesos internos y controles',
      estado: estadoProyecto.FINALIZADO,
      fechaInicio: new Date('2023-10-01'),
      fechaFin: new Date('2023-12-15'),
      clienteId: clientes[3].id,
      usuarioId: usuarios[4].id,
      oficinaId: oficinas[1].id, // CDMX
      areaId: areas[4].id, // Auditoría CDMX
      createdAt: new Date('2023-09-20'),
    },
    {
      nombre: 'Due Diligence',
      descripcion: 'Análisis de due diligence para adquisición empresarial',
      estado: estadoProyecto.EN_PROGRESO,
      fechaInicio: new Date('2024-02-10'),
      fechaFin: new Date('2024-04-30'),
      clienteId: clientes[4].id,
      usuarioId: usuarios[3].id,
      oficinaId: oficinas[2].id, // Monterrey
      areaId: areas[7].id, // Auditoría Monterrey
      createdAt: new Date('2024-02-05'),
    },
  ];

  await prisma.proyecto.createMany({
    data: proyectos,
  });
};

const createRespuestas = async () => {
  const proyectos = await prisma.proyecto.findMany();
  
  const respuestas: Prisma.RespuestaCreateManyInput[] = [];
  
  proyectos.forEach((proyecto) => {
    respuestas.push({
      proyectoId: proyecto.id,
      respuesta: `Respuesta de prueba para el proyecto ${proyecto.nombre}`,
      fecha: new Date(),
      createdAt: new Date(),
    });
  });

  if (respuestas.length > 0) {
    await prisma.respuesta.createMany({
      data: respuestas,
    });
  }
};

const createTickets = async () => {
  const usuarios = await prisma.usuario.findMany();
  
  const tickets = [
    {
      usuarioPreguntaId: usuarios[10].id, // Usuario regular
      usuarioRespuestaId: usuarios[0].id, // Administrador
      titulo: 'Consulta sobre proceso de auditoría',
      descripcion: 'Necesito aclaración sobre el proceso de documentación en auditoría',
      estado: 'RESUELTO',
      createdAt: new Date('2024-01-15'),
    },
    {
      usuarioPreguntaId: usuarios[11].id,
      usuarioRespuestaId: usuarios[1].id, // Gerente
      titulo: 'Solicitud de acceso a sistema',
      descripcion: 'Requiero acceso al módulo de reportes',
      estado: 'EN_PROCESO',
      createdAt: new Date('2024-01-20'),
    },
    {
      usuarioPreguntaId: usuarios[12].id,
      usuarioRespuestaId: null,
      titulo: 'Problema con carga de documentos',
      descripcion: 'No puedo subir archivos mayores a 10MB',
      estado: 'ABIERTO',
      createdAt: new Date('2024-01-25'),
    },
  ];

  await prisma.ticket.createMany({
    data: tickets,
  });
};

const createComentarios = async () => {
  const tickets = await prisma.ticket.findMany();
  const usuarios = await prisma.usuario.findMany();

  if (tickets.length > 0 && usuarios.length > 0) {
    const comentarios = [
      {
        ticketId: tickets[0].id,
        usuarioId: usuarios[0].id,
        comentario: 'El proceso está documentado en el manual de procedimientos, sección 3.2',
        createdAt: new Date('2024-01-16'),
      },
      {
        ticketId: tickets[1].id,
        usuarioId: usuarios[1].id,
        comentario: 'Revisando permisos, se asignará acceso en las próximas horas',
        createdAt: new Date('2024-01-21'),
      },
    ];

    await prisma.comentario.createMany({
      data: comentarios,
    });
  }
};

const createAceptaciones = async () => {
  const usuarios = await prisma.usuario.findMany();
  const tickets = await prisma.ticket.findMany();

  if (usuarios.length > 0 && tickets.length > 0) {
    await prisma.aceptacion.createMany({
      data: [
        {
          usuarioId: usuarios[0].id,
          file: '/uploads/aceptacion_1.pdf',
          ticketId: tickets[0].id,
          createdAt: new Date('2024-01-16'),
        },
        {
          usuarioId: usuarios[2].id,
          file: '/uploads/aceptacion_2.pdf',
          ticketId: tickets[1].id,
          createdAt: new Date('2024-01-22'),
        },
      ],
    });
  }
};

const createAceptacionesAnuales = async () => {
  const usuarios = await prisma.usuario.findMany();
  const currentYear = new Date().getFullYear();

  if (usuarios.length > 0) {
    const aceptaciones = usuarios.slice(0, 8).map((usuario, index) => ({
      usuarioId: usuario.id,
      year: currentYear,
      estadoAceptacion: index % 3 === 0 ? estadoAceptacion.ACEPTADO : index % 3 === 1 ? estadoAceptacion.RECHAZADO : estadoAceptacion.EN_ESPERA,
      createdAt: new Date(),
    }));

    await prisma.aceptacionAnual.createMany({
      data: aceptaciones,
    });
  }
};

const createUsuarioCliente = async () => {
  const usuarios = await prisma.usuario.findMany();
  const clientes = await prisma.cliente.findMany();

  if (usuarios.length > 0 && clientes.length > 0) {
    const relaciones = [
      { usuarioId: usuarios[0].id, clienteId: clientes[0].id },
      { usuarioId: usuarios[0].id, clienteId: clientes[1].id },
      { usuarioId: usuarios[2].id, clienteId: clientes[1].id },
      { usuarioId: usuarios[2].id, clienteId: clientes[2].id },
      { usuarioId: usuarios[6].id, clienteId: clientes[2].id },
      { usuarioId: usuarios[3].id, clienteId: clientes[4].id },
    ];

    await prisma.usuarioCliente.createMany({
      data: relaciones,
    });
  }
};

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  console.log('📋 Creando roles...');
  await createRol();

  console.log('🏢 Creando oficinas...');
  await createOficina();

  console.log('📁 Creando áreas...');
  await createArea();

  console.log('👥 Creando usuarios...');
  await createUsers();

  console.log('🏢 Creando clientes...');
  await createCliente();

  console.log('📝 Creando cuestionarios...');
  await createCuestionario();

  console.log('❓ Creando preguntas...');
  await createPreguntas();

  console.log('📊 Creando proyectos...');
  await createProyectos();

  console.log('💬 Creando respuestas...');
  await createRespuestas();

  console.log('🎫 Creando tickets...');
  await createTickets();

  console.log('💭 Creando comentarios...');
  await createComentarios();

  console.log('✅ Creando aceptaciones...');
  await createAceptaciones();

  console.log('📅 Creando aceptaciones anuales...');
  await createAceptacionesAnuales();

  console.log('🔗 Creando relaciones usuario-cliente...');
  await createUsuarioCliente();

  console.log('✨ Seed completado exitosamente!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error durante el seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
