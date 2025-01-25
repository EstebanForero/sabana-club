
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar'
import { Link } from '@tanstack/react-router'
import React from 'react'

const NavBarComponent = () => {
  return (
    <Navbar shouldHideOnScroll className='bg-gray-950'>
      <NavbarBrand>
        <h1 className='font-bold text-xl'>Club sabana</h1>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link to='/' className='text-xl'
            activeProps={{
              className: 'border-b border-white'
            }}
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Link to='/register' className='px-3 py-2 bg-blue-800 rounded-xl hover:bg-blue-600 transition-colors duration-100'>
            Sign Up
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to='/login' className='px-3 py-2 bg-blue-700 rounded-xl hover:bg-blue-500 transition-colors duration-100'>
            Log In
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar >
  )
}

export default NavBarComponent
