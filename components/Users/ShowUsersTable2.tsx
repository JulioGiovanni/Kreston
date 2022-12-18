import React, { useContext } from 'react';
import useSWR from 'swr';
import { Table, Checkbox, Title } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { deleteUser, reactiveUser } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces';
import { useAllUsers } from '../../hooks/useUser';

export function ShowUsersTable2() {
  const { Usuarios, isLoading, error } = useAllUsers();
  console.log(Usuarios);
  let rows: any = [];

  // const [values, handlers] = useListState(Usuarios);

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
  if (Usuarios && Usuarios.length > 0) {
    rows = Usuarios.map((row: IUsuario, index: any) => {
      return (
        <tr key={row.id}>
          <td>{row.nombre}</td>
          <td>{row.correo}</td>
          <td>{row.rol?.nombre}</td>
          <td>{row.oficina?.nombre}</td>
          <td>{row.area?.nombre}</td>
          {/* <td>
            <Checkbox
              checked={row.activo}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //  handlers.setItemProp(index, 'activo', event.currentTarget.checked)
                handlers.setItemProp(index, 'activo', event.currentTarget.checked);
                row.activo ? deleteUser(row.id) : reactiveUser(row.id);
              }}
            />
          </td> */}
        </tr>
      );
    });
  }

  return error ? (
    <Title order={5}>Ha ocurrido un error, intente más tarde</Title>
  ) : isLoading ? (
    <Title order={3}>Cargando...</Title>
  ) : (
    Usuarios && (
      <Table highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    )
  );
}
