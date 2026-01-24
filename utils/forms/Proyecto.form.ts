import { FieldTypes, IField } from '../../interfaces/form.interface';
export const generateProyectosForm = (Clientes: any, Usuarios: any, Oficinas: any, Areas: any) => {
  const proyectosForm: IField[] = [
    {
      label: 'Nombre',
      name: 'nombre',
      type: FieldTypes.TEXT,
      placeholder: 'Nombre',
      required: true,
      defaultValue: 'Proyecto de prueba',
    },
    {
      label: 'Descripción',
      name: 'descripcion',
      type: FieldTypes.TEXT,
      placeholder: 'Descripción',
      required: true,
      defaultValue: 'Prueba',
    },
    {
      label: 'Seleccione un cliente para este proyecto',
      name: 'cliente',
      type: FieldTypes.SELECT,
      placeholder: 'Cliente',
      required: true,
      options: Clientes?.map((cliente: any) => {
        return { value: cliente.id.toString(), label: cliente.nombre };
      }),
      defaultValue: '',
    },
    {
      label: 'Seleccione un usuario para este proyecto',
      name: 'usuario',
      type: FieldTypes.SELECT,
      placeholder: 'Usuario',
      required: true,
      options: Usuarios?.map((usuario: any) => {
        return { value: usuario.id, label: usuario.nombre };
      }),
      defaultValue: '',
    },
    {
      label: 'Seleccione una oficina para este proyecto',
      name: 'oficina',
      type: FieldTypes.SELECT,
      placeholder: 'Oficina',
      required: true,
      options: Oficinas?.map((oficina: any) => {
        return { value: oficina.id.toString(), label: oficina.nombre };
      }),
      defaultValue: '',
    },
    {
      label: 'Seleccione un área para este proyecto',
      name: 'area',
      type: FieldTypes.SELECT,
      placeholder: 'Área',
      required: true,
      options: Areas?.map((area: any) => {
        return { value: area.id.toString(), label: area.nombre };
      }),
      defaultValue: '',
    },
    {
      label: 'Estado',
      name: 'estado',
      type: FieldTypes.SELECT,
      placeholder: 'Estado',
      required: true,
      options: [
        { value: 'NUEVO', label: 'Nuevo' },
        { value: 'EN_PROGRESO', label: 'En progreso' },
        { value: 'FINALIZADO', label: 'Finalizado' },
      ],
      defaultValue: 'NUEVO',
      description: 'Si no se selecciona un estado, se tomará por defecto el estado NUEVO',
    },
    {
      label: 'Fecha de inicio',
      name: 'fechaInicio',
      type: FieldTypes.DATE,
      placeholder: 'Fecha de inicio',
      required: true,
      defaultValue: new Date(),
      description: 'Si no se selecciona una fecha, se creara con la fecha actual',
    },
  ];
  return proyectosForm;
};
