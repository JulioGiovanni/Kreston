import { forwardRef, LegacyRef } from 'react';
import { Avatar, Group,Text } from "@mantine/core";


interface ItemProps {
  image:any,
  label:any,
  nombre:string,
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, nombre, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" color="dimmed">
              {nombre}
            </Text>
          </div>
        </Group>
      </div>
    )}
  
);



  export default AutoCompleteItem;


