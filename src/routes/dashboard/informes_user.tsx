import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/informes_user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/informes_user"!</div>
}
