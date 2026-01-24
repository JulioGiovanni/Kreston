import { FC, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import loginImage from '../../public/images/login-image.png';
import { Center, Card, PasswordInput, TextInput, Button, Space, Anchor, Text } from '@mantine/core';
import { AuthContext } from '../../context/auth/AuthContext';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login: FC = (props) => {
  const router = useRouter();
  const { message } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      correo: '',
      password: '',
    },
  });
  const errorMessageType = message?.split('_')[0];
  const errorMessage = message?.split('_')[1];
  const errorMessageCorreo = errorMessage ? errorMessageType === 'correo' : null;
  const errorMessageContrasena = errorMessage ? errorMessageType === 'contrasena' : null;

  const onSubmitForm = async ({ correo, password }: any) => {
    await signIn('credentials', { correo, password });
    form.reset();
    router.replace('/dashboard');
  };

  return (
    <Center mx={'auto'}>
      <Card shadow="md" p="lg" radius="sm">
        <div style={{ display: 'flex', gap: '50px' }}>
          <Image src={loginImage} alt="Login" height={500} />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Text fz={35}>
              <b>Bienvenido</b>
            </Text>
            <Text fz={30}>Inicie Sesión para continuar</Text>

            <form onSubmit={form.onSubmit(onSubmitForm)}>
              <TextInput
                // icon={<MailIcon />}
                label="Correo"
                placeholder="email@email.com"
                radius="sm"
                size="lg"
                required
                {...form.getInputProps('correo')}
                error={form.errors.correo || (errorMessageCorreo && errorMessage)}
              />
              <Space h="md" />
              <PasswordInput
                placeholder="Contraseña"
                label="Contraseña"
                radius="sm"
                size="lg"
                required
                {...form.getInputProps('password')}
                error={form.errors.password || (errorMessageContrasena && errorMessage)}
              />

              <Button size="md" color="green" radius="sm" fullWidth mt="lg" type="submit">
                Iniciar Sesión
              </Button>
            </form>

            <Center mt={'lg'}>
              <Link href="/auth/forgot" passHref>
                <Anchor component="button" size={'xl'} underline="never">
                  ¿Olvidaste tu contraseña?
                </Anchor>
              </Link>
            </Center>
          </div>
        </div>
      </Card>
    </Center>
  );
};

export default Login;
