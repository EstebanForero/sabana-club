import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/informes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/informes"!</div>
}
