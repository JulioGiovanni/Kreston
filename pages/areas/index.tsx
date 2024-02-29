import {
  Avatar,
  Button,
  Card,
  Grid,
  Space,
  Text,
  Title,
  Modal,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { useState, useContext, FC } from 'react';

import { ErrorsContext } from '../../context/Errors';

import { createNewArea, getAllAreas } from '../../services/area.service';
import { mutateAreas, queryAreas } from '../../ReactQuery/Areas';
import Loading from '../../components/common/loaders/Loading';
import HeaderApp from '../../components/UI/HeaderApp';
import { FormGenerator } from '../../components/common/FormGenerator';
import { generateAreaForm } from '../../utils/forms/Area.form';
import { areaSchema } from '../../schemas/areaSchema';
import { ButtonTypes } from '../../interfaces/form.interface';
import { queryOficinas } from '../../ReactQuery/Oficinas';
import { IconUserPlus } from '@tabler/icons-react';

export const Areas: FC = (props) => {
  const [openedModal, setOpenedModal] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const { setNewError, removeError } = useContext(ErrorsContext);
  const { Areas, isLoading: ArLoading, isError } = queryAreas();
  const { Oficinas, isLoading: OfLoading, isError: OfError } = queryOficinas();

  const stillLoading = ArLoading || OfLoading;

  return (
    <>
      {ArLoading || OfLoading ? (
        <Loading />
      ) : (
        <>
          <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={'Agregar área'}>
            <FormGenerator
              fields={generateAreaForm(Oficinas)}
              formSchema={areaSchema}
              buttons={[
                {
                  label: 'Agregar',
                  type: ButtonTypes.SUBMIT,
                },
              ]}
              loading={stillLoading}
              setOpenedModal={setOpenedModal}
              mutationFn={createNewArea}
              mutationKey={'areas'}
              mutationInterface={{}}
            />
          </Modal>
          <HeaderApp
            title="Áreas"
            openModalFunction={() => setOpenedModal(true)}
            buttonTitle="Agregar área"
            Icon={IconUserPlus}
            loading={stillLoading}
          />
          <Space h={30} />

          <Grid>
            {Areas.map((area: any) => {
              //Get the first letter of every word in the name
              const initials = area.nombre
                .split(' ')
                .map((word: any) => word[0])
                .join('');
              return (
                <Grid.Col span={{ sm: 12, md: 6, lg: 4 }} key={area.id}>
                  <Card style={{ padding: 40 }} withBorder>
                    <Card.Section>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Title order={3}>{area.nombre}</Title>
                          <Text size="xs" color={'dimmed'}>
                            {area.oficina.nombre}
                          </Text>
                        </div>

                        <Avatar radius="xl" size={'lg'}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <Text color={colorScheme == 'dark' ? 'white' : 'dark'} fw={'bold'}>
                              {initials}
                            </Text>
                          </div>
                        </Avatar>
                      </div>
                    </Card.Section>

                    <Card.Section mt={20}>
                      <Link
                        href={`/areas/${area.id}`}
                        passHref
                        style={{ textDecorationLine: 'none' }}
                      >
                        <Button fullWidth>Ver Más</Button>
                      </Link>
                    </Card.Section>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};

export default Areas;
