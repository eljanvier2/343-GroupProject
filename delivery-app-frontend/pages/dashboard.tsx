import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface DashboardProps {
  isAuthenticated: boolean
}

const Dashboard = ({ isAuthenticated }: DashboardProps): JSX.Element => {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      void router.push('/')
    }
  }, [isAuthenticated])
  return <div className="text-black">Succesfully Logged-In</div>
}

export default Dashboard
