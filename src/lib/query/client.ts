import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/errors";
import { clearToken } from "@/lib/auth/token";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
            return false;
          }
          return failureCount < 1;
        },
      },
      mutations: {
        onError: (error) => {
          if (error instanceof ApiError && error.status === 401) {
            clearToken();
          }
        },
      },
    },
  });
}
