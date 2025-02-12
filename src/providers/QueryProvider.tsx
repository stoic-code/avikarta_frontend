'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient=new QueryClient({ defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },})
const QueryProvider=({children}:{children:ReactNode})=>{

    return <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>


}

export default QueryProvider;