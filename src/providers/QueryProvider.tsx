"use client";
import { useAuth } from "@/context/AuthContext";
// import { useAuth } from "@/context/AuthContext";
import {
  MutationCache,
  MutationKey,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { refreshToken } = useAuth();
  const handleRefresh = async (key?: QueryKey | MutationKey) => {
    await refreshToken();
    if (key) {
      queryClient.refetchQueries({
        queryKey: key,
      });
    }
  };

  const [queryClient, setQueryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error: any, query) => {
            if (error) {
              const message = error?.response?.data.error;
              if (message === "token-expired") {
                await handleRefresh(query?.queryKey);
              }
            }
          },
        }),

        mutationCache: new MutationCache({
          onError: async (error: any, _variables, _context, mutation) => {
            if (error) {
              const message = error?.response?.data?.error;
              if (message === "token-expired") {
                await handleRefresh();
                mutation.execute({
                  error,
                  _variables,
                  _context,
                  mutation,
                });
              }
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
