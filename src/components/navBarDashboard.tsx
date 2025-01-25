import { Link, Outlet } from '@tanstack/react-router'
import React from 'react'

type LinkData = {
  linkText: string
  to: string
}

const links: LinkData[] = [
  { linkText: 'Entrenamientos', to: '/dashboard/entrenamientos' },
  { linkText: 'Torneos', to: '/dashboard/torneos' },
  { linkText: 'Informes', to: '/dashboard/informes' },
  { linkText: 'Matricula', to: '/dashboard/matricula' },
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
