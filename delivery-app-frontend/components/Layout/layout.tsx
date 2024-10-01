import React from 'react'
import Navbar from '@/components/LandingPage/Navbar/Navbar'
import Footer from '@/components/LandingPage/Footer/Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-32">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
