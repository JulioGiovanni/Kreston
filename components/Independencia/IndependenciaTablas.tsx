import { Button, Table, Tooltip } from '@mantine/core';
import React from 'react';
import { IconMailForward } from '@tabler/icons-react';
import { useGenericQuery } from '../../ReactQuery';
import { getAllAceptacionAnual } from '../../services/aceptacionanual.service';
import LoadingTable from '../common/loaders/LoadingTable';
import Error from '../UI/Error';

const IndependenciaTablas = () => {
  const { data, isLoading, isError } = useGenericQuery({
    key: 'AceptacionTablas',
    queryFn: getAllAceptacionAnual,
  });
  let Usuarios = [];
  if (data) {
    Usuarios = data.data;
  }
  return (
    <>
      {isError && <Error />}
      {isLoading && <LoadingTable />}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Usuario</Table.Th>
            <Table.Th>Año</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th>Acciones</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Usuarios?.map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.usuario.nombre}</Table.Td>
              <Table.Td>{item.year}</Table.Td>
              <Table.Td>{item.estadoAceptacion}</Table.Td>
              <Table.Td>
                {item.estadoAceptacion === 'EN_ESPERA' && (
                  <Tooltip label="Enviar correo">
                    <Button color="green">
                      <IconMailForward />
                    </Button>
                  </Tooltip>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default IndependenciaTablas;
