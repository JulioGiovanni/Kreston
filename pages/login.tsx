import {Center,Grid,Card,PasswordInput,TextInput,Button,Space,Anchor, Text} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import loginImage from '../public/images/login-image.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { useForm } from '@mantine/hooks';





const login = () => {

    const {Login,message} = useContext(AuthContext)
    const form = useForm({
        initialValues: {
            correo: '',
            password: ''
        },
        
        validationRules: {
            correo: (value) => value.trim().length > 5,
            password: (value) => value.trim().length >= 6,
        }


    });
    const errorMessageType = message?.split('_')[0];
    const errorMessage = message?.split('_')[1];
    const errorMessageCorreo = errorMessage ? errorMessageType === 'correo' : null;
    const errorMessageContrasena = errorMessage ? errorMessageType === 'contrasena' : null;
    

  return (
    <Center style={{marginTop:'150px'}}>
        <div style={{width:"800px"}}>
            <Card shadow="md" p="lg" radius="sm">
                <Grid>
                    <Grid.Col span={6}>
                        <Image src={loginImage} alt="Login"  height={'400px'}/>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Text size='xl' align='center'><b>Bienvenido</b></Text>
                        <Text size='xl' align='center'>Inicie Sesión para continuar</Text>

                        <form>

                            <TextInput
                                // icon={<MailIcon />}
                                label="Correo"
                                placeholder="email@email.com"
                                radius="sm"
                                required
                                {...form.getInputProps('correo')}
                                // onChange={(event) => form.setFieldValue('correo', event.currentTarget.value)}
                                error={form.errors.correo || errorMessageCorreo && errorMessage}

                            />
                            <Space h="md"/>
                            <PasswordInput
                                placeholder="Contraseña"
                                label="Contraseña"
                                radius="sm"
                                required
                                {...form.getInputProps('password')}
                                // onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password || errorMessageContrasena && errorMessage}
                            />
                            
                            <Button color="green" radius="sm" fullWidth mt={"lg"} component="a" type='submit' onClick={form.onSubmit((values) => {
                                form.reset();
                                return Login(values.correo,values.password)
                            })}>Iniciar Sesión</Button>
                            
                        </form>


                        <Center mt={"lg"}>
                            <Anchor component={Link} href="/forgot" underline={false}>
                                ¿Olvidaste tu contraseña?
                            </Anchor>
                        </Center>
                    </Grid.Col>
                </Grid>
            </Card>
        </div>

    </Center>
  )
}

export default login;