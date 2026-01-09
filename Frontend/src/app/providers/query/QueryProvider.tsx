import { QueryClient, QueryClientProvider, type QueryClientConfig } from "@tanstack/react-query";

import type { ReactNode } from "react";

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient(queryClientOptions);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
