import { IField, FieldTypes } from '../../interfaces/form.interface';

export const generateAreaForm = (oficina: any) => {
  const areaForm: IField[] = [
    {
      label: 'Nombre',
      name: 'nombre',
      type: FieldTypes.TEXT,
      placeholder: 'Nombre',
      required: true,
      defaultValue: '',
    },
    {
      label: 'Seleccione una oficina para esta área',
      name: 'oficina',
      type: FieldTypes.SELECT,
      placeholder: 'Oficina',
      required: true,
      options: oficina?.map((oficina: any) => {
        return { value: oficina.id.toString(), label: oficina.nombre };
      }),
      defaultValue: '',
    },
  ];
  return areaForm;
};
