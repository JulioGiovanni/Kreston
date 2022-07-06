
import { FiCheck,FiHome,FiUser,FiFolder,FiSquare,FiInfo,FiClipboard, FiBriefcase,FiArchive } from "react-icons/fi";

export const AdminLinks = [
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
        accordion:true,
        accordionLinks:[
            {
                text: 'Nuevo cuestionario',
                link: '/index/cuestionarios/crear',
            },
            {
                text: 'Ver cuestionarios',
                link: '/index/cuestionarios/ver',
            },
            {
                text: 'Editar cuestionarios',
                link: '/index/cuestionarios/editar',
            }
        ]
    },
    {
        text: 'Proyectos',
        Icon: FiArchive,
        link: '/index/proyectos',
    }
]

export const UserLinks = [
];