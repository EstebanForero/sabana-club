import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../backend/user'

export const Route = createFileRoute('/user_dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data: currentUser } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  })

  return <div>

  </div>
}
