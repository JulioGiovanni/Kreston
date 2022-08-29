import React from 'react';
import { Center, Grid, Card, PasswordInput, TextInput, Button, Space, Anchor } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import forgotPasswordImage from '../../public/images/forgot-image.jpg';
import { getSession } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';

const forgot = () => {
  return (
    <Center
      sx={{
        marginTop: '100px',
      }}
    >
      <Card shadow="md" p="lg" radius="sm">
        <Grid>
          <Grid.Col span={12}>
            <Center>
              <Image src={forgotPasswordImage} />
            </Center>
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              label="Ingresa tu correo"
              description="Ingresa tu correo para recuperar tu contraseña"
              placeholder="email@email.com"
              radius={'sm'}
            />
            <Button color="green" radius="sm" fullWidth mt={'lg'}>
              Enviar Correo
            </Button>

            <Center mt={'lg'}>
              <Link href="/auth/login">
                <Anchor component="a" underline={false}>
                  ¿Ya tienes cuenta?
                </Anchor>
              </Link>
            </Center>
          </Grid.Col>
        </Grid>
      </Card>
    </Center>
  );
};
export default forgot;
