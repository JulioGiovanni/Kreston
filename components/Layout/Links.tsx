import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavLink, Text, useMantineTheme } from '@mantine/core';

import { AdminLinks } from '../../utils/ArrayLinks';
import { IAccordionLinks } from '../../interfaces/links.interface';
import { useColorScheme } from '@mantine/hooks';

const Links = () => {
  const router = useRouter();
  //   const colorScheme = useColorScheme();
  const generalStyle = {
    borderRadius: '10px',
    margin: '5px 0',
    // backgroundColor: colorScheme == 'dark' ? 'gray' : '#1c7ed6',
  };

  return (
    <>
      {AdminLinks.map((link) => {
        return link.accordion ? (
          <NavLink
            key={link.link}
            label={
              <Text weight={500} size="md">
                {link.text}
              </Text>
            }
            icon={<link.Icon size={18} />}
            childrenOffset={28}
            active={router.pathname.includes(link.link!)}
            defaultOpened={router.pathname.includes(link.link!)}
            variant="light"
            sx={generalStyle}
          >
            {link.accordionLinks!.map((l: IAccordionLinks) => {
              return (
                <Link href={l.link} passHref>
                  <NavLink
                    key={l.link}
                    label={<Text weight={500}>{l.text}</Text>}
                    active={router.pathname == l.link}
                    variant="filled"
                    sx={{ borderRadius: '10px' }}
                  />
                </Link>
              );
            })}
          </NavLink>
        ) : (
          <Link href={link.link!} passHref key={link.link}>
            <NavLink
              key={link.link}
              label={
                <Text weight={500} size="md">
                  {link.text}
                </Text>
              }
              icon={<link.Icon size={18} />}
              active={router.pathname === link.link}
              variant="filled"
              sx={generalStyle}
            ></NavLink>
          </Link>
        );
      })}
    </>
  );
};

export default Links;
