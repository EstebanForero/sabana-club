import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/entrenamientos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/entrenamientos"!</div>
}
