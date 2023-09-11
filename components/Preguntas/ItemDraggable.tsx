import {
  ActionIcon,
  createStyles,
  Popover,
  Text,
  Button,
  TextInput,
  Select,
  Space,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PlusIcon, Cross2Icon } from '@modulz/radix-icons';
import { IconGripVertical } from '@tabler/icons';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PreguntaAnidada from './PreguntaAnidada';
import { IPregunta } from '../../interfaces/pregunta.interface';
import { openModal, closeAllModals } from '@mantine/modals';
import ModalEditPregunta from './ModalEditPregunta';
import { useForm } from '@mantine/form';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
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
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  plusSymbol: {
    ...theme.fn.focusStyles(),
    fontSize: 30,
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],

    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
  },
}));

const editModal = (item: IPregunta) =>
  openModal({
    title: 'Editar Pregunta:',
    children: <ModalEditPregunta item={item} closeModal={closeAllModals} />,
  });

const ItemDraggable = ({ item, index, subQuestions }: any) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const subQuestion = subQuestions.find(
    (subQuestion: any) => subQuestion?.preguntaPadre === item?.id
  );
  const found = subQuestion ? true : false;
  const [preguntaAnidada, setPreguntaAnidada] = useState(found);

  return (
    <Draggable key={item?.id} index={index} draggableId={item?.id.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {/* Handler */}
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          {/* End Handler */}

          {/* Element */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button fullWidth variant="subtle" onClick={() => editModal(item)}>
                <Text>{item?.pregunta}</Text>
              </Button>

              <Popover width={'auto'} position="bottom" withArrow shadow="md" opened={opened}>
                <Popover.Target>
                  <ActionIcon
                    onClick={() => setPreguntaAnidada(!preguntaAnidada)}
                    color={preguntaAnidada ? 'red' : 'green'}
                    variant="filled"
                    size="sm"
                    radius="lg"
                    onMouseEnter={open}
                    onMouseLeave={close}
                  >
                    {preguntaAnidada ? <Cross2Icon /> : <PlusIcon />}
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                  <Text size="sm">Crear sub pregunta</Text>
                </Popover.Dropdown>
              </Popover>
            </div>

            <div>
              {preguntaAnidada && (
                <PreguntaAnidada preguntaPadre={item} subQuestion={subQuestion} />
              )}
            </div>
          </div>
          {/* End Element */}
        </div>
      )}
    </Draggable>
  );
};

export default ItemDraggable;
