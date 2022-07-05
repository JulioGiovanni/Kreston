import React, { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Checkbox,
  Title,
} from '@mantine/core';
import { Selector, ChevronDown, ChevronUp, Search, Edit } from 'tabler-icons-react';
import EditUser from './EditUser';
import { useForm, useListState } from '@mantine/hooks';
import { API } from '../../API';





export function ShowUsersTable2({ data,EditIcon,onCancel,EyeIcon,opened,setOpened }) {
    const [values, handlers] = useListState(data);



  const initialValues = {
    name:'',
    email:'',
  }

  const form = useForm({
      initialValues,
      validationRules: {
        name: (value) => value.trim().length > 2,
        email: (value) => value.trim().length > 2,
      },
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
    
      const rows = values.map((row,index) => (
        <tr key={row.id}>
          <td>{row.nombre}</td>
          <td>{row.correo}</td>
          <td>{row.rol}</td>
          <td>{row.oficina}</td>
          <td>{row.area}</td>
          <td>
          <Checkbox checked={row.activo} onChange={ (event) => {
               handlers.setItemProp(index, 'activo', event.currentTarget.checked)
               row.activo ? API.UserApi.deleteUser(row.id) : API.UserApi.reactiveUser(row.id)
               }} 
             />
          </td>
        </tr>
      ));
    
      return (
        <Table highlightOnHover>
          
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      );
}