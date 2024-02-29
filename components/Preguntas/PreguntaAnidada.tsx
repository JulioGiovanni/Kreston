import { Button, Select, TextInput } from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import { useForm } from '@mantine/form';
import { createNewPregunta, deletePregunta } from '../../services/pregunta.service';
import { IPregunta } from '../../interfaces/pregunta.interface';
import { IconDeviceFloppy } from '@tabler/icons-react';
interface Props {
  subQuestion: any;
  preguntaPadre: IPregunta;
}
const PreguntaAnidada = ({ preguntaPadre, subQuestion }: Props) => {
  const form = useForm({
    initialValues: {
      valorAnidado: subQuestion?.valorAnidado ?? '',
      pregunta: subQuestion?.pregunta ?? '',
      preguntaPadre: preguntaPadre?.id,
      cuestionarioId: preguntaPadre?.cuestionarioId,
    },
  });
  const onSubmit = async (values: any) => {
    await createNewPregunta(values);
  };

  const onUpdate = async (data: any) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0',
        alignItems: 'center',
      }}
    >
      {preguntaPadre?.tipo === 'SELECCION_MULTIPLE' ? (
        <Select
          placeholder="Seleccione una opción"
          data={preguntaPadre?.posiblesRespuestas
            ?.split(',')
            .map((resp: any) => ({ label: resp, value: resp }))}
          {...form.getInputProps('valorAnidado')}
        />
      ) : preguntaPadre?.tipo === 'SELECCION_UNICA' ? (
        <Select
          placeholder="Seleccione una opción"
          data={[
            { label: 'Si', value: 'Si' },
            { label: 'No', value: 'No' },
          ]}
          {...form.getInputProps('valorAnidado')}
        />
      ) : null}
      <TextInput
        style={{ width: '500px', marginRight: '10px' }}
        {...form.getInputProps('pregunta')}
      />
      {subQuestion?.pregunta ? (
        <Button onClick={() => onUpdate(form.values)} style={{ marginRight: '10px' }} color="green">
          <IconDeviceFloppy />
        </Button>
      ) : (
        <Button type="submit" style={{ marginRight: '10px' }} color="green">
          Crear
        </Button>
      )}
      {subQuestion?.pregunta && (
        <Button
          onClick={async () => {
            await deletePregunta(subQuestion.id);
            form.reset();
          }}
          radius="md"
          variant="filled"
          color="red"
        >
          <TrashIcon />
        </Button>
      )}
    </form>
  );
};

export default PreguntaAnidada;
