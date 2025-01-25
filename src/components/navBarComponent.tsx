
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar'
import { FileRouteTypes, Link, LinkProps, RootRoute } from '@tanstack/react-router'
import React, { useState } from 'react'

type LinkAligment = 'center' | 'end'

type LinkData = {
  linkComponent: JSX.Element,
  alignment: LinkAligment,
  id: number
}

class LinkHandler {
  links: LinkData[]
  currentId: number

  constructor(links_data: LinkRawData[]) {
    this.currentId = 0

    this.links = links_data.map(linkRawData => {
      this.currentId += 1
      return {
        ...linkRawData,
        id: this.currentId
      }
    })
  }

  getLinksByAlignment(alignment: LinkAligment): LinkData[] {
    return this.links.filter(linkData => linkData.alignment === alignment)
  }

  getLinks(): LinkData[] {
    return this.links
  }
}

type LinkRawData = {
  linkComponent: JSX.Element,
  alignment: LinkAligment
}

const linkComponents: LinkRawData[] = [
  {
    linkComponent: <Link to='/'
      activeProps={{
        className: 'border-b border-white'
      }}
    >Home</Link>,
    alignment: 'center'
  },
  {
    linkComponent: <Link to='/dashboard'
      activeProps={{
        className: 'border-b border-white'
      }}
    >Dashboard</Link>,
    alignment: 'center'
  },
  {
    linkComponent: <Link to='/register' className='px-3 py-2 bg-blue-800 rounded-xl hover:bg-blue-600 transition-colors duration-100'>
      Sign Up
    </Link>,
    alignment: 'end'
  },
  {
    linkComponent: <Link to='/login' className='px-3 py-2 bg-blue-700 rounded-xl hover:bg-blue-500 transition-colors duration-100'>
      Log In
    </Link>,
    alignment: 'end'
  },
]

const NavBarComponent = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkHandler = new LinkHandler(linkComponents)

  return (
    <Navbar shouldHideOnScroll className='bg-gray-950' onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <h1 className='font-bold text-xl'>Club sabana</h1>
      </NavbarBrand>

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className='sm:hidden'
        />
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {linkHandler.getLinksByAlignment('center').map(linkData => <NavbarItem key={linkData.id}>
          {linkData.linkComponent}
        </NavbarItem>)}
      </NavbarContent>
      <NavbarContent justify='end' className='hidden sm:flex gap-4'>
        {linkHandler.getLinksByAlignment('end').map(linkData => <NavbarItem key={linkData.id}>
          {linkData.linkComponent}
        </NavbarItem>)}
      </NavbarContent>
      <NavbarMenu className='gap-8'>
        {linkHandler.getLinks().map(linkData => <NavbarMenuItem key={linkData.id}>
          {linkData.linkComponent}
        </NavbarMenuItem>)}
      </NavbarMenu>
    </Navbar >
  )
}

export default NavBarComponent
