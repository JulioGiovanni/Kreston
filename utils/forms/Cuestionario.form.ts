import { FieldTypes, IField } from '../../interfaces/form.interface';

export const generateCuestionarioForm = () => {
  const cuestionarioForm: IField[] = [
    {
      label: 'Tipo de cuestionario',
      name: 'tipo',
      type: FieldTypes.SELECT,
      description: 'Solo puede haber un cuestionario por tipo',
      options: [
        { label: 'Independencia por Proyecto', value: 'proyecto' },
        { label: 'Independencia Anual', value: 'usuario' },
        { label: 'Aceptación', value: 'aceptacion' },
        { label: 'Continuidad', value: 'continuidad' },
      ],
      required: true,
      defaultValue: 'proyecto',
    },
  ];

  return cuestionarioForm;
};
