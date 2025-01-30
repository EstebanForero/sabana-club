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

  const match_dashboard = useMatch({ from: '/dashboard', shouldThrow: false })
  const match_user_dashboard = useMatch({ from: '/user_dashboard', shouldThrow: false })

  if (match_dashboard) {
    console.log('actually in register')
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {(match_dashboard || match_user_dashboard) ? <div></div> : <NavBarComponent />}
        <Outlet />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
