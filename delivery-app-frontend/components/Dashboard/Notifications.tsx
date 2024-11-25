import React, { useEffect } from "react";
import { Notification } from "@/data";
import NotificationBox from "./Notification";

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications = ({ notifications }: NotificationsProps): JSX.Element => {
  console.log(notifications);
  useEffect(() => {}, [notifications]);
  return (
    <div className="w-min-content space-y-2">
      {notifications.map((notification, index) => (
        <React.Fragment key={notification.id}>
          <NotificationBox notification={notification} />
          {index < notifications.length - 1 && (
            <hr className="my-2 border-t w-full border-gray-300" />
          )}
        </React.Fragment>      ))}
    </div>
  );
};

export default Notifications;
