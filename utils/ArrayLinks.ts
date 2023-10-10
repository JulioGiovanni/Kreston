import {
  FiCheck,
  FiHome,
  FiUser,
  FiFolder,
  FiSquare,
  FiInfo,
  FiClipboard,
  FiBriefcase,
  FiArchive,
  FiUsers,
} from 'react-icons/fi';
import { IArrayLinks } from '../interfaces/links.interface';

export const AdminLinks: IArrayLinks[] = [
  {
    link: '/dashboard',
    text: 'Inicio',
    Icon: FiHome,
  },
  {
    link: '/aceptacion',
    text: 'A Y C',
    Icon: FiCheck,
    accordion: true,
    tooltip: true,
    tooltipText: 'Aceptación y Continuidad',
    accordionLinks: [
      {
        link: '/aceptacion',
        text: ' Aceptación',
      },
      {
        link: '/continuidad',
        text: ' Continuidad',
      },
    ],
  },
  {
    link: '/independencias',
    text: 'Independencia',
    Icon: FiFolder,
  },
  {
    text: 'Consultas',
    Icon: FiInfo,
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
    Icon: FiUser,
  },
  {
    link: '/areas',
    text: 'Áreas',
    Icon: FiSquare,
  },
  {
    link: '/oficinas',
    text: 'Oficinas',
    Icon: FiBriefcase,
  },
  {
    text: 'Cuestionario',
    Icon: FiClipboard,
    link: '/cuestionarios',
  },
  {
    text: 'Proyectos',
    Icon: FiArchive,
    link: '/proyectos',
  },
  {
    text: 'Clientes',
    Icon: FiUsers,
    link: '/clientes',
  },
];

export const UserLinks = [];
