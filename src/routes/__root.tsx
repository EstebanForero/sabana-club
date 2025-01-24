import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-4 text-lg items-center bg-gray-950">
        <h1 className='font-bold mr-8'>Club Sabana</h1>
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to="/register"
          activeProps={{
            className: 'font-bold',
          }}
          className='bg-gray-900 px-2 py-1 rounded-xl hover:bg-gray-800 transition-colors duration-100'
        >
          Register
        </Link>
        <Link
          to="/login"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Login
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
