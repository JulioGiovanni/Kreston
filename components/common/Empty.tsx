import React from 'react';
import { Empty } from 'antd';
import { Text } from '@mantine/core';

const EmptyComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Empty
        description={
          <Text fz={30} c={'white'}>
            No hay datos
          </Text>
        }
        imageStyle={{
          height: 500,
        }}
      />
    </div>
  );
};

export default EmptyComponent;
