'use client';
import React, { useContext, useState } from 'react';
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Card,
  Title,
  Button,
  Modal,
  TextInput,
  Select,
  Space,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Layout from '../../../components/Layout/Layout';
import { FiPlus } from 'react-icons/fi';
import { ErrorsContext } from '../../../context/Errors';
import { useForm } from '@mantine/form';
import { createNewProyecto } from '../../../services/proyecto.service';
import { useAllUsers } from '../../../hooks/useUser';
import { useAllAreas } from '../../../hooks/useArea';
import { useAllProyectos } from '../../../hooks/useProyecto';
import { useAllOffice } from '../../../hooks/useOffice';
import { useAllClient } from '../../../hooks/useClient';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export function Proyectos(props) {
  const [openedModal, setOpenedModal] = useState(false);
  const { setNewError, removeError } = useContext(ErrorsContext);
  const { Usuarios, isLoading: UsLoading, error: UsError } = useAllUsers();
  const { Areas, isLoading: ArLoading, error: ArError } = useAllAreas();
  const { Proyectos, isLoading: PrLoading, error: PrError } = useAllProyectos();
  const { Oficinas, isLoading: OfLoading, error: OfError } = useAllOffice();
  const { Clientes, isLoading: ClLoading, error: ClError } = useAllClient();

  console.log('Clientes is Loading: ', ClLoading);
  let rows = [];
  const form = useForm({
    initialValues: {
      usuario: '',
      oficina: '',
      area: '',
      nombre: '',
      descripcion: '',
      estado: '',
      cliente: '',
      fechaInicio: '',
    },
  });
  const onSubmitForm = async (values: any) => {
    try {
      const proyecto = await createNewProyecto(values);
      form.reset();
      setOpenedModal(false);
      removeError();
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };
  if (!PrLoading) {
    rows = Proyectos.map((item: any) => {
      return (
        <tr key={item.id}>
          <td>{item.nombre}</td>
          <td>{item.descripcion}</td>
          <td>
            <Group spacing="sm">
              <Text size="sm" weight={500}>
                {item.usuario.nombre}
              </Text>
            </Group>
          </td>
          <td>{item.area.nombre}</td>
          <td>{item.oficina.nombre}</td>
        </tr>
      );
    });
  }

  return (
    <Layout>
      {UsLoading && ArLoading && PrLoading && ClLoading && OfLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title order={3}>Cargando...</Title>
        </div>
      ) : (
        <>
          <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title={'Agregar Proyecto'}
          >
            {/* Usuario,nombre,descripción y estado */}
            <form onSubmit={form.onSubmit(onSubmitForm)}>
              <TextInput
                label="Nombre del proyecto"
                name="nombre"
                {...form.getInputProps('nombre')}
                required
              />
              <TextInput
                label="Descripción"
                name="descripcion"
                {...form.getInputProps('descripcion')}
                required
              />
              <Select
                data={Clientes.map((cliente: any) => ({
                  label: cliente.nombre,
                  value: cliente.id,
                }))}
                label="Seleccione un cliente para este proyecto"
                name="area"
                {...form.getInputProps('cliente')}
                required
              />
              <Select
                data={Usuarios.map((user: any) => ({ label: user.nombre, value: user.id }))}
                label="Seleccione un usuario para este proyecto"
                name="usuario"
                {...form.getInputProps('usuario')}
                required
              />
              <Select
                data={Oficinas.map((oficina: any) => ({
                  label: oficina.nombre,
                  value: oficina.id,
                }))}
                label="Seleccione una oficina para este proyecto"
                name="oficina"
                {...form.getInputProps('oficina')}
                required
              />
              <Select
                data={Areas.map((area: any) => ({ label: area.nombre, value: area.id }))}
                label="Seleccione un area para este proyecto"
                name="area"
                {...form.getInputProps('area')}
                required
              />
              <DatePicker
                description="Si no se selecciona una fecha, se creara con la fecha actual"
                label="Fecha de inicio de proyecto"
                placeholder="Selecciona una fecha"
                {...form.getInputProps('fechaInicio')}
              />
              <Select
                description="Si no se selecciona un estado, se tomará por defecto el estado NUEVO"
                data={[
                  { label: 'Nuevo', value: 'NUEVO' },
                  { label: 'En Progreso', value: 'EN_PROGRESO' },
                  { label: 'Finalizado', value: 'FINALIZADO' },
                ]}
                label="Seleccione un estado para este proyecto"
                name="estado"
                {...form.getInputProps('estado')}
              />
              <Button my="md" fullWidth type="submit" color="primary">
                Crear Proyecto
              </Button>
            </form>
          </Modal>

          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title order={2}>Proyectos</Title>
              <Button leftIcon={<FiPlus />} onClick={() => setOpenedModal(true)}>
                <Text>Crear un nuevo proyecto</Text>
              </Button>
            </div>
            <Space h="lg" />
            <ScrollArea>
              <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                <thead>
                  <tr>
                    {/* <th style={{ width: 40 }}>
                    <Checkbox
                      onChange={toggleAll}
                      checked={selection.length === data.length}
                      indeterminate={selection.length > 0 && selection.length !== data.length}
                      transitionDuration={0}
                    />
                  </th> */}
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Usuario</th>
                    <th>Área</th>
                    <th>Oficina</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Card>
        </>
      )}
    </Layout>
  );
}

export default Proyectos;
