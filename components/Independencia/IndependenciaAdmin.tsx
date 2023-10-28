import { Card, Tabs } from '@mantine/core';
import React from 'react';
import AceptacionTablas from '../AYC/AceptacionTablas';
import IndependenciaUsuario from './IndependenciaUsuario';

const IndependenciaAdmin = () => {
  return (
    <>
      <Card padding={'lg'} radius={'md'} withBorder>
        <Tabs color={'dark'} defaultValue="Lista" variant="pills">
          <Tabs.List grow justify="center">
            <Tabs.Tab value="Lista">Lista</Tabs.Tab>
            <Tabs.Tab value="Contestar">Contestar</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Lista">
            <AceptacionTablas />
          </Tabs.Panel>
          <Tabs.Panel value="Contestar">
            <IndependenciaUsuario />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </>
  );
};

export default IndependenciaAdmin;
