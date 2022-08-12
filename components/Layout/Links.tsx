
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavLink, useMantineTheme } from '@mantine/core'

import { AdminLinks } from '../../utils/ArrayLinks'
import { IAccordionLinks } from '../../interfaces/links.interface';



const Links = () => {
    const router = useRouter()

    const generalStyle = {
        borderRadius: '50px',
        margin: '5px 0',
    }

  return (
    <>            
        {   
            AdminLinks.map((link) => {
            return(
                link.accordion ?
                <NavLink
                    key={link.link}
                    label={link.text}
                    icon={<link.Icon  />}
                    childrenOffset={28}
                    active={router.pathname.includes(link.link!)}
                    defaultOpened={router.pathname.includes(link.link!)}
                        variant="light"
                        sx={generalStyle}
                >
                    {link.accordionLinks!.map((l:IAccordionLinks) => {
                        return(
                            <Link href={l.link} passHref>
                                <NavLink
                                key={l.link} 
                                label={l.text} 
                                active={router.pathname == l.link}
                                variant="filled"
                                sx={{
                                    borderRadius: '50px',
                                }}
                                />
                            </Link>
                        )}
                    )}

                </NavLink>
                :
                <Link href={link.link!} passHref key={link.link}>
                    <NavLink
                        key={link.link}
                        label={link.text}
                        icon={<link.Icon  />}
                        active={router.pathname === link.link}
                        variant="filled"
                        sx={generalStyle}
                    >
                    </NavLink>
                </Link>

                )
            })
        }
    </>
  )
}

export default Links