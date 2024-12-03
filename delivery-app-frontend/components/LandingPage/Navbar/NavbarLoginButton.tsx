import React from 'react'
import Image from 'next/image'
import Arrow from '@/public/icons/diagarrow.svg'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next/client'

interface NavbarLoginButtonProps {
  showLogin: (value: boolean) => void
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const NavbarLoginButton = ({
  showLogin,
  isAuthenticated,
  setIsAuthenticated
}: NavbarLoginButtonProps): JSX.Element => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        if (isAuthenticated) {
          void signOut(auth)
          showLogin(false)
          deleteCookie('userId')
          setIsAuthenticated(false)
          void router.push('/')
          return
        }
        showLogin(true)
      }}
      className="flex items-center justify-center space-x-6 h-full cursor-pointer hover:scale-105 transition-all duration-300">
      {/* return (
    <div
      className="flex items-center justify-center space-x-6 h-full cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={handleAuthAction}
    > */}
      <div className="text-customBlack uppercase text-xl font-medium">
        {(isAuthenticated) ? 'Log Out' : 'Log In'}
      </div>
      <div className="border border-customBlack rounded-full px-6 py-2">
        <Image src={Arrow} alt="arrow" width={20} height={20} />
      </div>
    </div>
  )
}

export default NavbarLoginButton
