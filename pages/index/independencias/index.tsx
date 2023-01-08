import { Card, Tabs } from '@mantine/core';
import { getSession } from 'next-auth/react';
import Layout from '../../../components/Layout/Layout';
import prisma from '../../../db';
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  const proyectos = await prisma.proyecto.findMany({
    where: {
      usuarioId: session.user.id,
    },
  });
  return {
    props: {
      proyectos: JSON.parse(JSON.stringify(proyectos)),
    },
  };
};

const index = ({ proyectos }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Card style={{ height: 400 }}>
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

export default index;
