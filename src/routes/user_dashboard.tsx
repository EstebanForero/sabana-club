import { createFileRoute, redirect } from '@tanstack/react-router'
import NavBarDashboard, { LinkData } from '../components/navBarDashboard'
import { FaCreditCard, FaFileAlt, FaHome, FaSignOutAlt, FaTrophy } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'
import { isAuthenticated } from '../backend/auth'

export const Route = createFileRoute('/user_dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!await isAuthenticated()) {
      console.log("trowing redirect")
      throw redirect({
        to: '/login'
      })
    }
    console.log("user authenticated")
  }
})

const links: LinkData[] = [
  { linkText: 'Inicio', to: '/user_dashboard', icon: <FaHome className="inline ml-2" /> },
  { linkText: 'Entrenamientos', to: '/user_dashboard/training', icon: <GiTennisRacket className="inline ml-2" /> },
  { linkText: 'Torneos', to: '/user_dashboard/tournament', icon: <FaTrophy className="inline ml-2" /> },
  { linkText: 'Matricula', to: '/user_dashboard/tuition', icon: <FaCreditCard className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

function RouteComponent() {
  return <div>
    <NavBarDashboard links={links} />
  </div>

}
