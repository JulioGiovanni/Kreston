import { IArrayLinks } from '../interfaces/links.interface';
import {
  IconArchive,
  IconAward,
  IconBriefcase,
  IconCheck,
  IconClipboard,
  IconFolder,
  IconHome,
  IconInfoCircle,
  IconSquare,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

export const AdminLinks: IArrayLinks[] = [
  {
    link: '/dashboard',
    text: 'Inicio',
    Icon: IconHome,
  },
  {
    text: 'Clientes',
    Icon: IconUsers,
    link: '/clientes',
  },
  {
    text: 'A Y C',
    Icon: IconCheck,
    accordion: true,
    tooltip: true,
    tooltipText: 'Aceptación y Continuidad',
    accordionLinks: [
      {
        link: '/ayc/aceptacion',
        text: ' Aceptación',
      },
      {
        link: '/ayc/continuidad',
        text: ' Continuidad',
      },
    ],
  },
  {
    text: 'Independencia',
    Icon: IconFolder,
    accordion: true,
    accordionLinks: [
      {
        link: '/independencia/anual',
        text: ' Anual',
      },
      {
        link: '/independencia/proyecto',
        text: ' Proyecto',
      },
    ],
  },
  {
    text: 'Proyectos',
    Icon: IconArchive,
    link: '/proyectos',
  },
  {
    text: 'Consultas',
    Icon: IconInfoCircle,
    accordion: true,
    link: '/consultas',
    accordionLinks: [
      {
        link: '/consultas/crear',
        text: ' Crear',
      },
      {
        link: '/consultas/aprobadas',
        text: ' Aprobadas',
      },
      {
        link: '/consultas/rechazadas',
        text: ' Rechazadas',
      },
      {
        link: '/consultas/espera',
        text: ' En espera',
      },
    ],
  },
  {
    link: '/usuarios',
    text: 'Usuarios',
    Icon: IconUser,
  },
  {
    link: '/areas',
    text: 'Áreas',
    Icon: IconSquare,
  },
  {
    link: '/oficinas',
    text: 'Oficinas',
    Icon: IconBriefcase,
  },
  {
    text: 'Cuestionario',
    Icon: IconClipboard,
    link: '/cuestionarios',
  },
  {
    text: 'Control de calidad',
    Icon: IconAward,
    link: '/calidad',
  },
];

export const UserLinks = [];
