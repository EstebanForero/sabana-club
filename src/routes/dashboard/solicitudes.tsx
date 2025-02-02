import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { GetAllRequests } from '../../backend/request'
import RequestComponent from '../../components/requestComponent'

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

  return <div className='flex-row flex gap-4'>
    {allRequests.map(request => <RequestComponent request={request} key={request.request_id} />)}
  </div>
}
