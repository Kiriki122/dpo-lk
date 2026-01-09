import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";

const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient(queryClientOptions);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
