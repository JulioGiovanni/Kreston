import { Modal, Select, TextInput, Button, Space } from '@mantine/core';
import React from 'react';

const ModalNewPregunta = ({ openedModal, setOpenedModal, form }: any) => {
  return (
    <>
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title="Crear nueva pregunta"
      >
        <form onSubmit={form.handleSubmit}>
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
              { value: 'SELECCION', label: 'Selección' },
              { value: 'BOOLEANO', label: 'Si/No' },
            ]}
            {...form.getInputProps('tipoPregunta')}
          />
          {form.getInputProps('tipoPregunta').value === 'SELECCION' && (
            <TextInput
              label="Opciones"
              name="opciones"
              placeholder="Escriba las opciones separadas por comas"
              {...form.getInputProps('opciones')}
            />
          )}
          <Space my={30} />
          <Button type="submit" color="primary" fullWidth>
            Crear pregunta
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ModalNewPregunta;
