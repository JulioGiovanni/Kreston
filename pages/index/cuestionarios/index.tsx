import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import { Button, Card, Modal, Select, Space, Table, Text, Title, TextInput } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
import Layout from '../../../components/Layout/Layout';
import { prisma } from '../../../db';
import proyectos from '../independencias/proyectos';
import { useForm } from '@mantine/form';

const data = [
  {
    id:1,
    nombre: 'Cuestionario 1',
    proyecto: 'Proyecto 1',
    preguntas: '10',
  },
  {
    id:2,
    nombre: 'Cuestionario 2',
    proyecto: 'Proyecto 2',
    preguntas: '20',
  },
  {
    id:3,
    nombre: 'Cuestionario 3',
    proyecto: 'Proyecto 3',
    preguntas: '30',
  },
  {
    id:4,
    nombre: 'Cuestionario 4',
    proyecto: 'Proyecto 4',
    preguntas: '40',
  },
]


const index = ({proyectos}:any) => {
  const [openedModal, setOpenedModal] = useState(false);
  const ths = (
      <tr>
        <th>Nombre</th>
        <th>Proyecto</th>
        <th># Preguntas</th>
      </tr>
    )
  
  const rows = data.map((item:any) => {
    return(
        <Link href={`/index/cuestionarios/${item.id}`}>  
          <tr key={item.nombre} style={{cursor:'pointer'}}>
            <td>{item.nombre}</td>
            <td>{item.proyecto}</td>
            <td>{item.preguntas}</td>
          </tr> 
        </Link>
    )
  });
  
  const form = useForm({
    initialValues:{
      nombre: '',
      proyecto: '',
    }
  }) 
  
  const onSubmitForm = () => {  }

  return (
    <Layout>
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={"Agregar nuevo cuestionario"}
      >
        <form onSubmit={form.onSubmit(onSubmitForm)}>
          <TextInput
            label='Nombre'
            name='nombre'
            {...form.getInputProps('nombre')}
          />
          <Select
            label='Proyecto'
            name='proyecto'
            data={proyectos.map((p:any)=>{return {value:p.id, label:p.nombre}})}
            searchable
            {...form.getInputProps('proyecto')}
          />
          <Button fullWidth type='submit' my='md'>
            Crear nuevo cuestionario
          </Button>
        </form>
      </Modal>
      <Card>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Title order={2} >Cuestionarios</Title>
          <Button 
            leftIcon={<FiPlus/>} 
            onClick={() => setOpenedModal(true)}
          >  
              <Text>Crear nuevo cuestionario</Text>
          </Button>
        </div>
        <Space h={30}/>
        <Table highlightOnHover>
          <thead>
           {ths}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      
      </Card>
    </Layout>
  )
}

export default index

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async () => {
  const proyectos = await prisma.proyecto.findMany({});
  const cuestionarios = await prisma.cuestionario.findMany({});

  return {
    props: {
      proyectos: JSON.parse(JSON.stringify(proyectos)),
      cuestionarios: JSON.parse(JSON.stringify(cuestionarios))
    }
  }
}