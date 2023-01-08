import { Button, Title } from '@mantine/core';
import React from 'react';
interface Props {
  title: string;
  openModalFunction: () => void;
  buttonTitle: string;
  Icon?: any;
}

const HeaderApp = (props: Props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title order={2}>{props.title}: </Title>
      <Button leftIcon={props.Icon ? <props.Icon /> : null} onClick={props.openModalFunction}>
        {props.buttonTitle}
      </Button>
    </div>
  );
};

export default HeaderApp;
