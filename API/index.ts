import { UserApi } from './UserApi';
import { OficinaApi } from './OficinaApi';
import { RolApi } from './RolApi';
import { AuthApi } from './AuthApi';
import { AreaApi } from './AreaAPI';
import { ProyectosApi } from './ProyectoAPI';

export const API = {

    UserApi,
    OficinaApi,
    RolApi,
    LoginApi: AuthApi,
    AreaApi,
    ProyectosApi,
}