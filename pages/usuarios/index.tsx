import { FC, useContext, useState } from 'react';
import { Card, Modal, Space } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
import { FormGenerator } from '../../components/common/FormGenerator';
import HeaderApp from '../../components/UI/HeaderApp';
import { ShowUsersTable2 } from '../../components/Users/ShowUsersTable2';
import { ErrorsContext } from '../../context/Errors';
import { ButtonTypes } from '../../interfaces/form.interface';
import { queryAreas } from '../../ReactQuery/Areas';
import { queryOficinas } from '../../ReactQuery/Oficinas';
import { queryRoles } from '../../ReactQuery/Rol';
import { mutateUsers, queryUsers } from '../../ReactQuery/Usuarios';
import { performSearch } from '../../ReactQuery/utils';
import { UsuarioSchema } from '../../schemas/usuario.Schema';
import { generateUsuarioForm } from '../../utils/forms/Usuario.form';

const UsuariosIndex: FC = (props) => {
  const [Nombre, setNombre] = useState('');
  const [openedModal, setOpenedModal] = useState(false);
  const { Usuarios, isLoading: UsLoading, isError: UsError } = queryUsers(Nombre);
  const { Areas, isLoading: ArLoading, isError: ArError } = queryAreas();
  const { Oficinas, isLoading: OfLoading, isError: OfError } = queryOficinas();
  const { Roles, isLoading: RolLoading, isError: RolError } = queryRoles();
  const { setNewError } = useContext(ErrorsContext);

  const stillLoading = UsLoading || ArLoading || OfLoading || RolLoading;
  const anyError = UsError || ArError || OfError || RolError;
  return (
    <>
      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar usuario'}>
        <FormGenerator
          loading={stillLoading}
          fields={generateUsuarioForm(Areas, Oficinas, Roles)}
          formSubmitAction={onSubmitForm}
          formSchema={UsuarioSchema}
          mutation={mutateUsers}
          setOpenedModal={setOpenedModal}
          setError={setNewError}
          buttons={[
            { type: ButtonTypes.BUTTON, label: 'Guardar' },
            { type: ButtonTypes.RESET, label: 'Cancelar' },
          ]}
        />
      </Modal>

      <Card style={{ height: '90vh' }}>
        <HeaderApp
          loading={stillLoading}
          title="Usuarios"
          input
          searchPlaceholder="Buscar usuario"
          searchFunction={performSearch}
          searchValue={Nombre}
          setSearchValue={setNombre}
          openModalFunction={() => setOpenedModal(true)}
          buttonTitle="Agregar usuario"
          Icon={FiPlus}
        />
        <Space h={30} />
        <ShowUsersTable2 />
      </Card>
    </>
  );
};

export default UsuariosIndex;
