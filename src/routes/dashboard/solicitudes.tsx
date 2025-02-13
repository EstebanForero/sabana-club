import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { GetAllRequests } from '../../backend/request'
import RequestComponent from '../../components/requestComponent'

export const Route = createFileRoute('/dashboard/solicitudes')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: allRequests, isLoading } = useQuery({
    queryKey: ['all_requests'],
    queryFn: GetAllRequests
  })

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!allRequests || allRequests.length == 0) {
    console.log("requests is empty")
    return <h1 className='text-xl'>No hay solicitudes por el momento</h1>
  }

  return <div className='min-h-screen'>
    <h1 className='text-xl font-semibold mb-4'>Solicitudes por aprovar</h1>
    <div className='flex-row flex gap-4'>
      {allRequests.filter(request => !request.completed).map(request => <RequestComponent request={request} key={request.request_id} />)}
    </div>
    <h1 className='text-xl font-semibold my-4'>Solicitudes aprovadas</h1>
    <div className='flex-row flex gap-4'>
      {allRequests.filter(request => request.completed).map(request => <RequestComponent request={request} key={request.request_id} />)}
    </div>
  </div>
}
