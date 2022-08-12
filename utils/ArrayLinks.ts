
import { FiCheck,FiHome,FiUser,FiFolder,FiSquare,FiInfo,FiClipboard, FiBriefcase,FiArchive,FiUsers } from "react-icons/fi";
import { IArrayLinks } from '../interfaces/links.interface';

export const AdminLinks: IArrayLinks[] = [
    {   
        link: '/index/dashboard',  
        text: 'Inicio',
        Icon:  FiHome, 
    },
    {   
        link: '/index/aceptacion',  
        text: 'Aceptación',
        Icon:  FiCheck,
    },
    {   
        link: '/index/independencias',  
        text: 'Independencia',
        Icon:  FiFolder ,
    },
    {   
        text: 'Consultas',
        Icon:  FiInfo ,
        accordion:true,
        link:'/index/consultas',
        accordionLinks:[

            {
                link: '/index/consultas/crear',
                text:' Crear',  
            },
            {
                link: '/index/consultas/aprobadas',
                text:' Aprobadas',
            },
            {
                link: '/index/consultas/rechazadas',
                text:' Rechazadas',
            },
            {
                link: '/index/consultas/espera',
                text:' En espera',
            },
        ]
        
    },
    {   
        link: '/index/usuarios',  
        text: 'Usuarios',
        Icon:  FiUser ,
    },
    {   
        link: '/index/areas',  
        text: 'Áreas',
        Icon:  FiSquare ,
    },
    {   
        link: '/index/oficinas',  
        text: 'Oficinas',
        Icon:  FiBriefcase ,
    },
    {   
        text: 'Cuestionario',
        Icon: FiClipboard,
        link: '/index/cuestionarios',
        
    },
    {
        text: 'Proyectos',
        Icon: FiArchive,
        link: '/index/proyectos',
    },
    {
        text: 'Clientes',
        Icon: FiUsers,
        link: '/index/clientes',
    }
]

export const UserLinks = [
];