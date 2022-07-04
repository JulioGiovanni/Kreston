import axios from "axios";
import { APIURL } from "../utils/GlobalVariables";

export const RolApi = {
    getAllRoles: async () => await axios.get(`${APIURL}/api/roles`),
    createNewRol: async (nombre: string) => await axios.post(`${APIURL}/api/roles`, { nombre }),

}