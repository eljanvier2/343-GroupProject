import React from 'react'
import { type Notification } from '@/data'

interface NotificationBoxProps {
  notification: Notification
}

const NotificationBox = ({
  notification
}: NotificationBoxProps): JSX.Element => {
  return (
    <div className="w-[25vw] flex items-center space-x-2">
      <div
        className="rounded-full w-3 h-3"
        style={{
          backgroundColor:
            notification.type === 0
              ? 'red'
              : notification.type === 1
                ? 'orange'
                : 'green'
        }}
      />
      <div className="flex flex-col">
        <div className="font-bold">{notification.titre}</div>
        <div>{notification.description}</div>
      </div>
    </div>
  )
}

export default NotificationBox
