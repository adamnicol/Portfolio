import { DefaultOptions, QueryClient } from "react-query";

export { QueryClientProvider } from "react-query";

const options: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: options,
});
