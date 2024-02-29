import { FC, useState } from 'react';
import { Card, Modal, Space, Table } from '@mantine/core';

import { ICuestionario } from '../../interfaces/cuestionario.interface';
import { useRouter } from 'next/router';
import { FormGenerator } from '../../components/common/FormGenerator';
import { generateCuestionarioForm } from '../../utils/forms/Cuestionario.form';
import { cuestionarioSchema } from '../../schemas/cuestionarioSchema';
import { ButtonTypes } from '../../interfaces/form.interface';
import HeaderApp from '../../components/UI/HeaderApp';
import LoadingTable from '../../components/common/loaders/LoadingTable';
import { createNewCuestionario } from '../../services/cuestionario.service';
import { queryCuestionarios } from '../../ReactQuery';
import { IconUserPlus } from '@tabler/icons-react';

const Cuestionario: FC = (props) => {
  const { Cuestionarios, isLoading: CuLoading, isError } = queryCuestionarios();

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
          <Table.Td>{item.TipoCuestionario}</Table.Td>
          <Table.Td>{item.Preguntas?.length}</Table.Td>
        </Table.Tr>
      );
    });
  }

  return (
    <>
      {CuLoading ? (
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
          <Card padding={'lg'} radius={'md'} withBorder>
            <HeaderApp
              title="Cuestionarios"
              openModalFunction={() => setOpenedModal(true)}
              buttonTitle="Agregar cuestionario"
              Icon={IconUserPlus}
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
