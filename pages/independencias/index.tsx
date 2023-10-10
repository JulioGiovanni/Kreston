import { Card, Tabs } from '@mantine/core';
import { FC } from 'react';
import Layout from '../../components/Layout/Layout';

const Independencias: FC = (props) => {
  return (
    <>
      <Card style={{ height: '90vh' }}>
        <Tabs color={'dark'} defaultValue="Proyectos" variant="pills">
          <Tabs.List grow justify="center">
            <Tabs.Tab value="Proyectos">Proyectos</Tabs.Tab>
            <Tabs.Tab value="Anual">Anual</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Card>
    </>
  );
};

export default Independencias;
