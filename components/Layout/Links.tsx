import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavLink, Text, Tooltip } from '@mantine/core';

import { AdminLinks } from '../../utils/ArrayLinks';
import { IAccordionLinks } from '../../interfaces/links.interface';

const Links = () => {
  const router = useRouter();
  const generalStyle = {
    borderRadius: '10px',
    margin: '5px 0',
    // backgroundColor: colorScheme == 'dark' ? 'gray' : '#1c7ed6',
  };

  return (
    <>
      {AdminLinks.map((link) => {
        return link.accordion ? (
          link.tooltip ? (
            <Tooltip label={link.tooltipText} key={link.link}>
              {generateAccordionLinks(link, router, generalStyle)}
            </Tooltip>
          ) : (
            generateAccordionLinks(link, router, generalStyle)
          )
        ) : (
          generateNavLinks(link, router, generalStyle)
        );
      })}
    </>
  );
};

export default Links;

const generateNavLinks = (link: any, router: any, generalStyle: any) => {
  return (
    <NavLink
      component={Link}
      href={link.link!}
      key={link.link}
      label={
        <Text size="md" fw={500}>
          {link.text}
        </Text>
      }
      leftSection={<link.Icon size={18} />}
      active={router.pathname.includes(link.link!)}
      variant="filled"
      style={generalStyle}
    />
  );
};

const generateAccordionLinks = (link: any, router: any, generalStyle: any, size?: string) => {
  return (
    <NavLink
      key={link.link}
      label={
        <Text fw={500} size="md">
          {link.text}
        </Text>
      }
      leftSection={<link.Icon size={18} />}
      childrenOffset={28}
      active={router.pathname.includes(link.link!)}
      defaultOpened={router.pathname.includes(link.link!)}
      variant="light"
      style={generalStyle}
    >
      {link.accordionLinks!.map((l: IAccordionLinks) => {
        return (
          <NavLink
            component={Link}
            href={l.link}
            key={l.link}
            label={<Text fw={500}>{l.text}</Text>}
            active={router.pathname == l.link}
            variant="filled"
            style={{ borderRadius: '10px' }}
          />
        );
      })}
    </NavLink>
  );
};
