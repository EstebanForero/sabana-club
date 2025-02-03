import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../backend/user'
import UserRoleManagement from '../../components/userRoleManagement'

export const Route = createFileRoute('/dashboard/gestion_roles')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["all_users"],
    queryFn: getAllUsers
  })

  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>
  }

  if (!allUsers) {
    return <span className="loading loading-spinner loading-xl"></span>
  }

  return <div className='min-h-screen'>
    <h1 className='text-xl font-semibold mb-4'>Admins</h1>
    <div className='flex flex-row flex-wrap gap-4'>
      {allUsers.filter(user => user.nombre_rol == 'Admin').map(user => <UserRoleManagement userInfo={user} key={user.id_persona} />)}
    </div>
    <h1 className='text-xl font-semibold mb-4 mt-6'>Entrenadores</h1>
    <div className='flex flex-row flex-wrap gap-4'>
      {allUsers.filter(user => user.nombre_rol == 'Entrenador').map(user => <UserRoleManagement userInfo={user} key={user.id_persona} />)}
    </div>
    <h1 className='text-xl font-semibold mb-4 mt-6'>Usuarios</h1>
    <div className='flex flex-row flex-wrap gap-4'>
      {allUsers.filter(user => user.nombre_rol == 'Usuario').map(user => <UserRoleManagement userInfo={user} key={user.id_persona} />)}
    </div>
  </div>
}
