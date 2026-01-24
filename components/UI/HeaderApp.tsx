import { Button, TextInput, Title } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IconSearch } from '@tabler/icons-react';
interface Props {
  title: string;
  buttonTitle: string;
  Icon?: any;
  input?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
  openModalFunction: () => void;
  searchFunction?: (nombre: string, setSearchValue: any) => void;
  loading: boolean;
}

const HeaderApp = (props: Props) => {
  const { register, getValues } = useForm({
    defaultValues: {
      nombre: props.searchValue,
    },
  });

  const searchOnBlur = () => {
    const searchValue = getValues('nombre');
    props.searchFunction!(searchValue!, props.setSearchValue!);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title order={2}>{props.title}: </Title>
      {props.input && (
        <TextInput
          placeholder={props.searchPlaceholder}
          label={props.searchLabel}
          leftSection={<IconSearch />}
          {...register('nombre')}
          onBlur={searchOnBlur}
        />
      )}
      <Button
        variant="outline"
        loading={props.loading}
        radius={'md'}
        leftSection={props.Icon ? <props.Icon /> : null}
        onClick={props.openModalFunction}
      >
        {props.buttonTitle}
      </Button>
    </div>
  );
};

export default HeaderApp;
