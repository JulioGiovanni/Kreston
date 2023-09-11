import { Card, Tabs } from '@mantine/core';
import { FC } from 'react';
import Layout from '../../components/Layout/Layout';

const Independencias: FC = (props) => {
  return (
    <Layout>
      <Card style={{ height: '88vh' }}>
        <Tabs color={'dark'} defaultValue="Proyectos" variant="pills">
          <Tabs.List grow position="center">
            <Tabs.Tab value="Proyectos">Proyectos</Tabs.Tab>
            <Tabs.Tab value="Anual">Anual</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default Independencias;
