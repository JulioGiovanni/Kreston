import React from 'react';
import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from '@mantine/core';
import { Sun, Moon } from 'tabler-icons-react';

export function SegmentedToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  
  return (
    <Group position='center' m={5} >
      <SegmentedControl
        value={colorScheme}
        onChange={((val) => toggleColorScheme(val as typeof colorScheme))}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}