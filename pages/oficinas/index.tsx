import { FiPlus } from 'react-icons/fi';
import {
  Avatar,
  Button,
  Card,
  Grid,
  Space,
  Text,
  Title,
  Modal,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { FC, useContext, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useForm } from '@mantine/form';

import { ErrorsContext } from '../../context/Errors';
import { createNewOficina } from '../../services/oficina.service';
import { queryOficinas } from '../../ReactQuery/Oficinas';
import Loading from '../../components/common/loaders/Loading';

const Oficinas: FC = (props) => {
  const { Oficinas, isLoading, isError } = queryOficinas();
  const [openedModal, setOpenedModal] = useState(false);
  const { setNewError, removeError } = useContext(ErrorsContext);

  const { colorScheme } = useMantineColorScheme();
  const form = useForm({
    initialValues: {
      nombre: '',
      direccion: '',
    },
  });
  const onSubmitForm = async (values: any) => {
    try {
      const newOficina = await createNewOficina(values);
      const Oficina = newOficina.data.data;
      form.reset();
      removeError();
      setOpenedModal(false);
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };
  return (
    <>
      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar oficina'}>
        <form onSubmit={form.onSubmit(onSubmitForm)}>
          <TextInput
            label="Nombre de la oficina"
            name="name"
            type="text"
            placeholder="Nombre"
            required
            {...form.getInputProps('nombre')}
          />
          <TextInput
            label="Dirección"
            name="direccionm"
            type="text"
            placeholder="Dirección"
            required
            {...form.getInputProps('direccion')}
          />
          <Button fullWidth my="md" type="submit">
            Crear Nueva Oficina
          </Button>
        </form>
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title order={2}>Oficinas</Title>
        <Button leftSection={<FiPlus />} onClick={() => setOpenedModal(true)}>
          <Text>Agregar oficina</Text>
        </Button>
      </div>
      <Space h={30} />
      {isLoading ? (
        <Loading />
      ) : (
        <Grid>
          {Oficinas.map((oficina: any) => {
            //Get the first letter of every word in the name
            const initials = oficina.nombre
              .split(' ')
              .map((word: any) => word[0])
              .join('');

            return (
              <Grid.Col span={{ sm: 12, md: 6, lg: 4 }} key={oficina.id}>
                <Card style={{ padding: 40 }}>
                  <Card.Section>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Title order={3}>{oficina.nombre}</Title>

                      <Avatar radius="xl" size={'lg'}>
                        <div
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                          <Text color={colorScheme == 'dark' ? 'white' : 'black'} fw={'bold'}>
                            {initials}
                          </Text>
                          <Text size="xs" color={'dimmed'}>
                            {oficina.oficina}
                          </Text>
                        </div>
                      </Avatar>
                    </div>
                  </Card.Section>

                  <Card.Section mt={20}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      href={`/oficinas/${oficina.id}`}
                      passHref
                    >
                      <Button fullWidth>Ver Más</Button>
                    </Link>
                  </Card.Section>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Oficinas;
