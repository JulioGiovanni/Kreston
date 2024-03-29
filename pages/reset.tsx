
import {Center,Grid,Card,PasswordInput,TextInput,Button,Anchor} from '@mantine/core';
import { getSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import resetPasswordImage from '../public/images/reset-image.jpg'

const reset = () => {
  return (
    <div>
        <Center style={{marginTop:'100px'}}>
            <div style={{width:"600px"}}>
                <Card shadow='md' p='lg' radius="sm">
                    <Center>
                        <Grid>
                            <Grid.Col span={12}>
                                <Center>
                                    <Image src={resetPasswordImage}/>
                                </Center>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <PasswordInput
                                    label="Ingresa tu contraseña"
                                    description="Ingresa tu nueva contraseña"
                                    placeholder="********"
                                    radius={'sm'}
                                />
                                <Button color="green" radius="sm" fullWidth mt={"lg"}>
                                    Cambiar contraseña
                                </Button>
                               
                            </Grid.Col>
                        </Grid>
                    </Center>

                </Card>
            </div>
        </Center>
    </div>
  )
}

export const getServerSideProps = async ({req}:any) => {
    // your fetch function here 
        const session = await getSession({req});
    
        if (session){
            return {
                redirect:{
                    destination: '/index/dashboard',
                    permanent: false
                }
            }
        }
    
        return {
            props: {  }
        }
    }
export default reset