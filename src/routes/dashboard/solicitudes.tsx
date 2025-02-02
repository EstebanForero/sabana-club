import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { GetAllRequests } from '../../backend/request'

export const Route = createFileRoute('/dashboard/solicitudes')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: allRequests } = useQuery({
    queryKey: ['all_requests'],
    queryFn: GetAllRequests
  })

  if (!allRequests) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  return <div>

  </div>
}
