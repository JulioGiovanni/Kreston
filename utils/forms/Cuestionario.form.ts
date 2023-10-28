import { FieldTypes, IField } from '../../interfaces/form.interface';

export const generateCuestionarioForm = () => {
  const cuestionarioForm: IField[] = [
    {
      label: 'Tipo de cuestionario',
      name: 'tipo',
      type: FieldTypes.SELECT,
      description: 'Solo puede haber un cuestionario por tipo',
      options: [
        { label: 'Independencia por Proyecto', value: 'CUESTIONARIO_INDEPENDENCIA_PROYECTO' },
        { label: 'Independencia Anual', value: 'CUESTIONARIO_INDEPENDENCIA_ANUAL' },
        { label: 'Aceptación', value: 'CUESTIONARIO_ACEPTACION' },
        { label: 'Continuidad', value: 'CUESTIONARIO_CONTINUIDAD' },
      ],
      required: true,
      defaultValue: 'CUESTIONARIO_INDEPENDENCIA_PROYECTO',
    },
  ];

  return cuestionarioForm;
};
