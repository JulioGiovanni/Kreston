import { FC, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import loginImage from '../../public/images/login-image.png';
import {
  Center,
  Grid,
  Card,
  PasswordInput,
  TextInput,
  Button,
  Space,
  Anchor,
  Text,
} from '@mantine/core';
import { AuthContext } from '../../context/auth/AuthContext';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login: FC = () => {
  const router = useRouter();
  const { message } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      correo: '',
      password: '',
    },

    // validationRules: {
    //     correo: (value) => value.trim().length > 5,
    //     password: (value) => value.trim().length >= 6,
    // }
  });
  const errorMessageType = message?.split('_')[0];
  const errorMessage = message?.split('_')[1];
  const errorMessageCorreo = errorMessage ? errorMessageType === 'correo' : null;
  const errorMessageContrasena = errorMessage ? errorMessageType === 'contrasena' : null;

  const onSubmitForm = async ({ correo, password }: any) => {
    await signIn('credentials', { correo, password });
    form.reset();
    router.replace('/index/dashboard');
  };

  return (
    <Center style={{ marginTop: '150px' }}>
      <div style={{ width: '800px' }}>
        <Card shadow="md" p="lg" radius="sm">
          <Grid>
            <Grid.Col span={6}>
              <Image src={loginImage} alt="Login" height={300} />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xl" align="center">
                <b>Bienvenido</b>
              </Text>
              <Text size="xl" align="center">
                Inicie Sesión para continuar
              </Text>

              <form onSubmit={form.onSubmit(onSubmitForm)}>
                <TextInput
                  // icon={<MailIcon />}
                  label="Correo"
                  placeholder="email@email.com"
                  radius="sm"
                  required
                  {...form.getInputProps('correo')}
                  // onChange={(event) => form.setFieldValue('correo', event.currentTarget.value)}
                  error={form.errors.correo || (errorMessageCorreo && errorMessage)}
                />
                <Space h="md" />
                <PasswordInput
                  placeholder="Contraseña"
                  label="Contraseña"
                  radius="sm"
                  required
                  {...form.getInputProps('password')}
                  // onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password || (errorMessageContrasena && errorMessage)}
                />

                <Button color="green" radius="sm" fullWidth mt="lg" type="submit">
                  Iniciar Sesión
                </Button>
              </form>

              <Center mt={'lg'}>
                <Link href="/auth/forgot" passHref>
                  <Anchor component="button" underline={false}>
                    ¿Olvidaste tu contraseña?
                  </Anchor>
                </Link>
              </Center>
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Center>
  );
};

export default Login;
