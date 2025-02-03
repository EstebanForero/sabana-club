import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import NavBarDashboard, { LinkData } from './../components/navBarDashboard'
import { FaCommentDollar, FaCreditCard, FaFileAlt, FaHome, FaSignOutAlt, FaTeamspeak, FaTrophy, FaUser, FaUserEdit } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'
import { isAuthenticated } from './../backend/auth'
import { currentUserRol } from '../backend/user'
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!await isAuthenticated()) {
      console.log("trowing redirect")
      throw redirect({
        to: '/login'
      })
    }

    const user_rol = await currentUserRol()
    if (user_rol == 'Usuario') {
      throw redirect({
        to: '/user_dashboard'
      })
    }

    console.log("user authenticated")
  }
})

const links: LinkData[] = [
  { linkText: 'Inicio', to: '/dashboard', icon: <FaHome className="inline ml-2" /> },
  { linkText: 'Entrenamientos', to: '/dashboard/entrenamientos', icon: <GiTennisRacket className="inline ml-2" /> },
  { linkText: 'Torneos', to: '/dashboard/torneos', icon: <FaTrophy className="inline ml-2" /> },
  { linkText: 'Informes', to: '/dashboard/informes', icon: <FaFileAlt className="inline ml-2" /> },
  { linkText: 'Matricula', to: '/dashboard/matricula', icon: <FaCreditCard className="inline ml-2" /> },
  { linkText: 'Usuario', to: '/dashboard/usuarios', icon: <FaUserEdit className="inline ml-2" /> },
  { linkText: 'Perfil', to: '/dashboard/perfil', icon: <FaUser className="inline ml-2" /> },
  { linkText: 'Interfaz usuario', to: '/user_dashboard', icon: <FaUser className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

const adminLinks: LinkData[] = [
  { linkText: 'Solicitudes', to: '/dashboard/solicitudes', icon: <FaCommentDollar className="inline ml-2" /> },
  { linkText: 'Gestion roles', to: '/dashboard/gestion_roles', icon: <FaTeamspeak className="inline ml-2" /> },
]

function RouteComponent() {

  const { data: userRol } = useQuery({
    queryKey: ['this_rol'],
    queryFn: currentUserRol
  })

  const returnLinks = () => {
    if (userRol == 'Admin') {
      console.log('user is admin')
      return [...links, ...adminLinks]
    }

    console.log('user is not admin')
    return links
  }

  return (
    <div>
      <NavBarDashboard links={returnLinks()} />
    </div>
  )
}
