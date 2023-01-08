import { Title } from '@mantine/core';
import React from 'react';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Title order={3}>Cargando...</Title>
    </div>
  );
};

export default Loading;
