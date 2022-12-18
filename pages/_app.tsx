'use client';
import { useState } from 'react';
import { getCookie, setCookies } from 'cookies-next';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ErrorsProvider } from '../context/Errors';
import { PreguntasProvider } from '../context/Preguntas';
import { AuthProvider } from '../context/auth';

interface Props {
  Component: any;
  pageProps: any;
  colorScheme: any;
}
export default function App(props) {
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
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap"
            rel="stylesheet"
          /> */}
      </Head>
      <SessionProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <AuthProvider>
              <PreguntasProvider>
                <NotificationsProvider>
                  <ErrorsProvider>
                    <Component {...pageProps} />
                  </ErrorsProvider>
                </NotificationsProvider>
              </PreguntasProvider>
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
