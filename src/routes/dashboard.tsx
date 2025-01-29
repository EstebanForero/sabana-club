import { createFileRoute, Outlet } from '@tanstack/react-router'
import NavBarDashboard, { LinkData } from './../components/navBarDashboard'
import { FaCreditCard, FaFileAlt, FaHome, FaSignOutAlt, FaTrophy } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

const links: LinkData[] = [
  { linkText: 'Inicio', to: '/dashboard', icon: <FaHome className="inline ml-2" /> },
  { linkText: 'Entrenamientos', to: '/dashboard/entrenamientos', icon: <GiTennisRacket className="inline ml-2" /> },
  { linkText: 'Torneos', to: '/dashboard/torneos', icon: <FaTrophy className="inline ml-2" /> },
  { linkText: 'Informes', to: '/dashboard/informes', icon: <FaFileAlt className="inline ml-2" /> },
  { linkText: 'Matricula', to: '/dashboard/matricula', icon: <FaCreditCard className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

function RouteComponent() {
  return (
    <div>
      <NavBarDashboard links={links} />
    </div>
  )
}
