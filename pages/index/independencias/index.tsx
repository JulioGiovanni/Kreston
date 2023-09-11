import { Card, Tabs } from '@mantine/core';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import Layout from '../../../components/Layout/Layout';
import prisma from '../../../db';

const Independencias: FC = () => {
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
