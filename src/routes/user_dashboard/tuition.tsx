import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getRecentTuitionForCurrentUser, getTuitionsForCurrentUser } from '../../backend/tuition'

export const Route = createFileRoute('/user_dashboard/tuition')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: userTuitions } = useQuery({
    queryKey: ["this_tuitions"],
    queryFn: getTuitionsForCurrentUser
  })

  const { data: userMostRecentTuition } = useQuery({
    queryKey: ["this_recent_tuition"],
    queryFn: getRecentTuitionForCurrentUser
  })

  return <div>
    <h1 className='text-2xl font-bold mb-8'>Historial de pagos de matricula</h1>
    {userTuitions?.map((userTuition, index) => <div key={index} className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
      <h2 className='font-semibold text-xl mb-6'>Matricula</h2>
      <p>Monto pagado: {userTuition.monto_usd} USD</p>
      <p>Fecha de pago: {userTuition.fecha_inscripccion}</p>
    </div>)}

    <h1 className='text-2xl font-bold mb-8 mt-8'>Tu pago de matricula mas actual es</h1>

    {userMostRecentTuition ?
      <div className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
        <h2 className='font-semibold text-xl mb-6'>Matricula</h2>
        <p>Monto pagado: {userMostRecentTuition.monto_usd} USD</p>
        <p>Fecha de pago: {userMostRecentTuition.fecha_inscripccion}</p>
      </div> : <p>Loading ...</p>}

  </div>
}
