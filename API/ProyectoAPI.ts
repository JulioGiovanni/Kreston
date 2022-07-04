import axios from "axios";

export const ProyectosApi = {
    createNewProyecto: async (data: any) => await axios.post(`/api/proyectos`, { data }),

}