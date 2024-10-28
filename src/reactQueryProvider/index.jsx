import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef } from "react";
export const ReactQueryProvider = ({ children }) => {
  const rqConfig = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowsFocus: false,
          retry: 0,
          staleTime: 15 * 1000,
        },
      },
    })
  );
  //   const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={rqConfig.current}>
      {/* <QueryClientProvider client={queryClient}> */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
