import { Combobox, TextInput, useCombobox } from '@mantine/core';
import React, { useState } from 'react';
import { IField, IOptions } from '../../interfaces/form.interface';

const CustomSelect = (field: any, ...other: any) => {
  const combobox = useCombobox();
  const [value, setValue] = useState('');

  const selectOptions = field!.options!.map((option: any) => {
    <Combobox.Option key={option.value} value={option.value}>
      {option.label}
    </Combobox.Option>;
  });

  return (
    <Combobox
      onOptionSubmit={(value) => {
        setValue(value);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          key={`frm-${field.name}`}
          label={field.label}
          description={field.description}
          value={value}
          placeholder={field.placeholder}
          required={field.required}
          {...other}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{selectOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default CustomSelect;
