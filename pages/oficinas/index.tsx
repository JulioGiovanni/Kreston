
import { FiPlus } from "react-icons/fi";
import { Avatar, Button, Card, Grid, Space, Text, Title, Modal, TextInput, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { useContext, useState } from "react";
import { prisma } from '../../db';
import Layout from "../../components/Layout/Layout";
import { useForm } from "@mantine/hooks";
import { API } from "../../API";
import { ErrorsContext } from "../../context/Errors";


export const getServerSideProps = async () => {

    const oficinas = await prisma.oficina.findMany({
    })
    return { props:  {oficinas:JSON.parse(JSON.stringify(oficinas))}  }
  }


const index = ({oficinas}:any) => {
    const [openedModal, setOpenedModal] = useState(false)
    const {setNewError,removeError} = useContext(ErrorsContext)
    const { colorScheme } = useMantineColorScheme();
    const form = useForm({
        initialValues:{
            nombre:'',
            direccion:'',
        },
    })
    const onSubmitForm = async (values:any)=>{
        try {
            await API.OficinaApi.createNewOficina(values)
            form.reset();
            setOpenedModal(false)
            removeError();
        } catch (error:any) {
            setNewError(error.response.data.message,error.response.data.type)
            form.setFieldError(error.response.data.type,error.response.data.message)
        }

    }
  return (
    <Layout>

        <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title={"Agregar oficina"}
        >
            <form onSubmit={form.onSubmit(onSubmitForm)}>
                <TextInput
                    label="Nombre de la oficina"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    required
                    {...form.getInputProps("nombre")}
                />
                <TextInput
                    label="Dirección"
                    name="direccionm"
                    type="text"
                    placeholder="Dirección"
                    required
                    {...form.getInputProps("direccion")}
                />
                <Button fullWidth my='md' type='submit'>
                    Crear Nueva Oficina
                </Button>
            </form>
        </Modal>

         <div style={{display:'flex', justifyContent:'space-between'}}>
                <Title order={2} >Oficinas</Title>
                <Button 
                  leftIcon={<FiPlus/>} 
                  onClick={() => setOpenedModal(true)}
                >  
                    <Text>Agregar oficina</Text>
                </Button>
            </div>
            <Space h={30}/>

        <Grid>
            {oficinas.map((area:any) => {
                //Get the first letter of every word in the name
                const initials = area.nombre.split(" ").map((word:any) => word[0]).join("");

                return(
                    <Grid.Col sm={12} md={6} lg={4}>
                        

                            <Card style={{ height:150, padding:40}}>
                                
                                <Card.Section>

                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <Title order={3}>{area.nombre}</Title>

                                            <Avatar radius="xl" size={'lg'}>
                                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                    <Text color={colorScheme == 'dark' ? 'white' :'black'} weight={'bold'}>{initials}</Text>
                                                    <Text size='xs' color={'dimmed'}>{area.oficina}</Text>
                                                </div>
                                            </Avatar>

                                    </div>

                                </Card.Section>

                                <Card.Section mt={20}>
                                    <Link href={`/oficinas/${area.id}`} passHref>
                                        <Button fullWidth>
                                            Ver Más
                                        </Button>
                                    </Link>
                                </Card.Section>
                            
                            </Card>

                        
                    </Grid.Col>
                )
            })}
        </Grid>
    </Layout>
  )
}

export default index