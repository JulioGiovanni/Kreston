import { Group, Menu, Text, Divider } from '@mantine/core';
import UserButton from './UserButton';
import { SegmentedToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { getInitials } from '../../utils/GetInitials';

const MenuNavbar = () => {
  const { Logout, User } = useContext(AuthContext);

  const initials = getInitials(User?.nombre || '');
  return (
    <Group>
      <Menu trigger="hover" openDelay={300}>
        <Menu.Target>
          <UserButton
            // image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            initials={initials}
            name={User?.nombre}
            email={User?.correo}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          {/* <Menu.Item><SegmentedToggle/></Menu.Item> */}
          <SegmentedToggle />

          <Menu.Item>Mi Perfil</Menu.Item>
          <Menu.Item color="red" onClick={Logout}>
            Cerrar Sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default MenuNavbar;
