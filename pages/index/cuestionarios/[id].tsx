import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, Card, Text, Title, TextInput, Divider, createStyles } from '@mantine/core';
import Layout from '../../../components/Layout/Layout';
import { prisma } from '../../../db';
import { useContext, useEffect } from 'react';
import { ErrorsContext } from '../../../context/Errors/ErrorsContext';
import { useForm } from '@mantine/form';
import { PreguntasContext } from '../../../context/Preguntas/PreguntasContext';
import { PreguntaApi } from '../../../API/PreguntaApi';
import { showNotification } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';

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

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

const index = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setNewError } = useContext(ErrorsContext);
  const { preguntas, traerPreguntas, agregarPregunta } = useContext(PreguntasContext);
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(preguntas);

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

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          {/* <Text className={classes.symbol}>{item.symbol}</Text> */}
          <div>
            <Text>{item.pregunta}</Text>
            {/* <Text color="dimmed" size="sm">
              Position: {item.position} • Mass: {item.mass}
            </Text> */}
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <Layout>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title order={2}>Cuestionario: </Title>
        </div>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <TextInput
              label="Pregunta"
              name="mensaje"
              placeholder="Pregunta"
              {...form.getInputProps('pregunta')}
            />
            <Button type="submit">
              <Text>Agregar Pregunta</Text>
            </Button>
          </div>
        </form>
        <Divider my={30} />
        <DragDropContext
          onDragEnd={async ({ destination, source }) => {
            try {
              handlers.reorder({ from: source.index, to: destination?.index || 0 });
              //TODO: Crear botón para guardar cambios y no actualizar las preguntas cada que se mueve una pregunta
              const newOrder = reorder(state, source.index, destination?.index || 0);
              const response = await PreguntaApi.updatePositionPregunta(newOrder);
              console.log(response);
            } catch (error) {
              console.log(error);
              showNotification({
                title: 'Ocurrió un error',
                message:
                  'No se pudo actualizar la posición de las preguntas, si el problema persiste contacte al administrador',
                autoClose: 3000,
                color: 'red',
                icon: <Cross1Icon />,
              });
            }
          }}
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </Layout>
  );
};

export default index;
