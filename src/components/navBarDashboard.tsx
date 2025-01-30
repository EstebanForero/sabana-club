import { Link, Outlet } from '@tanstack/react-router'
import React from 'react'
import { FaHome, FaSignOutAlt, FaTrophy, FaFileAlt, FaCreditCard } from 'react-icons/fa'
import { GiTennisRacket } from 'react-icons/gi'

export type LinkData = {
  linkText: string
  to: string
  icon?: React.ReactNode
}

type Props = {
  links: LinkData[]
}

const NavBarDashboard = ({ links }: Props) => {
  console.log('The links are: ', JSON.stringify(links))
  return (
    <div className="flex">
      <nav className="w-60 h-screen bg-gray-950 p-4 flex flex-col gap-4 fixed">
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
            {item.icon}
          </Link>
        ))}
      </nav>

      <div className="ml-60 flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default NavBarDashboard
