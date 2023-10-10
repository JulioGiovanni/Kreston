import { forwardRef, Ref } from 'react';
import { ChevronRightIcon } from '@modulz/radix-icons';
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import cx from 'clsx';
import classes from '../../styles/UserButton.module.css';
interface Props {
  image?: string | undefined;
  initials?: string | undefined;
  name: string | undefined;
  email: string | undefined;
  icon?: any;
}

const UserButton = forwardRef(
  ({ image, name, email, icon, initials, ...others }: Props, ref: Ref<HTMLButtonElement>) => (
    <UnstyledButton ref={ref} className={cx(classes.user)} {...others}>
      <Group>
        {image ? <Avatar src={image} radius="xl" /> : <Avatar radius="xl">{initials}</Avatar>}
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <ChevronRightIcon />}
      </Group>
    </UnstyledButton>
  )
);

export default UserButton;
