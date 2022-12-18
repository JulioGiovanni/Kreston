import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';
import { createStyles, Text } from '@mantine/core';
import { updatePositionPregunta } from '../../services/pregunta.service';

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

const PreguntasDraggable = ({ handlers, reorder, state }: any) => {
  const { classes, cx } = useStyles();

  const items = state.map((item: any, index: number) => (
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
    </DragDropContext>
  );
};

export default PreguntasDraggable;
