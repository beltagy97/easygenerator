import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import router from "./Router";
import { MantineProvider, createTheme } from '@mantine/core';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.48,
});


export default function App() {

  return (
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {ENV === 'local' ? <ReactQueryDevtools initialIsOpen={false} />: <></>}
        </QueryClientProvider>
      </MantineProvider>
    </React.StrictMode>
  )
}
