
import { FiCheck,FiHome,FiUser,FiFolder,FiSquare,FiInfo,FiClipboard, FiBriefcase,FiArchive } from "react-icons/fi";

export const AdminLinks = [
    {   
        link: '/dashboard',  
        text: 'Inicio',
        Icon:  FiHome, 
    },
    {   
        link: '/aceptacion',  
        text: 'Aceptación',
        Icon:  FiCheck,
    },
    {   
        link: '/independencias',  
        text: 'Independencia',
        Icon:  FiFolder ,
    },
    {   
        text: 'Consultas',
        Icon:  FiInfo ,
        accordion:true,
        accordionLinks:[

            {
                link: '/consultas/crear',
                text:' Crear',  
            },
            {
                link: '/consultas/aprobadas',
                text:' Aprobadas',
            },
            {
                link: '/consultas/rechazadas',
                text:' Rechazadas',
            },
            {
                link: '/consultas/espera',
                text:' En espera',
            },
        ]
        
    },
    {   
        link: '/usuarios',  
        text: 'Usuarios',
        Icon:  FiUser ,
    },
    {   
        link: '/areas',  
        text: 'Áreas',
        Icon:  FiSquare ,
    },
    {   
        link: '/oficinas',  
        text: 'Oficinas',
        Icon:  FiBriefcase ,

        
    },
    {   
        text: 'Cuestionario',
        Icon: FiClipboard,
        accordion:true,
        accordionLinks:[
            {
                text: 'Nuevo cuestionario',
                link: '/cuestionarios/crear',
            },
            {
                text: 'Ver cuestionarios',
                link: '/cuestionarios/ver',
            },
            {
                text: 'Editar cuestionarios',
                link: '/cuestionarios/editar',
            }
        ]
    },
    {
        text: 'Proyectos',
        Icon: FiArchive,
        link: '/proyectos',
    }
]

export const UserLinks = [
];