import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import Providers from '../components/providers/providers';

import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import { FC } from 'react';

interface AppProps {
  Component: any;
  pageProps: any;
  colorScheme: any;
}
const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Kreston</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/images/KRESTON-CSM-LOGO.png" />
      </Head>
      <Providers>
        {router.pathname.includes('auth') ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Providers>
    </>
  );
};

export default App;
