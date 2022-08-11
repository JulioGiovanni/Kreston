import axios from "axios";

export const ProyectosApi = {
    getAllProyectos: async () => await axios.get('/api/proyectos') ,
    createNewProyecto: async (data: any) => await axios.post(`/api/proyectos`, { data }),

}