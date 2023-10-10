import { IArea, IOficina } from '../../interfaces';
import { FieldTypes, IField } from '../../interfaces/form.interface';
import { IRole } from '../../interfaces/role.interface';

export const generateUsuarioForm = (areas: IArea[], oficina: IOficina[], rol: IRole[]) => {
  const userForm: IField[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: FieldTypes.TEXT,
      required: true,
      placeholder: 'Nombre',
      defaultValue: '',
    },
    {
      name: 'correo',
      label: 'Correo',
      type: FieldTypes.TEXT,
      required: true,
      placeholder: 'Correo',
      defaultValue: '',
    },
    {
      name: 'oficina',
      label: 'Oficina',
      type: FieldTypes.SELECT,
      required: true,
      placeholder: 'Seleccione la oficina a la que pertenece este usuario',
      defaultValue: '',
      options: oficina?.map((oficina: IOficina) => ({
        label: oficina.nombre,
        value: oficina.id.toString(),
      })),
    },
    {
      name: 'area',
      label: 'Área',
      type: FieldTypes.SELECT,
      required: true,
      placeholder: 'Seleccione el área a la que pertenece este usuario',
      defaultValue: '',
      options: areas?.map((area: IArea) => ({
        label: area.nombre,
        value: area.id.toString(),
      })),
    },
    {
      name: 'rol',
      label: 'Rol',
      type: FieldTypes.SELECT,
      required: true,
      placeholder: 'Seleccione el rol de este usuario',
      defaultValue: 6,
      options: rol?.map((rol: IRole) => ({
        label: rol.nombre,
        value: rol.id.toString(),
      })),
    },
  ];
  return userForm;
};
