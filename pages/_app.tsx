import { useState } from 'react';
import { AppProps } from 'next/app';
import { GetServerSidePropsContext } from 'next';
import { getCookie, setCookies } from 'cookies-next';
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AuthProvider } from '../context/auth/AuthProvider';
import { ErrorsProvider } from '../context/Errors';
import { DataProvider } from '../context/Data';

export default function App(props: any & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Kreston</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
        <link rel="shortcut icon" href="/images/KRESTON-CSM-LOGO.png" />
      </Head>
    <SessionProvider >

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <AuthProvider>
            <DataProvider>
              <NotificationsProvider>
                <ErrorsProvider>
                  <Component {...pageProps} />
                </ErrorsProvider>
              </NotificationsProvider>
            </DataProvider>
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: any) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});


