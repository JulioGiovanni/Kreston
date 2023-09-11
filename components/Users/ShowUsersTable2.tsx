import { Checkbox, Table, Title } from '@mantine/core';
import { IUsuario } from '../../interfaces';
import { queryUsers } from '../../ReactQuery/Usuarios';
import { useListState } from '@mantine/hooks';
import { deleteUser, reactiveUser } from '../../services/usuarios.service';
import Loading from '../UI/Loading';
import { Error } from '../UI/Error';
import { useEffect } from 'react';

export function ShowUsersTable2() {
  const { Usuarios, isLoading, isError } = queryUsers();

  let rows: any = [];
  const [values, handlers] = useListState<IUsuario>(Usuarios);

  const ths = (
    <tr>
      <td>
        <Title order={3}>Nombre</Title>
      </td>
      <td>
        <Title order={3}>Correo</Title>
      </td>
      <td>
        <Title order={3}>Rol</Title>
      </td>
      <td>
        <Title order={3}>Oficina</Title>
      </td>
      <td>
        <Title order={3}>Área</Title>
      </td>
      <td>
        <Title order={3}>Activo</Title>
      </td>
    </tr>
  );

  useEffect(() => {
    handlers.setState(Usuarios);
  }, [Usuarios]);

  // if (Usuarios && Usuarios.length > 0) {
  rows = values?.map((usuario: IUsuario, index: number) => {
    return (
      <tr key={usuario.id}>
        <td>{usuario.nombre}</td>
        <td>{usuario.correo}</td>
        <td>{usuario.rol?.nombre}</td>
        <td>{usuario.oficina?.nombre}</td>
        <td>{usuario.area?.nombre}</td>
        <td>
          <Checkbox
            checked={usuario.activo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handlers.setItemProp(index, 'activo', event.currentTarget.checked);
              usuario.activo ? deleteUser(usuario.id) : reactiveUser(usuario.id);
            }}
          />
        </td>
      </tr>
    );
  });
  // }

  return isError ? (
    <Error />
  ) : isLoading ? (
    <Loading />
  ) : (
    Usuarios && (
      <Table highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    )
  );
}
