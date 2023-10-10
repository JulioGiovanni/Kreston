//React
import { FC, useState } from 'react';

//Mantine
import { Card, Modal, Space, Table, Pagination, Select } from '@mantine/core';

//React Icons
import { FiPlus } from 'react-icons/fi';

//Interfaces
import { ICliente } from '../../interfaces/cliente.interface';

//Components
import HeaderApp from '../../components/UI/HeaderApp';

//React Query
import { queryClientesPaginated, queryUsers, performSearch } from '../../ReactQuery';

//Utils
import { clienteSchema } from '../../schemas/clienteSchema';
import { ButtonTypes } from '../../interfaces/form.interface';
import { FormGenerator } from '../../components/common/FormGenerator';
import LoadingTable from '../../components/common/loaders/LoadingTable';
import EmptyComponent from '../../components/common/Empty';
import { generateClienteForm } from '../../utils/forms/Cliente.form';

import { createNewCliente } from '../../services/cliente.service';

const Clientes: FC = (props) => {
  const [Nombre, setNombre] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [openedModal, setOpenedModal] = useState(false);
  const { Clientes, isLoading, isError, total } = queryClientesPaginated(Nombre, page, perPage);
  const {
    Usuarios: Socios,
    isLoading: SociosLoading,
    isError: SociosError,
  } = queryUsers(undefined, 3);
  const {
    Usuarios: Gerentes,
    isLoading: GerentesLoading,
    isError: GerentesError,
  } = queryUsers(undefined, 2);

  const stillLoading = isLoading || SociosLoading || GerentesLoading;
  const anyError = isError || SociosError || GerentesError;
  let rows: any = [];

  if (Clientes && Clientes.length > 0) {
    rows = Clientes.map((row: ICliente, index: any) => {
      return (
        <Table.Tr key={row.id}>
          <Table.Td>{row.nombre}</Table.Td>
          <Table.Td>{row.correo}</Table.Td>
          <Table.Td>{row.telefono}</Table.Td>
          <Table.Td>{row.domicilio}</Table.Td>
          <Table.Td>{row.tipoPersona}</Table.Td>
        </Table.Tr>
      );
    });
  }

  return (
    <>
      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar Cliente'}>
        <FormGenerator
          fields={generateClienteForm(Socios, Gerentes)}
          formSchema={clienteSchema}
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
          loading={stillLoading}
          setOpenedModal={setOpenedModal}
          mutationFn={createNewCliente}
          mutationInterface={{}}
          mutationKey={'clientes'}
        />
      </Modal>

      <Card style={{ height: '90vh' }}>
        <HeaderApp
          loading={stillLoading}
          title="Clientes"
          input
          searchPlaceholder="Buscar cliente"
          searchLabel="Buscar cliente"
          searchFunction={performSearch}
          setSearchValue={setNombre}
          openModalFunction={() => setOpenedModal(true)}
          buttonTitle="Agregar Cliente"
          searchValue={Nombre}
          Icon={FiPlus}
        />

        <Space h={30} />
        {stillLoading ? (
          <LoadingTable />
        ) : Clientes.length === 0 && !stillLoading ? (
          <EmptyComponent />
        ) : (
          // <DataTable
          //   withBorder
          //   withColumnBorders
          //   highlightOnHover
          //   fontSize={14}
          //   striped
          //   records={Clientes}
          //   columns={Clientes.keys.map((key: any) => {
          //     return {
          //       accessor: key,
          //     };
          //   })}
          // />
          <div>
            <Table highlightOnHover fs={'lg'}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nombre</Table.Th>
                  <Table.Th>Correo</Table.Th>
                  <Table.Th>Teléfono</Table.Th>
                  <Table.Th>Domicilio</Table.Th>
                  <Table.Th>Tipo de persona</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pagination value={page} onChange={setPage} total={Math.ceil(total / perPage)} />
              <Select
                onChange={(value) => {
                  if (value! > total && page > 1) {
                    setPage(page - 1);
                    setPerPage(parseInt(value!));
                  }
                  return setPerPage(parseInt(value!));
                }}
                value={perPage.toString()}
                data={[
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '50', label: '50' },
                  { value: '100', label: '100' },
                ]}
              />
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default Clientes;
