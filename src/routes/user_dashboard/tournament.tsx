import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user_dashboard/tournament')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user_dashboard/tournament"!</div>
}
