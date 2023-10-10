import { FieldTypes, IField } from '../../interfaces/form.interface';

export const generateClienteForm = (socios: any, gerentes: any) => {
  const formInputs: IField[] = [
    {
      label: 'Nombre',
      name: 'nombre',
      type: FieldTypes.TEXT,
      defaultValue: 'Cliente ',
      placeholder: 'Nombre',
      required: true,
    },
    {
      label: 'Correo',
      name: 'correo',
      type: FieldTypes.TEXT,
      placeholder: 'Correo',
      required: true,
      defaultValue: 'cliente9@test.com',
    },
    {
      label: 'Teléfono',
      name: 'telefono',
      type: FieldTypes.NUMBER,
      placeholder: 'Teléfono',
      required: true,
      defaultValue: '1234567890',
    },
    {
      label: 'Domicilio',
      name: 'domicilio',
      type: FieldTypes.TEXT,
      placeholder: 'Domicilio',
      required: true,
      defaultValue: 'Calle falsa 123',
    },
    {
      label: 'Tipo de persona',
      name: 'tipoPersona',
      type: FieldTypes.SELECT,
      placeholder: 'Tipo de persona',
      required: true,
      defaultValue: 'FISICA',
      options: [
        { value: 'FISICA', label: 'Persona física' },
        { value: 'MORAL', label: 'Persona moral' },
      ],
    },
    {
      label: 'Socio encargado',
      name: 'socioEncargado',
      type: FieldTypes.MULTISELECT,
      placeholder: 'Socio encargado',
      required: true,
      defaultValue: undefined,
      options: socios?.map((socio: any) => ({
        label: socio.nombre,
        value: socio.id,
      })),
      maxValues: 2,
    },
    {
      label: 'Gerente encargado',
      name: 'gerenteEncargado',
      type: FieldTypes.MULTISELECT,
      placeholder: 'Gerente encargado',
      required: true,
      defaultValue: undefined,
      options: gerentes?.map((gerente: any) => ({
        label: gerente.nombre,
        value: gerente.id,
      })),
      maxValues: 2,
    },
  ];
  return formInputs;
};
