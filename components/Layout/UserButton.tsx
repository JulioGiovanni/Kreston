import { forwardRef, Ref } from 'react';
import { ChevronRightIcon } from '@modulz/radix-icons';
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';

interface Props {
  image?: string | undefined, 
  initials?: string | undefined, 
  name: string | undefined, 
  email:string | undefined, 
  icon?:any
}

const UserButton = forwardRef(
  ({ image, name, email, icon,initials, ...others }: Props, ref:Ref<HTMLButtonElement>) => (
    
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        {image ? (<Avatar src={image} radius="xl" />) : <Avatar  radius="xl">{initials}</Avatar>}
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
            {/* Nombre de prueba */}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
            {/* email@email.com */}
          </Text>
        </div>

        {icon || <ChevronRightIcon />}
      </Group>
    </UnstyledButton>
  )
);

export default UserButton;