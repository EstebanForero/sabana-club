import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getTournamentsOfCurrentUser } from '../../backend/tournament'

export const Route = createFileRoute('/user_dashboard/tournament')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: userTournaments } = useQuery({
    queryKey: ["this_user"],
    queryFn: getTournamentsOfCurrentUser
  })

  return <div>Hello "/user_dashboard/tournament"!</div>
}
