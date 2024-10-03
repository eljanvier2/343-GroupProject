import React from 'react'
import Navbar from '@/components/LandingPage/Navbar/Navbar'
import Footer from '@/components/LandingPage/Footer/Footer'
import Chatbot from '@/components/Chatbot/Chatbot';

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-32">{children}</div>
      <Chatbot />
      <Footer />
    </div>
  )
}

export default Layout
