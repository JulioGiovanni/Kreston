import React from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../../context/auth';
import { PreguntasProvider } from '../../context/Preguntas';
import { ErrorsProvider } from '../../context/Errors';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}
const theme = createTheme({
  /** Your theme override here */
});

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <ModalsProvider>
              <AuthProvider>
                <PreguntasProvider>
                  <ErrorsProvider>
                    <Notifications />
                    {children}
                    <ReactQueryDevtools />
                  </ErrorsProvider>
                </PreguntasProvider>
              </AuthProvider>
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
