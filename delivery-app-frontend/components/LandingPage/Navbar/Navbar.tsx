import React from 'react'
import Image from 'next/image'
import { routes } from './config'
import NavbarButton from './NavbarButton'
import Logo from '@/public/images/dronelogo.svg'
import NavbarLoginButton from './NavbarLoginButton'
import { useRouter } from 'next/router'

interface NavbarProps {
  showLogin: (value: boolean) => void
}

const Navbar = ({
  showLogin,
}: NavbarProps): JSX.Element => {
  const router = typeof window !== 'undefined' ? useRouter() : undefined
  return (
    <div className="w-full flex justify-between items-center px-20 py-2.5 border-b border-black/20">
      <div className="w-1/3">
        <Image src={Logo} alt="logo" width={100} height={100} />
      </div>
      <div className="flex justify-between items-center w-1/3">
        {routes.map((route, index) => {
          return (
            <NavbarButton
              text={route.name}
              onClick={() => {
                void router?.push(route.path)
              }}
              key={index}
            />
          )
        })}
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <NavbarLoginButton showLogin={showLogin}/>
      </div>
    </div>
  )
}

export default Navbar
