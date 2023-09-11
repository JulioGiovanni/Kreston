import { FC, useContext } from 'react';

import { Anchor, Button, Group, PasswordInput, Select, TextInput, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { ErrorsContext } from '../../context/Errors/ErrorsContext';

import { createNewUser } from '../../services/usuarios.service';
import { queryAreas } from '../../ReactQuery/Areas';
import { useAllOffice } from '../../ReactQuery/Oficinas';
import { useAllRoles } from '../../ReactQuery/Rol';
import Loading from '../UI/Loading';

interface UserEditFormProps {
  setOpenedModal: any;
}

const NewUserForm: FC<UserEditFormProps> = ({ setOpenedModal }) => {
  const { Areas, isLoading: ArLoading, isError: ArError } = queryAreas();
  const { Oficinas, isLoading: OfLoading, isError: OfError } = useAllOffice();
  const { Roles, isLoading: RoLoading, isError: RoError } = useAllRoles();
  const { setNewError, removeError } = useContext(ErrorsContext);
  const isMobile = useMediaQuery('(max-width: 755px');

  let areaData: any = [];
  let oficinaData: any = [];
  let roleData: any = [];

  if (Oficinas && Oficinas.length > 0 && Areas && Areas.length > 0 && Roles && Roles.length > 0) {
    areaData = Areas.map((area: any) => ({ value: area.id, label: area.nombre }));
    oficinaData = Oficinas.map((oficina: any) => ({
      value: oficina.id,
      label: oficina.nombre,
    }));
    roleData = Roles.map((role: any) => ({ value: role.id, label: role.nombre }));
  }

  const form = useForm({
    initialValues: {
      nombre: '',
      correo: '',
      contrasena: '',
      area: 0,
      rol: 0,
      oficina: 0,
    },
  });
  
  return (
    <>
      {ArLoading || OfLoading || RoLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data: newUser } = await createNewUser(values);

              removeError();
              setOpenedModal(false);
            } catch (error: any) {
              setNewError(error.response.data.message, error.response.data.type);
              form.setFieldError(
                error.response.data.type.toLowerCase(),
                error.response.data.message
              );
            }
          })}
        >
          <TextInput
            required
            label="Nombre"
            name="nombre"
            id="nombre"
            placeholder="Juan Pérez"
            variant="default"
            {...form.getInputProps('nombre')}
          />
          {/* <NumberInput
            label="Teléfono"
            placeholder="1234567890"
            value={form.values.telefono}
            onChange={(event) => form.setFieldValue('telefono', event)}
        /> */}

          <TextInput
            required
            label="Correo"
            name="correo"
            id="correo"
            placeholder="email@email.com"
            variant="default"
            {...form.getInputProps('correo')}
          />

          <PasswordInput
            required
            label="Contraseña"
            name="contrasena"
            id="contrasena"
            placeholder="*******"
            variant="default"
            {...form.getInputProps('contrasena')}
          />

          <Select
            label="Escoge un área"
            placeholder="Áreas"
            name="area"
            id="area"
            data={areaData}
            {...form.getInputProps('area')}
          />
          <Select
            label="Escoge una oficina"
            placeholder="Oficinas"
            name="oficina"
            id="oficina"
            data={oficinaData}
            {...form.getInputProps('oficina')}
          />
          <Select
            label="Escoge un rol para este usuario"
            placeholder="Roles"
            name="rol"
            id="rol"
            data={roleData}
            {...form.getInputProps('rol')}
          />

          <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor component="button" color="gray" size="sm" onClick={() => setOpenedModal(false)}>
              Cancelar
            </Anchor>
            <Button type="submit" size="sm">
              Guardar
            </Button>
          </Group>
        </form>
      )}
    </>
  );
};

export default NewUserForm;
