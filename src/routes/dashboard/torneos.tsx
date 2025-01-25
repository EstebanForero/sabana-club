import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/torneos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/torneos"!</div>
}
