import { createFileRoute, Outlet } from '@tanstack/react-router'
import NavBarDashboard from './../components/navBarDashboard'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <NavBarDashboard />
      <Outlet />
    </div>
  )
}
