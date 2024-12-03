import React from 'react'
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/router'

const TrackingComponent = () => {
  const router = useRouter()
  const trackingData = {
    trackingNumber: '1Z999AA1234567890',
    status: 'In Transit',
    estimatedDelivery: 'November 25, 2024',
    updates: [
      {
        status: 'Out for Delivery',
        location: 'San Francisco, CA',
        timestamp: 'Nov 23, 2024 08:30 AM',
        description: 'Package is out for delivery',
        isCurrentStatus: true
      },
      {
        status: 'Arrived at Local Facility',
        location: 'San Francisco, CA',
        timestamp: 'Nov 23, 2024 06:15 AM',
        description: 'Package arrived at local delivery facility',
        isCurrentStatus: false
      },
      {
        status: 'In Transit',
        location: 'Oakland, CA',
        timestamp: 'Nov 22, 2024 11:45 PM',
        description: 'Package in transit to destination',
        isCurrentStatus: false
      },
      {
        status: 'Shipped',
        location: 'Los Angeles, CA',
        timestamp: 'Nov 22, 2024 02:30 PM',
        description: 'Package has left seller facility',
        isCurrentStatus: false
      }
    ]
  }
  const updatesToShow = trackingData.updates.slice(0, 2)
  const hasMoreUpdates = trackingData.updates.length > 2

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Out for Delivery':
        return <Truck className="w-6 h-6" />
      case 'Arrived at Local Facility':
        return <MapPin className="w-6 h-6" />
      case 'In Transit':
        return <Package className="w-6 h-6" />
      case 'Shipped':
        return <CheckCircle className="w-6 h-6" />
      default:
        return <Clock className="w-6 h-6" />
    }
  }

  return (
    <div className="max-w-2xl min-w-[40vw] mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Track Your Package
          </CardTitle>
          <div className="mt-2">
            <div className="text-sm text-gray-500">Tracking Number:</div>
            <div className="font-mono">{trackingData.trackingNumber}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-semibold">{trackingData.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Estimated Delivery</div>
                <div className="font-semibold">
                  {trackingData.estimatedDelivery}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {updatesToShow.map((update, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className={`mt-1 ${
                    update.isCurrentStatus ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                  {getStatusIcon(update.status)}
                </div>
                <div className="flex-1">
                  <div
                    className={`font-semibold ${
                      update.isCurrentStatus ? 'text-blue-500' : ''
                    }`}>
                    {update.status}
                  </div>
                  <div className="text-sm text-gray-600">{update.location}</div>
                  <div className="text-sm text-gray-500">
                    {update.timestamp}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {update.description}
                  </div>
                </div>
              </div>
            ))}
            {hasMoreUpdates && (
              <div className="text-center text-xl font-bold tracking-widest cursor-pointer" onClick={() => {
                void router.push('/tracking')
              }}>...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TrackingComponent
