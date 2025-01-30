import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getTournamentsOfCurrentUser } from '../../backend/tournament'
import UserSelectionComponent from '../../components/userSelectionComponent'

export const Route = createFileRoute('/user_dashboard/tournament')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: userTournaments } = useQuery({
    queryKey: ["this_tournament"],
    queryFn: getTournamentsOfCurrentUser
  })

  return <div>
    <UserSelectionComponent onChangeUser={(user_id) => console.log('user selected: ', user_id)} />
    <h1 className='text-2xl font-bold mb-8'>Los torneos en los que has participado</h1>
    {userTournaments?.map(userTournament => <div key={userTournament.id_torneo} className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
      <h2 className='font-semibold text-xl mb-6'>{userTournament.nombre}</h2>
      <p>Tu puesto en el torneo: {userTournament.puesto}</p>
    </div>)}
  </div>
}
