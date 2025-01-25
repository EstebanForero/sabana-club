import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/matricula')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/matricula"!</div>
}
