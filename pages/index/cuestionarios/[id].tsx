import { useListState } from '@mantine/hooks';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, Card, Title, Divider } from '@mantine/core';
import Layout from '../../../components/Layout/Layout';
import { prisma } from '../../../db';
import { useContext, useEffect, useState } from 'react';
import { ErrorsContext } from '../../../context/Errors/ErrorsContext';
import { useForm } from '@mantine/form';
import { PreguntasContext } from '../../../context/Preguntas/PreguntasContext';
import { PreguntaApi } from '../../../API/PreguntaApi';

import ModalNewPregunta from '../../../components/Preguntas/ModalNewPregunta';
import PreguntasDraggable from '../../../components/Preguntas/Draggable';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const preguntas = await prisma.pregunta.findMany({
    where: { cuestionarioId: Number(ctx.query.id) },
    orderBy: { posicion: 'asc' },
  });

  return {
    props: {
      preguntas: JSON.parse(JSON.stringify(preguntas)),
      cuestionarioId: Number(ctx.query.id),
    },
  };
};

const index = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setNewError } = useContext(ErrorsContext);
  const { preguntas, traerPreguntas, agregarPregunta } = useContext(PreguntasContext);

  const [state, handlers] = useListState(preguntas);
  const [openedModal, setOpenedModal] = useState(false);

  useEffect(() => {
    traerPreguntas(props.preguntas);
  }, []);

  useEffect(() => {
    handlers.setState(preguntas);
  }, [preguntas]);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const form = useForm({
    initialValues: {
      pregunta: '',
      cuestionarioId: props.cuestionarioId,
      preguntaPadre: null,
      posicion: 1,
    },
  });
  const onSubmit = async (values: any) => {
    try {
      values.posicion = preguntas.length + 1;

      const pregunta = await PreguntaApi.createNewPregunta(values);
      agregarPregunta(pregunta.data.data);
      form.reset();
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };

  return (
    <Layout>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title order={2}>Cuestionario: </Title>
          <Button onClick={() => setOpenedModal(true)}>Crear nueva pregunta</Button>
        </div>
        <ModalNewPregunta
          openedModal={openedModal}
          setOpenedModal={setOpenedModal}
          onSubmit={onSubmit}
          form={form}
        />
        <Divider my={30} />
        <PreguntasDraggable state={state} handlers={handlers} reorder={reorder} />
      </Card>
    </Layout>
  );
};

export default index;
