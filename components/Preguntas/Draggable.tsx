import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { showNotification } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';
import { Button, Text } from '@mantine/core';
import { updatePositionPregunta } from '../../services/pregunta.service';
import ItemDraggable from './ItemDraggable';
import { IPregunta } from '../../interfaces/pregunta.interface';

const PreguntasDraggable = ({ subQuestions, handlers, state }: any) => {
  const onSubmit = async () => {
    try {
      handlers.apply((items: IPregunta, index: number) => {
        items.posicion = index + 1;
      });

      const data = await updatePositionPregunta(state);
      const preguntas = data.data.data;
      handlers.setState(preguntas);
    } catch (error) {
      console.log(error);
    }
  };
  const items = state?.map((item: any, index: number) => {
    return <ItemDraggable key={item.id} item={item} index={index} subQuestions={subQuestions} />;
  });

  return (
    <div>
      <div style={{ maxHeight: '80hv', overflow: 'scroll' }}>
        <DragDropContext
          onDragEnd={async ({ destination, source }) => {
            try {
              handlers.reorder({ from: source.index, to: destination?.index || 0 });
            } catch (error) {
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
      </div>
      <div>
        <Button onClick={() => onSubmit()} color="green" fullWidth>
          Guardar cambios
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Text>*** Este botón solo guarda la posición de las preguntas ***</Text>
        </div>
      </div>
    </div>
  );
};

export default PreguntasDraggable;
