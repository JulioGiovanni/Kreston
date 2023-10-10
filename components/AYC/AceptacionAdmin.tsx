import { Tabs, Card } from '@mantine/core';

import React from 'react';
import AceptacionTablas from './AceptacionTablas';
import AceptacionUsuario from './AceptacionUsuario';

const AceptacionAdmin = () => {
  return (
    <>
      <Card style={{ height: '90vh' }}>
        <Tabs defaultValue="Admin" variant={'pills'}>
          <Tabs.List grow>
            <Tabs.Tab value="Admin">Tablas</Tabs.Tab>
            <Tabs.Tab value="Normal">Llenar</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Admin">
            <AceptacionTablas />
          </Tabs.Panel>
          <Tabs.Panel value="Normal">
            <AceptacionUsuario />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </>
  );
};

export default AceptacionAdmin;
