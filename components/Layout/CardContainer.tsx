import { Card, ScrollArea } from '@mantine/core'
import React, { FC } from 'react'

const CardContainer: FC = ({children}) => {
  return (
    <Card style={{
      height: '90%',
    }}>
      <ScrollArea>
        {children}
      </ScrollArea>
    </Card>
  )
}

export default CardContainer