import { ReactNode } from 'react';

export interface IField {
  name: string;
  label: string;
  type: FieldTypes;
  defaultValue: string | number | string[] | number[] | Date | undefined;
  placeholder?: string;
  required?: boolean;
  options?: IOptions[];
  searchable?: boolean;
  nothingFound?: string;
  clearable?: boolean;
  groupBy?: string;
  description?: string;
  maxValues?: number;
  createNew?: boolean;
  createNewModal?: any;
}

export interface IButton {
  type: ButtonTypes;
  label: string;
  className?: string;
  style?: any;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  Icon?: any;
}

export interface IOptions {
  value: string;
  label: string;
}

export const enum FieldTypes {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  DATE = 'date',
}

export const enum ButtonTypes {
  SUBMIT = 'submit',
  BUTTON = 'button',
  RESET = 'reset',
}
