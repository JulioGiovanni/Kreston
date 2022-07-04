import React, { useContext, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, Card, Title, Button, Modal, TextInput, Select } from '@mantine/core';
import Layout from '../../components/Layout/Layout';
import { FiPlus } from 'react-icons/fi';
import { prisma } from '../../db';
import { ErrorsContext } from '../../context/Errors';
import { useForm } from '@mantine/hooks';
import { API } from '../../API';

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
    
    return { props:  {
        users:JSON.parse(JSON.stringify(users)),
        areas:JSON.parse(JSON.stringify(areas)),
        oficinas:JSON.parse(JSON.stringify(oficinas))
    }}
    
  }



export function Proyectos({users,areas,oficinas}:any) {

  console.log(users)
  console.log(areas)
  console.log(oficinas)

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
    const data = [
        {
          id: "1",
          avatar: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
          name: "Robert Wolfkisser",
          job: "Engineer",
          email: "rob_wolf@gmail.com"
        },
        {
          id: "2",
          avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
          name: "Jill Jailbreaker",
          job: "Engineer",
          email: "jj@breaker.com"
        },
        {
          id: "3",
          avatar: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
          name: "Henry Silkeater",
          job: "Designer",
          email: "henry@silkeater.io"
        },
        {
          id: "4",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
          name: "Bill Horsefighter",
          job: "Designer",
          email: "bhorsefighter@gmail.com"
        },
        {
          id: "5",
          avatar: "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
          name: "Jeremy Footviewer",
          job: "Manager",
          email: "jeremy@foot.dev"
        }
      ]
    



  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['1']);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () => setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.email}</td>
        <td>{item.job}</td>
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