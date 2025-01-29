import { createFileRoute } from '@tanstack/react-router'
import NavBarDashboard, { LinkData } from '../components/navBarDashboard'
import { FaFileAlt, FaHome, FaSignOutAlt, FaTrophy } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'

export const Route = createFileRoute('/user_dashboard')({
  component: RouteComponent,
})

const links: LinkData[] = [
  { linkText: 'Inicio', to: '/user_dashboard', icon: <FaHome className="inline ml-2" /> },
  { linkText: 'Entrenamientos', to: '/user_dashboard/training', icon: <GiTennisRacket className="inline ml-2" /> },
  { linkText: 'Torneos', to: '/user_dashboard/tournament', icon: <FaTrophy className="inline ml-2" /> },
  { linkText: 'Informes', to: '/user_dashboard/tuition', icon: <FaFileAlt className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

function RouteComponent() {
  return <div>
    <NavBarDashboard links={links} />
  </div>

}
