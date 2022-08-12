import React, { useContext, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, Card, Title, Button, Modal, TextInput, Select, Space } from '@mantine/core';
import Layout from '../../../components/Layout/Layout';
import { FiPlus } from 'react-icons/fi';
import { prisma } from '../../../db';
import { ErrorsContext } from '../../../context/Errors';
import { useForm } from '@mantine/form';
import { API } from '../../../API';
import { getInitials } from '../../../utils/GetInitials';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));



export const getServerSideProps = async () => {
    
    const users = await prisma.usuario.findMany({});
    const areas = await prisma.area.findMany({});
    const oficinas = await prisma.oficina.findMany({});
    const proyectos = await prisma.proyecto.findMany({

      include: {
        area: { select: { nombre: true } },
        oficina: { select: { nombre: true } },
        usuario: { select: { nombre: true } }
      }

    });

    
    return { props:  {
        users:JSON.parse(JSON.stringify(users)),
        areas:JSON.parse(JSON.stringify(areas)),
        oficinas:JSON.parse(JSON.stringify(oficinas)),
        proyectos:JSON.parse(JSON.stringify(proyectos))
    }}
    
  }



export function Proyectos({users,areas,oficinas,proyectos}:any) {
  const [openedModal, setOpenedModal] = useState(false);
  const {setNewError,removeError} = useContext(ErrorsContext)
    const form = useForm({
        initialValues:{
            usuario:'',
            oficina:'',
            area:'',
            nombre:'',
            descripcion:'',
            estado:'',
        },
    })
    const onSubmitForm = async (values:any)=>{
        try {
            await API.ProyectosApi.createNewProyecto(values)
            form.reset();
            setOpenedModal(false)
            removeError();
        } catch (error:any) {
            setNewError(error.response.data.message,error.response.data.type)
            form.setFieldError(error.response.data.type,error.response.data.message)
        }

    }

    
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['1']);
  // const toggleRow = (id: string) =>
  //   setSelection((current) =>
  //     current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  //   );
  // const toggleAll = () => setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = proyectos.map((item:any) => {
    const selected = selection.includes(item.id);
    const initials = getInitials(item.usuario.nombre)
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        {/* <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td> */}
        <td>
          {item.nombre}
        </td>
        <td>
          {item.descripcion}
        </td>
        <td>
           <Group spacing="sm">
            {/* <Avatar size={26} src={item.avatar} radius={26} /> */}
            <Avatar size={26} radius={26} >
              {initials}
            </Avatar>
            <Text size="sm" weight={500}>
              {item.usuario.nombre}
            </Text>
          </Group> 
          
        </td>
        <td>{item.area.nombre}</td>
        <td>{item.oficina.nombre}</td>
      </tr>
    );
  });

  return (
    <Layout>
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={"Agregar usuario"}
      >
        {/* Usuario,nombre,descripción y estado */}
       <form onSubmit={form.onSubmit(onSubmitForm)}>
         <TextInput
            label="Nombre del proyecto"
            name="nombre"
            {...form.getInputProps('nombre')}
         />
          <TextInput
            label="Descripción"
            name="descripcion"
            {...form.getInputProps('descripcion')}
          />
         <Select
            data={users.map((user:any)=>({label:user.nombre,value:user.id}))}
            label="Seleccione un usuario para este proyecto"
            name="usuario"
            {...form.getInputProps('usuario')}
         />
          <Select
            data={oficinas.map((oficina:any)=>({label:oficina.nombre,value:oficina.id}))}
            label="Seleccione una oficina para este proyecto"
            name="oficina"
            {...form.getInputProps('oficina')}
          />
          <Select
            data={areas.map((area:any)=>({label:area.nombre,value:area.id}))}
            label="Seleccione un area para este proyecto"
            name="area"
            {...form.getInputProps('area')}
          />
          <Button my='md' fullWidth type="submit" color="primary">
            Crear Proyecto
          </Button>
       </form>
      </Modal>


        <Card>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Title order={2} >Proyectos</Title>
                <Button 
                  leftIcon={<FiPlus/>} 
                  onClick={() => setOpenedModal(true)}
                >  
                    <Text>Crear un nuevo proyecto</Text>
                </Button>
            </div>
          <Space h='lg' />
          <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
              <thead>
                <tr>
                  {/* <th style={{ width: 40 }}>
                    <Checkbox
                      onChange={toggleAll}
                      checked={selection.length === data.length}
                      indeterminate={selection.length > 0 && selection.length !== data.length}
                      transitionDuration={0}
                    />
                  </th> */}
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Usuario</th>
                  <th>Área</th>
                  <th>Oficina</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
          </ScrollArea>
        </Card>
    </Layout>
  );
}

export default Proyectos;