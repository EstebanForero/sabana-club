import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/solicitudes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/solicitudes"!</div>
}
