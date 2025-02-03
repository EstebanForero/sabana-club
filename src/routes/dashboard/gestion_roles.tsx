import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/gestion_roles')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/gestion_roles"!</div>
}
