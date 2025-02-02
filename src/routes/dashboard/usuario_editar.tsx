import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/usuario_editar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/usuario_editar"!</div>
}
