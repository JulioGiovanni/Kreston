import axios from "axios";


export const AreaApi = {
    getAllAreas: async () => await axios.get(`/api/areas`),
    createNewArea: async (data: any) => await axios.post(`/api/areas`, { data }),

}