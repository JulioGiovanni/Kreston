import { useListState } from '@mantine/hooks';

import { Card, Divider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { queryPreguntas } from '../../ReactQuery';
import ModalNewPregunta from '../../components/Preguntas/ModalNewPregunta';
import PreguntasDraggable from '../../components/Preguntas/Draggable';

import HeaderApp from '../../components/UI/HeaderApp';
import { IPregunta } from '../../interfaces/pregunta.interface';
import LoadingTable from '../../components/common/loaders/LoadingTable';
import { mutatePreguntas } from '../../ReactQuery/Preguntas';
import { InferGetServerSidePropsType } from 'next';
import { IconUserPlus } from '@tabler/icons-react';

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  return {
    props: {
      id,
    },
  };
};

const Preguntas = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //Get the id of the questionary based on the url
  const { id } = props;
  const {
    data: Preguntas,
    isLoading: PrLoading,
    isError: PrError,
    isFetching,
  } = queryPreguntas(id);
  const mutation = mutatePreguntas();
  const [state, handlers] = useListState<IPregunta>(Preguntas);
  const [openedModal, setOpenedModal] = useState(false);

  const rootQuestions = Preguntas?.filter((item: IPregunta) => !item.preguntaPadre);
  const subQuestions = Preguntas?.filter((item: any) => item.preguntaPadre);

  useEffect(() => {
    handlers.setState(rootQuestions);
  }, [isFetching, Preguntas]);

  const form = useForm({
    initialValues: {
      pregunta: '',
      cuestionarioId: id,
      preguntaPadre: null,
      posicion: 1,
      tipoPregunta: '',
      valorAnidado: '',
      posiblesRespuestas: [],
    },
  });
  const onSubmit = async (values: any) => {
    values.posicion = rootQuestions.length + 1;

    const data = mutation.mutate(values);
    console.log(data);
    // const data = await createNewPregunta(values);
    if (mutation.isSuccess) {
      console.log('Mutation response', mutation.data);
      const newPregunta = mutation.data;
      handlers.append(newPregunta);
      form.reset();
      setOpenedModal(false);
    }
    if (mutation.isError) throw mutation.error;
  };

  return (
    <>
      <Card padding={'lg'} radius={'md'} withBorder>
        <HeaderApp
          title="Cuestionario"
          openModalFunction={() => setOpenedModal(true)}
          buttonTitle="Crear nueva pregunta"
          Icon={IconUserPlus}
          loading={PrLoading}
        />
        <ModalNewPregunta
          openedModal={openedModal}
          setOpenedModal={setOpenedModal}
          onSubmit={onSubmit}
          form={form}
        />
        <Divider my={30} />
        {PrLoading ? (
          <LoadingTable />
        ) : (
          <PreguntasDraggable subQuestions={subQuestions} state={state} handlers={handlers} />
        )}
      </Card>
    </>
  );
};

export default Preguntas;
