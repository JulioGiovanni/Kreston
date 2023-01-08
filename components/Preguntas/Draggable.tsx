import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { showNotification } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';
import { Button } from '@mantine/core';
import { updatePositionPregunta } from '../../services/pregunta.service';

import ItemDraggable from './ItemDraggable';

const PreguntasDraggable = ({ handlers, reorder, state }: any) => {
  const rootQuestions = state?.filter((item: any) => !item.preguntaPadre);
  const subQuestions = state?.filter((item: any) => item.preguntaPadre);

  const items = rootQuestions?.map((item: any, index: number) => {
    return <ItemDraggable item={item} index={index} subQuestions={subQuestions} />;
  });

  return (
    <DragDropContext
      onDragEnd={async ({ destination, source }) => {
        try {
          handlers.reorder({ from: source.index, to: destination?.index || 0 });
          //TODO: Crear botón para guardar cambios y no actualizar las preguntas cada que se mueve una pregunta
          const newOrder = reorder(state, source.index, destination?.index || 0);
          const response = await updatePositionPregunta(newOrder);
          // console.log(response);
        } catch (error) {
          // console.log(error);
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
      <Button color="green" fullWidth>
        Guardar cambios
      </Button>
    </DragDropContext>
  );
};

export default PreguntasDraggable;
