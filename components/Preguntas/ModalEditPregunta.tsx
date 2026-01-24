import { Select, TextInput, Button, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { IPregunta } from '../../interfaces/pregunta.interface';
import { updatePregunta } from '../../services/pregunta.service';
import { mutatePregunta } from '../../ReactQuery';

interface modalProps {
  item: IPregunta;
  closeModal: () => void;
}

const ModalEditPregunta = ({ item, closeModal }: modalProps) => {
  const mutation = mutatePregunta(item.id);
  const form = useForm({
    initialValues: {
      pregunta: item?.pregunta,
      tipo: item?.tipo,
      posiblesRespuestas: item?.posiblesRespuestas,
      id: item?.id,
    },
  });
  const onSubmit = async (values: any) => {
    try {
      mutation.mutate(values);
      closeModal();
      showNotification({
        title: 'Pregunta actualizada',
        message: 'La pregunta se actualizó correctamente',
        color: 'teal',
      });
    } catch {
      showNotification({
        title: 'Error',
        message: 'Ocurrió un error al actualizar la pregunta',
        color: 'red',
      });
    }
  };
  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Pregunta"
          name="Pregunta"
          placeholder="Escriba una pregunta"
          {...form.getInputProps('pregunta')}
        />
        <Select
          label="Tipo de pregunta"
          name="tipoPregunta"
          placeholder="Seleccione un tipo de pregunta"
          data={[
            { value: 'TEXTO', label: 'Texto' },
            { value: 'SELECCION_MULTIPLE', label: 'Selección' },
            { value: 'SELECCION_UNICA', label: 'Si/No' },
          ]}
          {...form.getInputProps('tipo')}
        />
        {form.getInputProps('tipo').value === 'SELECCION_MULTIPLE' && (
          <TextInput
            label="Opciones"
            name="opciones"
            placeholder="Escriba las opciones separadas por comas"
            {...form.getInputProps('posiblesRespuestas')}
          />
        )}
        <Space my={30} />
        <Button type="submit" color="blue" fullWidth>
          Editar Pregunta
        </Button>
      </form>
    </>
  );
};

export default ModalEditPregunta;
