import { Button, Card, Modal, Space, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { FiEdit, FiPlus, FiEye } from 'react-icons/fi';
import NewUserForm from '../../../components/Users/NewUserForm';
import Layout from '../../../components/Layout/Layout';
import { ShowUsersTable2 } from '../../../components/Users/ShowUsersTable2';

const UsuariosIndex = () => {
  const [openedModal, setOpenedModal] = useState(false);

  return (
    <>
      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar usuario'}>
        <NewUserForm setOpenedModal={setOpenedModal} />
      </Modal>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title order={2}>Usuarios</Title>
          <Button leftIcon={<FiPlus />} onClick={() => setOpenedModal(true)}>
            <Text>Agregar usuario</Text>
          </Button>
        </div>
        <Space h={30} />
        <ShowUsersTable2 />
      </Card>
    </>
  );
};

export default UsuariosIndex;
