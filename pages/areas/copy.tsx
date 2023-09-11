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
  Select,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { useState, useContext, FC } from 'react';
import Layout from '../../components/Layout/Layout';
import { useForm } from '@mantine/form';
import { ErrorsContext } from '../../context/Errors';
import { queryAreas } from '../../ReactQuery/Areas';
import { useAllOffice } from '../../ReactQuery/Oficinas';
import Loading from '../../components/UI/Loading';

const Areas: FC = (props) => {
  const [openedModal, setOpenedModal] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const { setNewError, removeError } = useContext(ErrorsContext);
  const { Areas, isLoading: ArLoading, isError: ArError } = queryAreas();
  const { Oficinas, isLoading: OfLoading, error: OfError } = useAllOffice();

  const form = useForm({
    initialValues: {
      nombre: '',
      oficina: '',
    },
  });

  const onSubmitForm = async (values: any) => {
    try {
      // const newArea = await createNewArea(values);
      // const Area = newArea.data.data;

      form.reset();
      removeError();

      setOpenedModal(false);
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };
  return (
    <Layout>
      {ArLoading || OfLoading ? (
        <Loading />
      ) : (
        <>
          <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar área'}>
            <form onSubmit={form.onSubmit(onSubmitForm)}>
              <TextInput
                label="Nombre"
                name="name"
                type="text"
                placeholder="Nombre"
                required
                {...form.getInputProps('nombre')}
              />
              <Select
                label="Oficina"
                name="oficina"
                data={Oficinas.map((oficina: any) => ({
                  value: oficina.id,
                  label: oficina.nombre,
                }))}
                {...form.getInputProps('oficina')}
              />

              <Button fullWidth my={'md'} type="submit">
                Crear Nueva Área
              </Button>
            </form>
          </Modal>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title order={2}>Áreas</Title>
            <Button leftIcon={<FiPlus />} onClick={() => setOpenedModal(true)}>
              <Text>Agregar área</Text>
            </Button>
          </div>
          <Space h={30} />

          <Grid>
            {Areas.map((area: any) => {
              //Get the first letter of every word in the name
              const initials = area.nombre
                .split(' ')
                .map((word: any) => word[0])
                .join('');
              return (
                <Grid.Col sm={12} md={6} lg={4} key={area.id}>
                  <Card style={{ height: 150, padding: 40 }}>
                    <Card.Section>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Title order={3}>{area.nombre}</Title>
                          <Text size="xs" color={'dimmed'}>
                            {area.oficina.nombre}
                          </Text>
                        </div>

                        <Avatar radius="xl" size={'lg'}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <Text color={colorScheme == 'dark' ? 'white' : 'dark'} weight={'bold'}>
                              {initials}
                            </Text>
                          </div>
                        </Avatar>
                      </div>
                    </Card.Section>

                    <Card.Section mt={20}>
                      <Link href={`/index/areas/${area.id}`} passHref>
                        <Button fullWidth>Ver Más</Button>
                      </Link>
                    </Card.Section>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default Areas;
