
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Accordion, AccordionItem, Button, useMantineTheme } from '@mantine/core'

import { AdminLinks } from '../../utils/ArrayLinks'

const Links = () => {
    const router = useRouter()
    const theme = useMantineTheme()
  return (
    <>            
        {   
            AdminLinks.map((link) => {
            return(
                link.accordion ?
                <Accordion
                    key={link.text +1}
                    initialItem={router.pathname.includes('/consultas') ? 0 : -1}
                    icon={<link.Icon/>}  
                    styles={{
                        label:{color: theme.colors.blue[2]},
                        control:{
                            padding: '0.5rem',
                            display: 'flex',
                            borderRadius: '50px',
                            ':hover':{
                                backgroundColor: theme.colors.blue[4],
                            }
                        },
                        icon:{color: theme.colors.blue[5], marginLeft: '0.5rem'},
                        item:{border: 'none'},
                    
                    }}
                    disableIconRotation
                >
                    <AccordionItem label={link.text} color={theme.primaryColor}>
                        {link.accordionLinks.map((l:any) => {
                            return(
                                <Link href={l.link} passHref 
                                    key={l.link}
                                // style={style && style} 
                                >
                                    <Button 
                                        variant='subtle' 
                                        fullWidth
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            borderRadius: '50px',
                                            margin:'10px 0',
                                            backgroundColor: router.pathname === l.link ? theme.colors.indigo[5] : '',
                                            color: router.pathname === l.link ? 'white' : '',
                                            ':hover': {
                                                backgroundColor: router.pathname === l.link ? theme.colors.indigo[4] : '',
                                                color: router.pathname === l.link ? 'white' : '',
                                            }
                                        }}
                                    >
                                        {l.text}
                                    </Button>
                                </Link>
                            )
                        })}
                    </AccordionItem>
                </Accordion> 
                :
                <Link href={link.link} passHref 
                    key={link.link}
                >
                     <Button 
                        variant='subtle'
                        fullWidth
                        leftIcon={<link.Icon/>}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: '50px',
                            margin:'10px 0',
                            backgroundColor: router.pathname === link.link ? theme.colors.indigo[5] : '',
                            color: router.pathname === link.link ? 'white' : '',
                            ':hover': {
                                backgroundColor: router.pathname === link.link ? theme.colors.indigo[4] : '',
                                color: router.pathname === link.link ? 'white' : '',
                            }
                        }}
                    >
                        {link.text}
                    </Button>
                </Link>
                )
            })
        }
    </>
  )
}

export default Links