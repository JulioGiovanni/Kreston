
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Button, Card, Text, Title } from '@mantine/core';
import Layout from '../../../components/Layout/Layout';
import { prisma } from '../../../db';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

   
   const cuestionario = await prisma.cuestionario.findMany({where: {id: Number(ctx.query.id)}});

  return {
    props: {
      cuestionario
    }
  }
}

const index = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Card>
      <div style={{display:'flex', justifyContent:'space-between'}}>
          <Title order={2} >Cuestionario: </Title>
          <Button 
            // leftIcon={<FiPlus/>} 
            // onClick={() => setOpenedModal(true)}
          >  
              <Text>Crear nuevo cuestionario</Text>
          </Button>
        </div>
      </Card>
    </Layout>
  )
}

export default index;