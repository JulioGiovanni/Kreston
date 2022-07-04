import { ActionIcon, Anchor, Button, Group, Popover, TextInput, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link'
import React from 'react'

const EditUser = ({opened,setOpened,EditIcon,form,onCancel,user,EyeIcon}:any) => {

    const theme = useMantineTheme();
    const isMobile = useMediaQuery('(max-width: 755px');

  return (
    <Group>
    {/* Edit Component */}

    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      placement="end"
      withCloseButton
      title="Editar usuario"
      transition="pop-top-right"
      target={
        <ActionIcon
          variant={theme.colorScheme === 'dark' ? 'hover' : 'light'}
          onClick={() => setOpened((o:boolean) => !o)}
        >
          <EditIcon />
        </ActionIcon>
      }
    >
      <form 
        // onSubmit={form.onSubmit(onSubmit)}
      >
        <TextInput
          required
          label="Name"
          placeholder="Name"
          style={{ minWidth: isMobile ? 220 : 300 }}
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          error={form.errors.name}
          variant="default"
        />

        <TextInput
          required
          label="Email"
          placeholder="Email"
          style={{ minWidth: isMobile ? 220 : 300, marginTop: 15 }}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors.email}
          variant="default"
        />

        <Group position="apart" style={{ marginTop: 15 }}>
          <Anchor component="button" color="gray" size="sm" onClick={()=>onCancel}>
            Cancel
          </Anchor>
          <Button type="submit" size="sm">
            Save
          </Button>
        </Group>
      </form>
    </Popover>

    {/* End Edit Component */}

    {/* Delete Component */}
    <Link href={`/usuarios/${user.id}`} passHref> 
      <ActionIcon 
        variant={theme.colorScheme === 'dark' ? 'hover' : 'light'}
        // component={Link} 
        >
        <EyeIcon />
      </ActionIcon>
    </Link>
    {/* End Delete Component */}

  </Group>
  )
}

export default EditUser