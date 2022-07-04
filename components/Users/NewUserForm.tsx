import { FC, useContext } from 'react';

import { Anchor, Button, Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm, useMediaQuery } from '@mantine/hooks';
import { API } from '../../API';
import { ErrorsContext } from '../../context/Errors/ErrorsContext';

interface UserEditFormProps {
    areas: any;
    oficinas: any;
    roles: any;

    setOpenedModal:any;
}

const NewUserForm: FC<UserEditFormProps> = ({areas,oficinas,roles,setOpenedModal}) => {
        const {setNewError,removeError,message,type } = useContext(ErrorsContext)
        const isMobile = useMediaQuery('(max-width: 755px');
        const areaData = areas.map((area:any) => ({value:area.id,label:area.nombre}));
        const oficinaData = oficinas.map((oficina:any) => ({value:oficina.id,label:oficina.nombre}));
        const roleData = roles.map((role:any) => ({value:role.id,label:role.nombre}));
        const form = useForm({
            initialValues:{
                nombre:'',
                correo:'',
                contrasena:'',
                area:null,
                rol:null,
                oficina:null,
            },
            validationRules: {
            nombre: (value) => value.trim().length > 5,
            correo: (value) => value.trim().length > 6,
            contrasena: (value) => value.trim().length >= 6,
            // area: (value) => value.trim().length > 1,
            // rol: (value) => value.trim().length > 1,
            // oficina: (value) => value.trim().length > 1,
            },
            
            
        });

        

        // const onCreateNewUser = async (values:any) => {
        //     return await UserApi.createNewUser(values);
        //   }

    return (
        <form onSubmit={form.onSubmit(async(values)=>{
            try {

                const { createNewUser } = API.UserApi;
                await createNewUser(values);
                removeError();
            } catch (error:any) {

                setNewError(error.response.data.message,error.response.data.type);
                form.setFieldError(error.response.data.type.toLowerCase(), error.response.data.message);
            }
        })}>
        <TextInput
            required
            label="Nombre"
            name='nombre'
            id='nombre'
            placeholder="Juan Pérez"
            style={{ minWidth: isMobile ? 220 : 300 }}
            variant="default"
            {...form.getInputProps('nombre')}
        />
        {/* <NumberInput
            label="Teléfono"
            placeholder="1234567890"
            value={form.values.telefono}
            onChange={(event) => form.setFieldValue('telefono', event)}
        /> */}

        <TextInput
            required
            label="Correo"
            name='correo'
            id='correo'
            placeholder="email@email.com"
            style={{ minWidth: isMobile ? 220 : 300, marginTop: 15 }}
            variant="default"
            {...form.getInputProps('correo')}
        />

        <PasswordInput
            required
            label="Contraseña"
            name='contrasena'
            id='contrasena'
            placeholder="*******"
            style={{ minWidth: isMobile ? 220 : 300, marginTop: 15 }}
            variant="default"
            {...form.getInputProps('contrasena')}
        />

        <Select
            label="Escoge un área"
            placeholder="Áreas"
            name='area'
            id='area'
            data={areaData}
            {...form.getInputProps('area')}
        />
        <Select
            label="Escoge una oficina"
            placeholder="Oficinas"
            name='oficina'
            id='oficina'
            data={oficinaData}
            {...form.getInputProps('oficina')}
        />
        <Select
            label="Escoge un rol para este usuario"
            placeholder="Roles"
            name='rol'
            id='rol'
            data={roleData}
            {...form.getInputProps('rol')}
        />

        <Group position="apart" style={{ marginTop: 15 }}>
            <Anchor component="button" color="gray" size="sm" onClick={()=>setOpenedModal(false)} >
            Cancelar
            </Anchor>
            <Button type="submit" size="sm">
                Guardar
            </Button>
        </Group>
        </form>
  )
}

export default NewUserForm