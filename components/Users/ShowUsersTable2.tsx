import React, { useContext } from 'react';
import {
  Table,
  Checkbox,
  Title,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DataContext } from '../../context/Data';


export function ShowUsersTable2() {
    
    const { Usuarios } = useContext(DataContext)

    const [values, handlers] = useListState(Usuarios);

  const initialValues = {
    name:'',
    email:'',
  }

  const form = useForm({
      initialValues,
      // validationRules: {
      //   name: (value) => value.trim().length > 2,
      //   email: (value) => value.trim().length > 2,
      // },
    });


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
    
      const rows = Usuarios.map((row:any,index) => {
        return(
          <tr key={row.id}>
          <td>{row.nombre}</td>
          <td>{row.correo}</td>
          <td>{row.rol.nombre}</td>
          <td>{row.oficina.nombre}</td>
          <td>{row.area.nombre}</td>
          {/* <td>
          <Checkbox checked={row.activo} onChange={ (event:React.ChangeEvent<HTMLInputElement> ) => {
            //  handlers.setItemProp(index, 'activo', event.currentTarget.checked)
            handlers.setItemProp(index, 'activo', event.currentTarget.checked)
            row.activo ? API.UserApi.deleteUser(row.id) : API.UserApi.reactiveUser(row.id)
          }} 
          />
        </td> */}
        </tr>
        )
      });
    
      return (
        
          Usuarios && (
            <Table highlightOnHover>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          )
        
      );
}