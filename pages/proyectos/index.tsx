import React, { FC, useContext, useState } from 'react';
import { Table, Group, Text, Card, Modal, Space } from '@mantine/core';
import { ErrorsContext } from '../../context/Errors';
import {
  queryAreas,
  queryProyectos,
  queryOficinas,
  queryClientes,
  queryUsers,
  performSearch,
  mutateProyectos,
} from '../../ReactQuery/';

import { IProyecto } from '../../interfaces';
import LoadingTable from '../../components/common/loaders/LoadingTable';
import EmptyComponent from '../../components/common/Empty';
import { ButtonTypes } from '../../interfaces/form.interface';
import HeaderApp from '../../components/UI/HeaderApp';
import { FormGenerator } from '../../components/common/FormGenerator';
import { generateProyectosForm } from '../../utils/forms/Proyecto.form';
import { proyectoSchema } from '../../schemas/proyectoSchema';
import Error from '../../components/UI/Error';
import { createNewProyecto } from '../../services/proyecto.service';
import { IconUserPlus } from '@tabler/icons-react';

const Proyectos: FC = (props) => {
  const [Nombre, setNombre] = useState('');
  const [openedModal, setOpenedModal] = useState(false);
  const { setNewError, removeError } = useContext(ErrorsContext);
  const { Usuarios, isLoading: UsLoading, isError: UsError } = queryUsers();
  const { Areas, isLoading: ArLoading, isError: ArError } = queryAreas();
  const { Proyectos, isLoading: PrLoading, isError: PrError } = queryProyectos();
  const { Oficinas, isLoading: OfLoading, isError: OfError } = queryOficinas();
  const { Clientes, isLoading: ClLoading, isError: ClError } = queryClientes();
  const stillLoading = UsLoading || ArLoading || ClLoading || OfLoading || PrLoading;
  const anyError = UsError || ArError || ClError || OfError || PrError;
  let rows = [];

  if (!PrLoading) {
    rows = Proyectos.map((proyecto: IProyecto) => {
      return (
        <Table.Tr key={proyecto.id}>
          <Table.Td>{proyecto.nombre}</Table.Td>
          <Table.Td>{proyecto.cliente?.nombre}</Table.Td>
          <Table.Td>
            <Group>
              <Text size="sm" fw={500}>
                {proyecto.usuario?.nombre}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{proyecto.area?.nombre}</Table.Td>
          <Table.Td>{proyecto.oficina?.nombre}</Table.Td>
        </Table.Tr>
      );
    });
  }
  return (
    <>
      {anyError && <Error />}
      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar Proyecto'}>
        <FormGenerator
          fields={generateProyectosForm(Clientes, Usuarios, Oficinas, Areas)}
          formSchema={proyectoSchema}
          buttons={[
            {
              label: 'Cancelar',
              type: ButtonTypes.RESET,
              disabled: false,
            },
            {
              label: 'Guardar',
              type: ButtonTypes.SUBMIT,
              disabled: false,
            },
          ]}
          mutationFn={createNewProyecto}
          mutationKey={'createProyecto'}
          mutationInterface={{}}
          setOpenedModal={setOpenedModal}
          loading={stillLoading}
        />
      </Modal>

      <Card padding={'lg'} radius={'md'} withBorder>
        <HeaderApp
          title="Proyectos"
          input
          searchPlaceholder="Buscar Proyecto"
          searchLabel="Buscar Proyecto"
          searchFunction={performSearch}
          setSearchValue={setNombre}
          openModalFunction={() => setOpenedModal(true)}
          buttonTitle="Agregar Proyecto"
          searchValue={Nombre}
          Icon={IconUserPlus}
          loading={stillLoading}
        />
        <Space h={30} />
        {UsLoading || ArLoading || ClLoading || OfLoading || PrLoading ? (
          <LoadingTable />
        ) : Proyectos.length === 0 && !PrLoading ? (
          <EmptyComponent />
        ) : (
          <Table highlightOnHover verticalSpacing="sm" fs={'lg'}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Cliente</Table.Th>
                <Table.Th>Usuario</Table.Th>
                <Table.Th>Área</Table.Th>
                <Table.Th>Oficina</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Card>
    </>
  );
};

export default Proyectos;
