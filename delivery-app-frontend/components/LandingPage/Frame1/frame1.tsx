import Image from 'next/image'
import React from 'react'
import Drone from '@/public/images/drone.png'
import RoundButton from '@/components/Global/RoundButton'
import { useRouter } from 'next/router'

interface Frame1Props {
  isAuthenticated: boolean
}

const Frame1 = ({ isAuthenticated }: Frame1Props): JSX.Element => {
  const router = useRouter()

  const handlePlanDeliveryClick = () => {
    if (!isAuthenticated) {
      alert('Please login or create an account to plan your delivery.')
      return
    }
    router.push('/paymentDelivery')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex-col uppercase text-center -space-y-2">
        <div className="font-medium">Your Parcels</div>
        <div className="text-header1 font-semibold">Wherever Whenever</div>
      </div>
      <Image
        src={Drone}
        alt="Delivery Drone"
        width={882}
        height={384}
        style={{ filter: 'drop-shadow(0px 40px 60px rgba(0, 0, 0, 0.25))' }}
      />
      <RoundButton text="Plan delivery" onClick={handlePlanDeliveryClick} />
    </div>
  )
}

export default Frame1
