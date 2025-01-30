import * as React from 'react'
import { Link, Outlet, createRootRoute, rootRouteId, useMatch, useParams, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavBarComponent from './../components/navBarComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {

  const match = useMatch({ from: '/register', shouldThrow: false })

  if (match) {
    console.log('actually in register')
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBarComponent />
        <Outlet />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
