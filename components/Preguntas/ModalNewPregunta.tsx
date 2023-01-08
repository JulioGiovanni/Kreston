import { Modal, Select, TextInput, Button, Space } from '@mantine/core';
import React from 'react';

const ModalNewPregunta = ({ openedModal, setOpenedModal, form, onSubmit }: any) => {
  return (
    <>
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title="Crear nueva pregunta"
      >
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
            {...form.getInputProps('tipoPregunta')}
          />
          {form.getInputProps('tipoPregunta').value === 'SELECCION_MULTIPLE' && (
            <TextInput
              label="Opciones"
              name="opciones"
              placeholder="Escriba las opciones separadas por comas"
              {...form.getInputProps('posiblesRespuestas')}
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
