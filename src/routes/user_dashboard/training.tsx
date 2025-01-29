import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user_dashboard/training')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user_dashboard/training"!</div>
}
