import React, { FC } from 'react';
//React Hook Form
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

//Interfaces
import { IButton, IField } from '../../interfaces/form.interface';
//Mantine
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useGenericMutation } from '../../ReactQuery';
import { FiPlus } from 'react-icons/fi';

interface formGeneratorProps {
  fields: IField[];
  formSchema: any;
  buttons: IButton[];
  loading: boolean;
  setOpenedModal?: any;
  mutationInterface: any;
  mutationFn: (data: any) => Promise<any>;
  mutationKey: string;
}

const fieldGenerator = (field: IField, form: any) => {
  const keyName = `frm-${field.name}`;
  switch (field.type) {
    case 'text':
      return (
        <Controller
          key={keyName}
          name={field.name}
          control={form.control}
          render={({ field: renderField }) => (
            <TextInput
              key={keyName}
              label={field.label}
              description={field.description}
              placeholder={field.placeholder}
              required={field.required}
              error={form.formState.errors[field.name]?.message}
              {...renderField}
            />
          )}
        />
      );
    case 'number':
      return (
        <Controller
          key={keyName}
          name={field.name}
          control={form.control}
          render={({ field: renderField }) => (
            <NumberInput
              key={keyName}
              hideControls
              description={field.description}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              error={form.formState.errors[field.name]?.message}
              {...renderField}
            />
          )}
        />
      );
    case 'select':
      if (field.createNew) {
        return (
          <div
            key={keyName}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
          >
            <Controller
              key={keyName}
              name={field.name}
              control={form.control}
              render={({ field: renderField }) => (
                <Select
                  checkIconPosition="left"
                  key={keyName}
                  label={field.label}
                  placeholder={field.placeholder}
                  data={field.options!}
                  searchable={field.searchable}
                  description={field.description}
                  withAsterisk={field.required}
                  nothingFoundMessage={
                    field.nothingFound ? field.nothingFound : 'No se encontraron resultados'
                  }
                  required={field.required}
                  error={form.formState.errors[field.name]?.message}
                  {...renderField}
                />
              )}
            />
            <Button color="green" onClick={field.createNewModal}>
              <FiPlus />
            </Button>
          </div>
        );
      }
      return (
        <Controller
          key={keyName}
          name={field.name}
          control={form.control}
          render={({ field: renderField }) => (
            <Select
              checkIconPosition="left"
              key={keyName}
              label={field.label}
              placeholder={field.placeholder}
              data={field.options!}
              searchable={field.searchable}
              description={field.description}
              withAsterisk={field.required}
              nothingFoundMessage={
                field.nothingFound ? field.nothingFound : 'No se encontraron resultados'
              }
              required={field.required}
              error={form.formState.errors[field.name]?.message}
              {...renderField}
            />
          )}
        />
      );
    case 'multiselect':
      return (
        <Controller
          key={keyName}
          name={field.name}
          control={form.control}
          render={({ field: renderField }) => (
            <MultiSelect
              checkIconPosition="left"
              key={keyName}
              label={field.label}
              placeholder={field.placeholder}
              data={field.options!}
              description={field.description}
              searchable={field.searchable}
              withAsterisk={field.required}
              nothingFoundMessage={
                field.nothingFound ? field.nothingFound : 'No se encontraron resultados'
              }
              required={field.required}
              error={form.formState.errors[field.name]?.message}
              {...renderField}
            />
          )}
        />
      );
    case 'date':
      return (
        <Controller
          key={keyName}
          name={field.name}
          control={form.control}
          render={({ field: renderField }) => (
            <DatePickerInput
              key={keyName}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              description={field.description}
              error={form.formState.errors[field.name]?.message}
              {...renderField}
            />
          )}
        />
      );
    default:
      return (
        <Controller
          key={keyName}
          name={field.name}
          control={form.control}
          render={({ field: renderField }) => (
            <TextInput
              key={keyName}
              label={field.label}
              description={field.description}
              placeholder={field.placeholder}
              required={field.required}
              error={form.formState.errors[field.name]?.message}
              {...renderField}
            />
          )}
        />
      );
  }
};

const buttonGenerator = (button: IButton, isLoading: boolean) => {
  switch (button.type) {
    case 'submit':
      return (
        <Button
          loading={isLoading}
          key={button.label}
          color="green"
          type={button.type}
          disabled={button.disabled}
        >
          {button.label}
        </Button>
      );
    case 'button':
      return (
        <Button
          leftSection={button.Icon ? <button.Icon /> : null}
          loading={isLoading}
          key={button.label}
          type={button.type}
          disabled={button.disabled}
        >
          {button.label}
        </Button>
      );
    case 'reset':
      return (
        <Button
          leftSection={button.Icon ? <button.Icon /> : null}
          loading={isLoading}
          key={button.label}
          color="red"
          type={button.type}
          disabled={button.disabled}
        >
          {button.label}
        </Button>
      );
    default:
      return (
        <Button
          leftSection={button.Icon ? <button.Icon /> : null}
          loading={isLoading}
          key={button.label}
          type={button.type}
          disabled={button.disabled}
        >
          {button.label}
        </Button>
      );
  }
};

export const FormGenerator: FC<formGeneratorProps> = ({
  formSchema,
  fields,
  buttons,
  loading,
  setOpenedModal,
  mutationInterface,
  mutationFn,
  mutationKey,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: field.defaultValue,
      };
    }, {}),
  });

  const { mutate, isLoading, isError, error } = useGenericMutation<typeof mutationInterface>(
    (newData: typeof mutationInterface) => mutationFn(newData),
    mutationKey,
    form
  );
  return (
    <form
      onSubmit={form.handleSubmit(() => {
        mutate(form.getValues());
        if (!isError) {
          form.reset();
          if (setOpenedModal) {
            setOpenedModal(false);
          }
        }
      })}
    >
      <LoadingOverlay visible={loading!} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {fields.map((field) => {
          return fieldGenerator(field, form);
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {buttons.map((button) => {
          return buttonGenerator(button, isLoading);
        })}
      </div>
    </form>
  );
};
