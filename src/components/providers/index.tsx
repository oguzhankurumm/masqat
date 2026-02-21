"use client";

import { QueryClient, QueryClientProvider, Query } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useState } from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 6, // 6 hours
        staleTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false, // QR users hate jitter
        refetchOnReconnect: true,
        retry: 2,
        networkMode: "online", // Allows offline queries to pause or resolve based on cache
      },
    },
  }));

  const isBrowser = typeof window !== "undefined";

  const [persister] = useState(() => {
    if (!isBrowser) return null;
    return createSyncStoragePersister({
      storage: window.localStorage,
      key: "MASQ_QUERY_CACHE_V1",
    });
  });

  if (!persister) {
    // Render without persistence fallback while initializing (prevents hydration mismatch)
    // Server-side rendering will use this path, and still needs QueryClientProvider
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 6, // 6 hours matching gcTime
        dehydrateOptions: {
          shouldDehydrateQuery: (query: Query) => {
            // we only want to persist successful queries 
            return query.state.status === 'success';
          },
        },
      }}
    >
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
