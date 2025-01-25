import * as React from 'react'
import { Link, Outlet, createRootRoute, rootRouteId, useMatch, useParams, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavBarComponent from './../components/navBarComponent'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  const match = useMatch({ from: '/register', shouldThrow: false })

  if (match) {
    console.log('actually in register')
  }

  return (
    <>
      <NavBarComponent />
      <Outlet />
    </>
  )
}
