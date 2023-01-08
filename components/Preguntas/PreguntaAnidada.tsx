import React from 'react';
import { Button, TextInput } from '@mantine/core';
import { Cross1Icon, TrashIcon } from '@modulz/radix-icons';
import { useForm } from '@mantine/form';
interface Props {
  setPreguntaAnidada: (value: boolean) => void;
  subQuestion: any;
}
const PreguntaAnidada = ({ setPreguntaAnidada, subQuestion }: Props) => {
  const form = useForm({
    initialValues: {
      pregunta: subQuestion?.pregunta ?? '',
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0',
        alignItems: 'center',
      }}
    >
      <TextInput
        style={{ width: '500px', marginRight: '10px' }}
        {...form.getInputProps('pregunta')}
      />
      {subQuestion?.pregunta ? (
        <Button style={{ marginRight: '10px' }} color="green">
          Guardar
        </Button>
      ) : (
        <Button style={{ marginRight: '10px' }} color="green">
          Crear
        </Button>
      )}
      {subQuestion?.pregunta ? (
        <Button radius="md" variant="filled" color="red" onClick={() => setPreguntaAnidada(false)}>
          <TrashIcon />
        </Button>
      ) : (
        <Button radius="md" variant="filled" color="red" onClick={() => setPreguntaAnidada(false)}>
          <Cross1Icon />
        </Button>
      )}
    </div>
  );
};

export default PreguntaAnidada;
