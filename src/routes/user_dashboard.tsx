import { createFileRoute, redirect } from '@tanstack/react-router'
import NavBarDashboard, { LinkData } from '../components/navBarDashboard'
import { FaChessBoard, FaCreditCard, FaFileAlt, FaHome, FaSignOutAlt, FaTrophy, FaUserPlus } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'
import { isAuthenticated } from '../backend/auth'
import { useQuery } from "@tanstack/react-query"
import { currentUserIsAdmin, getCurrentUser } from '../backend/user'

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
  { linkText: 'Informes', to: '/user_dashboard/informes', icon: <FaFileAlt className="inline ml-2" /> },
  { linkText: 'Matricula', to: '/user_dashboard/tuition', icon: <FaCreditCard className="inline ml-2" /> },
  { linkText: 'Perfil', to: '/user_dashboard/profile', icon: <FaUserPlus className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

const adminLink: LinkData = {
  linkText: 'Admin dashboard',
  to: '/dashboard',
  icon: <FaChessBoard className='inline ml-2' />
}

function RouteComponent() {

  const { data: isAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: currentUserIsAdmin
  })

  const returnLinks = () => {
    if (isAdmin) {
      console.log('user is admin')
      return [...links, adminLink]
    }

    console.log('user is not admin')
    return links
  }

  return <div>
    <NavBarDashboard links={returnLinks()} />
  </div>

}
