import React, { useContext } from 'react';
import { useState } from 'react';
import { Stepper, Button, Group, Card, Text, Center } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FormGenerator } from '../common/FormGenerator';
import {
  queryAreas,
  queryClientes,
  queryOficinas,
  queryProyectos,
  queryUsers,
  user_roles,
} from '../../ReactQuery';
import { generateClienteForm } from '../../utils/forms/Cliente.form';
import { clienteSchema } from '../../schemas/clienteSchema';
import { ButtonTypes } from '../../interfaces/form.interface';
import { createNewCliente } from '../../services/cliente.service';
import { proyectoSchema } from '../../schemas/proyectoSchema';
import { createNewProyecto } from '../../services/proyecto.service';
import { generateProyectosForm } from '../../utils/forms/Proyecto.form';
import { StepperContext, StepperProvider } from '../../context/Stepper';

const AceptacionUsuario = () => {
  const {
    Usuarios: Socios,
    isLoading: ScIsLoading,
    isError: ScIsError,
  } = queryUsers(undefined, user_roles.SOCIO);
  const {
    Usuarios: Gerentes,
    isLoading: GrIsLoading,
    isError: GrIsError,
  } = queryUsers(undefined, user_roles.GERENTE);

  const { Usuarios, isLoading: UsLoading, isError: UsError } = queryUsers();
  const { Areas, isLoading: ArLoading, isError: ArError } = queryAreas();
  const { Proyectos, isLoading: PrLoading, isError: PrError } = queryProyectos();
  const { Oficinas, isLoading: OfLoading, isError: OfError } = queryOficinas();
  const { Clientes, isLoading: ClLoading, isError: ClError } = queryClientes();

  const [active, setActive] = useState(0);
  const { clientCreated, projectCreated } = useContext(StepperContext);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const firstLoading = ScIsLoading || GrIsLoading;
  const secondLoading = UsLoading || ArLoading || ClLoading || OfLoading || PrLoading;
  const anyError = ScIsError || GrIsError;

  const nextSteps = () => {
    if (active === 0) {
      if (clientCreated) {
        nextStep();
      } else {
        //TODO: Crear alerta para decir que falta crear cliente
        modals.openConfirmModal({
          title: 'Error',
          centered: true,
          children: <Text> Para avanzar primero tienes que crear un cliente</Text>,
          labels: { confirm: 'Aceptar', cancel: 'Cancelar' },
        });
      }
    } else if (active === 1) {
      if (projectCreated) {
        nextStep();
      } else {
        //TODO: Crear alerta para decir que falta crear proyecto
        modals.openConfirmModal({
          title: 'Error',
          centered: true,
          children: <Text> Para avanzar primero tienes que crear un proyecto</Text>,
          labels: { confirm: 'Aceptar', cancel: 'Cancelar' },
        });
      }
    } else {
      nextStep();
    }
  };

  return (
    <StepperProvider>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step label="Primer paso" description="Crear un cliente">
          <Card>
            <FormGenerator
              fields={generateClienteForm(Socios, Gerentes)}
              formSchema={clienteSchema}
              buttons={[
                {
                  label: 'Crear cliente',
                  type: ButtonTypes.SUBMIT,
                  disabled: false,
                },
              ]}
              loading={firstLoading}
              mutationFn={createNewCliente}
              mutationInterface={{}}
              mutationKey={'clientes'}
            />
          </Card>
          <Center mt={15}>
            <Text c="dimmed">*** Asegúrate de haber creado el cliente antes de continuar ***</Text>
          </Center>
        </Stepper.Step>
        <Stepper.Step label="Segundo Paso" description="Crear proyecto">
          <FormGenerator
            fields={generateProyectosForm(Clientes, Usuarios, Oficinas, Areas)}
            formSchema={proyectoSchema}
            buttons={[
              {
                label: 'Crear proyecto',
                type: ButtonTypes.SUBMIT,
                disabled: false,
              },
            ]}
            mutationFn={createNewProyecto}
            mutationKey={'createProyecto'}
            mutationInterface={{}}
            loading={secondLoading}
          />
          <Center mt={15}>
            <Text c="dimmed">*** Asegúrate de haber creado el proyecto antes de continuar ***</Text>
          </Center>
        </Stepper.Step>
        <Stepper.Step label="Tercer Paso" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Paso anterior
        </Button>
        <Button onClick={nextSteps}>Siguiente paso</Button>
      </Group>
    </StepperProvider>
  );
};

export default AceptacionUsuario;
