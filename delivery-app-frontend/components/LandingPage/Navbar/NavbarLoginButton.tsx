import React from 'react'
import Image from 'next/image'
import Arrow from '@/public/icons/diagarrow.svg'

const NavbarLoginButton = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center space-x-6 h-full cursor-pointer hover:scale-105 transition-all duration-300">
      <div className="text-customBlack uppercase text-xl font-medium">
        Log In
      </div>
      <div className="border border-customBlack rounded-full px-6 py-2">
        <Image src={Arrow} alt="arrow" width={20} height={20} />
      </div>
    </div>
  )
}

export default NavbarLoginButton
