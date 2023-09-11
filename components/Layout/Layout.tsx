import { FC, useState } from 'react';

import {
  AppShell,
  Burger,
  Container,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Space,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';

// import { SwitchTheme } from "../../toogle/SwitchTheme"
import Links from './Links';
import Brand from './Brand';
import MenuNavbar from './MenuUser';

interface LayoutProps {
  children: React.ReactNode;
  HeaderChildrenComponent?: React.ReactNode;
  title?: string;
}

const Layout: FC<LayoutProps> = ({ children, HeaderChildrenComponent, title }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      style={{
        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
        // paddingTop:'30px'
      }}
      navbar={
        <Navbar
          // padding={{sm:"md","lg":"md"}}
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 200 }}
        >
          <Navbar.Section ml={-10} mr={-10} sx={{ paddingLeft: 20, paddingRight: 20 }}>
            <Space h={20} />
          </Navbar.Section>

          <Navbar.Section
            grow
            component={ScrollArea}
            ml={-10}
            mr={-10}
            sx={{ paddingLeft: 20, paddingRight: 20 }}
          >
            <Links />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={90}>
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[1]}
                mr="xl"
              />
            </MediaQuery>
            <Brand />
            <MenuNavbar />
            {/* <SwitchTheme/> */}
          </div>
          {HeaderChildrenComponent}
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
