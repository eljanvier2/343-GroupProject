import { type Delivery } from '@/data'
import React from 'react'

interface DeliveryComponentProps {
  delivery: Delivery
}

const DeliveryComponent = ({
  delivery
}: DeliveryComponentProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="font-medium">#{delivery.trackingId}</div>
      <div>Status: {delivery.status}</div>
    </div>
  )
}

export default DeliveryComponent
