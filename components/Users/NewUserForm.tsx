import { FC, useContext } from 'react';

import { Anchor, Button, Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { API } from '../../API';
import { ErrorsContext } from '../../context/Errors/ErrorsContext';
import { DataContext } from '../../context/Data/DataContext';

interface UserEditFormProps {
    setOpenedModal:any;
}

const NewUserForm: FC<UserEditFormProps> = ({setOpenedModal}) => {
        const {setNewError,removeError } = useContext(ErrorsContext)
        const { setNewData,Areas,Oficinas,Roles } = useContext(DataContext);
        const isMobile = useMediaQuery('(max-width: 755px');
        const areaData = Areas.map((area:any) => ({value:area.id,label:area.nombre}));
        const oficinaData = Oficinas.map((oficina:any) => ({value:oficina.id,label:oficina.nombre}));
        const roleData = Roles.map((role:any) => ({value:role.id,label:role.nombre}));
        
        const form = useForm({
            initialValues:{
                nombre:'',
                correo:'',
                contrasena:'',
                area:0,
                rol:0,
                oficina:0,
            },
            // validationRules: {
            // nombre: (value) => value.trim().length > 5,
            // correo: (value) => value.trim().length > 6,
            // contrasena: (value) => value.trim().length >= 6,
            // // area: (value) => value.trim().length > 1,
            // // rol: (value) => value.trim().length > 1,
            // // oficina: (value) => value.trim().length > 1,
            // },
            
            
        });

    return (
        <form onSubmit={form.onSubmit(async(values)=>{
            try {       
                const { createNewUser } = API.UserApi;
                const {data:newUser} = await createNewUser(values);
                setNewData(newUser.data,'Usuarios')
                removeError();
                setOpenedModal(false);
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