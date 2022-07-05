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
} from '@mantine/core';
import { Selector, ChevronDown, ChevronUp, Search, Edit } from 'tabler-icons-react';
import EditUser from './EditUser';
import { useForm, useListState } from '@mantine/hooks';
import { API } from '../../API';





export function ShowUsersTable2({ data,EditIcon,onCancel,EyeIcon,opened,setOpened }: any) {
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
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Oficina</th>
          <th>Área</th>
          <th>Activo</th>
        </tr>
      );
    
      const rows = values.map((row:any,index:number) => (
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
        <Table captionSide="bottom">
          <caption>Some elements from periodic table</caption>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
          <tfoot>{ths}</tfoot>
        </Table>
      );
}