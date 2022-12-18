'use client';
import { Button, Card, Modal, Select, Space, Text, TextInput, Title, Table } from '@mantine/core';
import { FC, useState, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import Layout from '../../../components/Layout/Layout';

import { useForm } from '@mantine/form';

import { ErrorsContext } from '../../../context/Errors/ErrorsContext';
import { createNewCliente } from '../../../services/cliente.service';

const Clientes: FC = (props) => {
  const { setNewError } = useContext(ErrorsContext);
  const [openedModal, setOpenedModal] = useState(false);
  const form = useForm({
    initialValues: {
      nombre: '',
      correo: '',
      telefono: 0,
      domicilio: '',
      tipoPersona: '',
    },
  });

  const onSubmitForm = async (values: any) => {
    try {
      const newCliente = await createNewCliente(values);
      const Cliente = newCliente.data.data;
      form.reset();

      // setNewData(Area,'Areas')
      setOpenedModal(false);
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };

  return (
    <Layout>
      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar Cliente'}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title order={2}>Usuarios</Title>
          <Button leftIcon={<FiPlus />} onClick={() => setOpenedModal(true)}>
            <Text>Agregar Cliente</Text>
          </Button>
        </div>

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
          <tbody>
            <tr>
              <td>Juan</td>
              <td>
                <a
                  href="mailto:
                "
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Layout>
  );
};

export default Clientes;
