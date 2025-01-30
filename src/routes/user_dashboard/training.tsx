import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getTrainingsForCurrentUser } from '../../backend/training'

export const Route = createFileRoute('/user_dashboard/training')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data: userTrainings } = useQuery({
    queryKey: ["this_trainings"],
    queryFn: getTrainingsForCurrentUser
  })

  return <div>
    <h1 className='text-2xl font-bold mb-8'>Los torneos en los que has participado</h1>
    {userTrainings?.map(userTraining => <div key={userTraining.id_entrenamiento} className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
      <h2 className='font-semibold text-xl mb-6'>Nombre de el entrenamiento: {userTraining.nombre_entrenamiento}</h2>
      <p>Duracion de el entrenamiento: {userTraining.tiempo_minutos} minutos</p>
    </div>)}
  </div>
}
