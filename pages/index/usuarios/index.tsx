import Link from 'next/link';
import { ActionIcon, Anchor, Button, Card, Group, Modal, Popover, Space, Table, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { FiEdit, FiPlus,FiEye} from "react-icons/fi";
import { prisma } from '../../../db';

import { useForm, useMediaQuery } from '@mantine/hooks';
import NewUserForm from '../../../components/Users/NewUserForm';
import Layout from '../../../components/Layout/Layout';
import { ShowUsersTable2 } from '../../../components/Users/ShowUsersTable2';
import { UserApi } from '../../../API/UserApi';



export const getServerSideProps = async () => {

  const users = await prisma.usuario.findMany({
    
    include: {
      rol: {
        select:{
          nombre:true
        }
      },
      oficina: {
        select:{
          nombre:true
        }
      },
      area: {
        select:{
          nombre:true
        }
      }
    }
   
  })
  const areas = await prisma.area.findMany({});
  const oficinas = await prisma.oficina.findMany({});
  const roles = await prisma.role.findMany({});
  
  const usersUnobjectified = users.map((user:any) => {
    return {
      ...user,
      area: user.area.nombre,
      oficina: user.oficina.nombre,
      rol: user.rol.nombre,
    }
  })

  return { props:  {
    users:JSON.parse(JSON.stringify(usersUnobjectified)),
    areas:JSON.parse(JSON.stringify(areas)),
    oficinas:JSON.parse(JSON.stringify(oficinas)),
    roles:JSON.parse(JSON.stringify(roles))
  }}
}

const UsuariosIndex = ({users,areas,oficinas,roles}:any) => {
    const [opened, setOpened] = useState(false);
    const [openedModal, setOpenedModal] = useState(false);
    
    const onCancel = () => setOpened(false);
      
  return (
      <Layout>

      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={"Agregar usuario"}
      >
        <NewUserForm
          setOpenedModal={setOpenedModal}
          areas={areas}
          oficinas={oficinas}
          roles={roles}
        />
      </Modal>


        <Card>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Title order={2} >Usuarios</Title>
                <Button 
                  leftIcon={<FiPlus/>} 
                  onClick={() => setOpenedModal(true)}
                >  
                    <Text>Agregar usuario</Text>
                </Button>
            </div>
            <Space h={30}/>
            {/* <Table highlightOnHover={true}>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
                <tfoot>{ths}</tfoot>
            </Table> */}
            <ShowUsersTable2
              opened={opened}
              setOpened={setOpened}
              onCancel={onCancel}
              EditIcon={FiEdit}
              EyeIcon={FiEye}
              data={users}
            />
        </Card>
      </Layout>
    
  )


}

export default UsuariosIndex