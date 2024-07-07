import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider.tsx'

import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider basepath='weight-scale' router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
