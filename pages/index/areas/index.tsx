
import { FiPlus } from "react-icons/fi";
import { Avatar, Button, Card, Grid, Space, Text, Title, Modal, TextInput, Center, Select, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { useState, useContext } from 'react';
import { prisma } from '../../db';
import Layout from "../../components/Layout/Layout";
import { useForm } from "@mantine/hooks";
import { API } from "../../API";
import { ErrorsContext } from '../../context/Errors';



export const getServerSideProps = async () => {
    
    const areas = await prisma.area.findMany({})
    const oficinas = await prisma.oficina.findMany({})
    return { 
        props:{
            areas:JSON.parse(JSON.stringify(areas)),
            oficinas:JSON.parse(JSON.stringify(oficinas))
        }  
    }
  }


const index = ({areas,oficinas}:any) => {
    const [openedModal, setOpenedModal] = useState(false)
    const { colorScheme } = useMantineColorScheme();
    const {setNewError,removeError} = useContext(ErrorsContext)
    const form = useForm({
        initialValues:{
            nombre:'',
            oficina:'',
        },
    })
    const onSubmitForm = async (values:any)=>{
        try {
            await API.AreaApi.createNewArea(values)
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
            title={"Agregar área"}
        >
            <form onSubmit={form.onSubmit(onSubmitForm)}>
                <TextInput
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    required
                    {...form.getInputProps("nombre")}
                />
                <Select
                    label="Oficina"
                    name="oficina"
                    data={oficinas.map((oficina:any) => ({value:oficina.id, label:oficina.nombre}))}
                    {...form.getInputProps("oficina")}
                />
    
                <Button fullWidth my={'md'} type='submit'>
                    Crear Nueva Área
                </Button>
      
            </form>
        </Modal>
    
         <div style={{display:'flex', justifyContent:'space-between'}}>
                <Title order={2} >Áreas</Title>
                <Button 
                  leftIcon={<FiPlus/>} 
                  onClick={() => setOpenedModal(true)}
                >  
                    <Text>Agregar área</Text>
                </Button>
            </div>
            <Space h={30}/>

        <Grid>
            {areas.map((area:any) => {
                //Get the first letter of every word in the name
                const initials = area.nombre.split(" ").map((word:any) => word[0]).join("");

                return(
                    <Grid.Col sm={12} md={6} lg={4} key={area.id}>
                        

                            <Card style={{ height:150, padding:40}}>
                                
                                <Card.Section>

                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <Title order={3}>{area.nombre}</Title>

                                            <Avatar radius="xl" size={'lg'}>
                                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                    <Text color={colorScheme == 'dark' ? 'white' : 'dark'} weight={'bold'}>{initials}</Text>
                                                    <Text size='xs' color={'dimmed'}>{area.oficina}</Text>
                                                </div>
                                            </Avatar>

                                    </div>

                                </Card.Section>

                                <Card.Section mt={20}>
                                    <Link href={`/areas/${area.id}`} passHref>
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