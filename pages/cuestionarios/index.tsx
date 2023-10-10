import { FC, useState } from 'react';
import { Card, Modal, Space, Table } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';

import { ICuestionario } from '../../interfaces/cuestionario.interface';
import Loading from '../../components/common/loaders/Loading';
import { useRouter } from 'next/router';
import { queryUsers } from '../../ReactQuery/Usuarios';
import { queryProyectos } from '../../ReactQuery/Proyectos';
import { mutateCuestionarios, queryCuestionarios } from '../../ReactQuery/Cuestionario';
import { FormGenerator } from '../../components/common/FormGenerator';
import { generateCuestionarioForm } from '../../utils/forms/Cuestionario.form';
import { cuestionarioSchema } from '../../schemas/cuestionarioSchema';
import { ButtonTypes } from '../../interfaces/form.interface';
import HeaderApp from '../../components/UI/HeaderApp';
import LoadingTable from '../../components/common/loaders/LoadingTable';
import { createNewCuestionario } from '../../services/cuestionario.service';

const Cuestionario: FC = (props) => {
  const { Cuestionarios, isLoading: CuLoading, isError } = queryCuestionarios();
  const { Proyectos, isLoading: PrLoading } = queryProyectos();
  const { Usuarios, isLoading: UsLoading } = queryUsers();
  const [openedModal, setOpenedModal] = useState(false);
  const router = useRouter();
  let rows: any = [];
  const ths = (
    <Table.Tr>
      <Table.Th>Tipo de cuestionario</Table.Th>
      <Table.Th># Preguntas</Table.Th>
    </Table.Tr>
  );
  if (Cuestionarios && Cuestionarios.length > 0 && !CuLoading) {
    rows = Cuestionarios?.map((item: ICuestionario) => {
      return (
        <Table.Tr
          onClick={() => router.push(`/cuestionarios/${item.id}`)}
          key={item.id}
          style={{ cursor: 'pointer' }}
        >
          <Table.Td>{item.proyecto.nombre}</Table.Td>
          {/* <td>{item.}</td>
        <td>{item.pr}</td> */}
        </Table.Tr>
      );
    });
  }

  return (
    <>
      {CuLoading || PrLoading ? (
        <LoadingTable />
      ) : (
        <>
          <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title={'Agregar nuevo cuestionario'}
          >
            <FormGenerator
              fields={generateCuestionarioForm()}
              formSchema={cuestionarioSchema}
              loading={CuLoading}
              buttons={[
                {
                  label: 'Crear cuestionario',
                  type: ButtonTypes.SUBMIT,
                },
              ]}
              setOpenedModal={setOpenedModal}
              mutationInterface={{}}
              mutationFn={createNewCuestionario}
              mutationKey="cuestionarios"
            />
          </Modal>
          <Card style={{ height: '90vh' }}>
            <HeaderApp
              title="Cuestionarios"
              openModalFunction={() => setOpenedModal(true)}
              buttonTitle="Agregar cuestionario"
              Icon={FiPlus}
              loading={CuLoading}
            />
            <Space h={30} />
            <Table highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Card>
        </>
      )}
    </>
  );
};

export default Cuestionario;
