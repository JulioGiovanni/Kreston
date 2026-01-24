import { Button, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { FC } from 'react';
import { IUsuario } from '../../interfaces';
import { useForm } from '@mantine/form';

interface EditUserProps {
  Usuario: IUsuario;
  openModal: Boolean;
  setOpenModal: (openModal: Boolean) => void;
}

const form = useForm({
  initialValues: {},
});

const onSubmit = async (values: any) => {
  try {
    console.log(values);
  } catch {
    console.log('error');
  }
};

const EditUser: FC<EditUserProps> = ({}) => {
  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}></form>
    </>
  );
};

export default EditUser;
