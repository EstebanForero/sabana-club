import { Link, Outlet } from '@tanstack/react-router'
import React from 'react'
import { FaHome, FaSignOutAlt, FaTrophy, FaFileAlt, FaCreditCard } from 'react-icons/fa' // Import icons from FontAwesome
import { GiTennisRacket } from 'react-icons/gi' // Import tennis racket icon from Game Icons

type LinkData = {
  linkText: string
  to: string
  icon?: React.ReactNode // Optional icon for the link
}

const links: LinkData[] = [
  { linkText: 'Inicio', to: '/dashboard', icon: <FaHome className="inline ml-2" /> },
  { linkText: 'Entrenamientos', to: '/dashboard/entrenamientos', icon: <GiTennisRacket className="inline ml-2" /> },
  { linkText: 'Torneos', to: '/dashboard/torneos', icon: <FaTrophy className="inline ml-2" /> },
  { linkText: 'Informes', to: '/dashboard/informes', icon: <FaFileAlt className="inline ml-2" /> },
  { linkText: 'Matricula', to: '/dashboard/matricula', icon: <FaCreditCard className="inline ml-2" /> },
  { linkText: 'Cerrar Sesión', to: '/', icon: <FaSignOutAlt className="inline ml-2" /> },
]

const NavBarDashboard = () => {
  return (
    <div className="flex">
      <nav className="w-60 h-screen bg-gray-950 p-4 flex flex-col gap-4">
        {links.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="text-gray-200 hover:text-blue-500 transition-colors"
            activeProps={{
              className: 'text-blue-500 font-bold'
            }}
          >
            {item.linkText}
            {item.icon} {/* Render the icon after the text */}
          </Link>
        ))}
      </nav>

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default NavBarDashboard
