import { FC } from 'react';

import { AppShell } from '@mantine/core';

import Links from './Links';
import Brand from './Brand';
import MenuNavbar from './MenuUser';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell
      navbar={{
        width: 200,
        breakpoint: 'sm',
      }}
      header={{
        height: 90,
      }}
      padding={{ sm: 'md', lg: 'md' }}
    >
      <AppShell.Navbar>
        <Links />
      </AppShell.Navbar>

      <AppShell.Header>
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
          <Brand />
          <MenuNavbar />
        </div>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
