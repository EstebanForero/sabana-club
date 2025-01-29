import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user_dashboard/tuition')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user_dashboard/tuition"!</div>
}
