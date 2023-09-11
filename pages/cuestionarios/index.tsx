import { FC, useState } from 'react';
import { Button, Card, Modal, Select, Space, Table, Text, Title, MultiSelect } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
import Layout from '../../components/Layout/Layout';
import { useForm } from '@mantine/form';
import { useCuestionario } from '../../ReactQuery/Cuestionario';
import { useAllProyectos } from '../../ReactQuery/Proyectos';
import { ICuestionario } from '../../interfaces/cuestionario.interface';
import { IUsuario } from '../../interfaces/usuario.interface';
import { createNewCuestionario } from '../../services/cuestionario.service';
import Loading from '../../components/UI/Loading';
import { useRouter } from 'next/router';
import { queryUsers } from '../../ReactQuery/Usuarios';

const Cuestionario: FC = (props) => {
  const { Cuestionario, isLoading: CuLoading, error } = useCuestionario();
  const { Proyectos, isLoading: PrLoading } = useAllProyectos();
  const { Usuarios, isLoading: UsLoading } = queryUsers();
  const [openedModal, setOpenedModal] = useState(false);
  const router = useRouter();
  let rows: any = [];
  const ths = (
    <tr>
      <th>Proyecto Asignado</th>
      <th># Preguntas</th>
    </tr>
  );
  if (Cuestionario && Cuestionario.length > 0 && !CuLoading) {
    rows = Cuestionario?.map((item: ICuestionario) => {
      return (
        <tr
          onClick={() => router.push(`/index/cuestionarios/${item.id}`)}
          key={item.id}
          style={{ cursor: 'pointer' }}
        >
          <td>{item.proyecto.nombre}</td>
          {/* <td>{item.}</td>
        <td>{item.pr}</td> */}
        </tr>
      );
    });
  }

  const form = useForm({
    initialValues: {
      proyecto: '',
      usuarios: '',
    },
  });

  const onSubmitForm = async (values: any) => {
    console.log(values);
    await createNewCuestionario(values);
  };

  return (
    <Layout>
      {CuLoading || PrLoading ? (
        <Loading />
      ) : (
        <>
          <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title={'Agregar nuevo cuestionario'}
          >
            <form onSubmit={form.onSubmit(onSubmitForm)}>
              {/* <TextInput label="Nombre" name="nombre" {...form.getInputProps('nombre')} /> */}
              <Select
                label="Proyecto"
                name="proyecto"
                data={Proyectos?.map((p: any) => {
                  return { value: p.id, label: p.nombre };
                })}
                searchable
                {...form.getInputProps('proyecto')}
              />
              {/*NOTE - If the app get too many users, we will need Elastic Search or something like
              that*/}
              <MultiSelect
                data={Usuarios?.map((u: IUsuario) => ({ value: u.id, label: u.nombre }))}
                label="Selecciona usuarios asignados a este cuestionario"
                placeholder="Seleccione usuarios"
                searchable
                nothingFound="No se encontraron usuarios"
                {...form.getInputProps('usuarios')}
              />
              <Button fullWidth type="submit" my="md">
                Crear nuevo cuestionario
              </Button>
            </form>
          </Modal>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title order={2}>Cuestionarios</Title>
              <Button leftIcon={<FiPlus />} onClick={() => setOpenedModal(true)}>
                <Text>Crear nuevo cuestionario</Text>
              </Button>
            </div>
            <Space h={30} />
            <Table highlightOnHover>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          </Card>
        </>
      )}
    </Layout>
  );
};

export default Cuestionario;
