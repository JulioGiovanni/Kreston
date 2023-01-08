import { Checkbox, Table, Title } from '@mantine/core';
import { IUsuario } from '../../interfaces';
import { useAllUsers } from '../../hooks/useUser';
import { useListState } from '@mantine/hooks';
import { deleteUser, reactiveUser } from '../../services/usuarios.service';
import Loading from '../UI/Loading';
import { Error } from '../UI/Error';
import { useEffect } from 'react';
import { preload } from 'swr';

const fetcher = (url: string) =>
  fetch(url).then(async (res: any) => {
    const data = await res.json();
    return data.data;
  });

// Preload the resource before rendering the User component below,
// this prevents potential waterfalls in your application.
// You can also start preloading when hovering the button or link, too.
preload('/api/users', fetcher);
export function ShowUsersTable2() {
  const { Usuarios, isLoading, error } = useAllUsers();

  let rows: any = [];

  const [values, handlers] = useListState<IUsuario>([]);

  // handlers.setState(Usuarios);

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
  }, [isLoading, Usuarios]);

  if (Usuarios && Usuarios.length > 0) {
    rows = values?.map((row: IUsuario, index: number) => {
      return (
        <tr key={row.id}>
          <td>{row.nombre}</td>
          <td>{row.correo}</td>
          <td>{row.rol?.nombre}</td>
          <td>{row.oficina?.nombre}</td>
          <td>{row.area?.nombre}</td>
          <td>
            <Checkbox
              checked={row.activo}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handlers.setItemProp(index, 'activo', event.currentTarget.checked);
                row.activo ? deleteUser(row.id) : reactiveUser(row.id);
              }}
            />
          </td>
        </tr>
      );
    });
  }

  return error ? (
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
