import { Group, Menu,Text,Divider} from "@mantine/core"
import  UserButton   from "./UserButton"
import { SegmentedToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { useContext } from 'react';
import { AuthContext } from "../../context/auth";
import { getInitials } from '../../utils/GetInitials';





const MenuNavbar = () => {
  const {Logout,User} = useContext(AuthContext)

  const initials = getInitials(User?.nombre || '')
  return (
    
  
      <Group position="center">
        <Menu
          trigger="hover"
          delay={300}
          control={
            <UserButton
              // image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              initials={initials}
              name={User?.nombre}
              email={User?.correo}
            />
          }
          >
            <Menu.Label>Application</Menu.Label>
            {/* <Menu.Item><SegmentedToggle/></Menu.Item> */}
            <SegmentedToggle/>
            <Menu.Item >Settings</Menu.Item>
            <Menu.Item >Messages</Menu.Item>
            <Menu.Item >Gallery</Menu.Item>
            <Menu.Item rightSection={<Text size="xs" color="dimmed">⌘K</Text>}>
            Search
            </Menu.Item>

            <Divider />

          <Menu.Label>Perfil</Menu.Label>
          <Menu.Item >Mi Perfil</Menu.Item>
          <Menu.Item color="red"  onClick={Logout}>Cerrar Sesión</Menu.Item>
        </Menu>
      </Group>
    
        
  )
}

export default MenuNavbar




