import { useListState } from '@mantine/hooks';

import { Card, Divider } from '@mantine/core';
import Layout from '../../../components/Layout/Layout';
import { FC, useContext, useEffect, useState } from 'react';
import { ErrorsContext } from '../../../context/Errors/ErrorsContext';
import { useForm } from '@mantine/form';

import ModalNewPregunta from '../../../components/Preguntas/ModalNewPregunta';
import PreguntasDraggable from '../../../components/Preguntas/Draggable';
import { createNewPregunta, getAllPreguntas } from '../../../services/pregunta.service';
import { useRouter } from 'next/router';
import { UsePregunta } from '../../../ReactQuery/Preguntas';
import Loading from '../../../components/UI/Loading';
import HeaderApp from '../../../components/UI/HeaderApp';
import { IPregunta } from '../../../interfaces/pregunta.interface';

const Preguntas: FC = (props) => {
  //Get the id of the questionary based on the url
  const router = useRouter();
  const { id } = router.query;

  const { setNewError } = useContext(ErrorsContext);
  const { Preguntas, isLoading: PrLoading, error: PrError } = UsePregunta(Number(id));

  const [state, handlers] = useListState<IPregunta>(Preguntas);
  const [openedModal, setOpenedModal] = useState(false);

  useEffect(() => {
    handlers.setState(rootQuestions);
  }, [PrLoading, Preguntas]);
  const rootQuestions = Preguntas?.filter((item: any) => !item.preguntaPadre);
  const subQuestions = Preguntas?.filter((item: any) => item.preguntaPadre);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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
    try {
      values.posicion = rootQuestions.length + 1;
      const data = await createNewPregunta(values);
      const newPregunta = data.data;
      handlers.append(newPregunta);
      form.reset();
      setOpenedModal(false);
    } catch (error: any) {
      setNewError(error.response.data.message, error.response.data.type);
      form.setFieldError(error.response.data.type, error.response.data.message);
    }
  };

  return (
    <Layout>
      {PrLoading ? (
        <Loading />
      ) : (
        <Card>
          <HeaderApp
            title="Cuestionario"
            openModalFunction={() => setOpenedModal(true)}
            buttonTitle="Crear nueva pregunta"
          />
          <ModalNewPregunta
            openedModal={openedModal}
            setOpenedModal={setOpenedModal}
            onSubmit={onSubmit}
            form={form}
          />
          <Divider my={30} />
          <PreguntasDraggable
            subQuestions={subQuestions}
            state={state}
            handlers={handlers}
            reorder={reorder}
          />
        </Card>
      )}
    </Layout>
  );
};

export default Preguntas;
