import { Button, Card, Modal, Select, Space, Text, TextInput, Title, Table } from '@mantine/core';
import { FC, useState, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import Layout from '../../../components/Layout/Layout';

import { useForm } from '@mantine/form';

import { ErrorsContext } from '../../../context/Errors/ErrorsContext';
import { createNewCliente } from '../../../services/cliente.service';
import { ICliente } from '../../../interfaces/cliente.interface';
import HeaderApp from '../../../components/UI/HeaderApp';
import { queryClientes } from '../../../ReactQuery/Clientes';
import Loading from '../../../components/UI/Loading';
import { QueryClient, useMutation } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Clientes: FC = (props) => {
  const { setNewError } = useContext(ErrorsContext);
  const [openedModal, setOpenedModal] = useState(false);
  const { Clientes, isLoading, isError } = queryClientes();
  let rows: any = [];
  const form = useForm({
    initialValues: {
      nombre: '',
      correo: '',
      telefono: 0,
      domicilio: '',
      tipoPersona: '',
    },
  });

  const mutateClientes = useMutation({
    mutationFn: (newCliente: ICliente) => createNewCliente(newCliente),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clientes'],
        exact: true,
      });
    },
  });

  const onSubmitForm = async (values: any) => {
    try {
      mutateClientes.mutate(values);
      form.reset();

      setOpenedModal(false);
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };

  if (Clientes && Clientes.length > 0) {
    rows = Clientes.map((row: ICliente, index: any) => {
      return (
        <tr key={row.id}>
          <td>{row.nombre}</td>
          <td>{row.correo}</td>
          <td>{row.telefono}</td>
          <td>{row.domicilio}</td>
          <td>{row.tipoPersona}</td>
        </tr>
      );
    });
  }

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title={'Agregar Cliente'}
          >
            <form onSubmit={form.onSubmit(onSubmitForm)}>
              <TextInput
                label="Nombre"
                name="name"
                type="text"
                placeholder="Nombre"
                required
                {...form.getInputProps('nombre')}
              />
              <TextInput
                label="Correo"
                name="correo"
                type="text"
                placeholder="Correo"
                required
                {...form.getInputProps('correo')}
              />
              <TextInput
                label="telefono"
                name="telefono"
                type="number"
                placeholder="Teléfono"
                {...form.getInputProps('telefono')}
              />
              <TextInput
                label="Domicilio"
                name="domicilio"
                type="text"
                placeholder="Domicilio"
                required
                {...form.getInputProps('domicilio')}
              />
              <Select
                label="Tipo de persona"
                name="tipoPersona"
                placeholder="Tipo de persona"
                required
                data={[
                  { value: 'FISICA', label: 'Física' },
                  { value: 'MORAL', label: 'Moral' },
                ]}
                {...form.getInputProps('tipoPersona')}
              />
              <Button type="submit" fullWidth mt={'lg'}>
                <Text> Crear nuevo cliente </Text>
              </Button>
            </form>
          </Modal>

          <Card>
            <HeaderApp
              title="Clientes"
              openModalFunction={() => setOpenedModal(true)}
              buttonTitle="Agregar Cliente"
              Icon={FiPlus}
            />

            <Space h={30} />

            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Domicilio</th>
                  <th>Tipo de persona</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Card>
        </>
      )}
    </Layout>
  );
};

export default Clientes;
