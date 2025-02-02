import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import NavBarDashboard, { LinkData } from './../components/navBarDashboard'
import { FaCommentDollar, FaCreditCard, FaFileAlt, FaHome, FaSignOutAlt, FaTrophy, FaUser } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'
import { isAuthenticated } from './../backend/auth'
import { currentUserIsAdmin } from '../backend/user'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!await isAuthenticated()) {
      console.log("trowing redirect")
      throw redirect({
        to: '/login'
      })
    }

    if (!currentUserIsAdmin()) {
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
  { linkText: 'Solicitudes', to: '/dashboard/solicitudes', icon: <FaCommentDollar className="inline ml-2" /> },
  { linkText: 'Interfaz usuario', to: '/user_dashboard', icon: <FaUser className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

function RouteComponent() {
  return (
    <div>
      <NavBarDashboard links={links} />
    </div>
  )
}
