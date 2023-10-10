import { Checkbox, Table, Title } from '@mantine/core';
import { IUsuario } from '../../interfaces';
import { queryUsers } from '../../ReactQuery/Usuarios';
import { useListState } from '@mantine/hooks';
import { deleteUser, reactiveUser } from '../../services/usuarios.service';

import { useEffect } from 'react';
import Error from '../UI/Error';
import LoadingTable from '../common/loaders/LoadingTable';

export function ShowUsersTable2() {
  const { Usuarios, isLoading, isError } = queryUsers();

  let rows: any = [];
  const [values, handlers] = useListState<IUsuario>(Usuarios);

  const ths = (
    <Table.Tr>
      <Table.Td>
        <Title order={3}>Nombre</Title>
      </Table.Td>
      <Table.Td>
        <Title order={3}>Correo</Title>
      </Table.Td>
      <Table.Td>
        <Title order={3}>Rol</Title>
      </Table.Td>
      <Table.Td>
        <Title order={3}>Oficina</Title>
      </Table.Td>
      <Table.Td>
        <Title order={3}>Área</Title>
      </Table.Td>
      <Table.Td>
        <Title order={3}>Activo</Title>
      </Table.Td>
    </Table.Tr>
  );

  useEffect(() => {
    handlers.setState(Usuarios);
  }, [Usuarios]);

  // if (Usuarios && Usuarios.length > 0) {
  rows = values?.map((usuario: IUsuario, index: number) => {
    return (
      <Table.Tr key={usuario.id}>
        <Table.Td>{usuario.nombre}</Table.Td>
        <Table.Td>{usuario.correo}</Table.Td>
        <Table.Td>{usuario.rol?.nombre}</Table.Td>
        <Table.Td>{usuario.oficina?.nombre}</Table.Td>
        <Table.Td>{usuario.area?.nombre}</Table.Td>
        <Table.Td>
          <Checkbox
            checked={usuario.activo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handlers.setItemProp(index, 'activo', event.currentTarget.checked);
              usuario.activo ? deleteUser(usuario.id) : reactiveUser(usuario.id);
            }}
          />
        </Table.Td>
      </Table.Tr>
    );
  });
  // }

  return isError ? (
    <Error />
  ) : isLoading ? (
    <LoadingTable />
  ) : (
    Usuarios && (
      <Table highlightOnHover>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    )
  );
}
