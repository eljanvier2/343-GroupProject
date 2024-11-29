import React from "react";
import Box from "./DashboardBox";
import { User } from "@/data";
import Notifications from "./Notifications";
import TrackingComponent from "./TrackingComponent";
import Deliveries from "./Deliveries";

interface DashboardComponentProps {
  user: User | null;
}

const DashboardComponent = ({ user }: DashboardComponentProps): JSX.Element => {
  console.log(user?.deliveries);
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4">
        <Box title="Tracking">
          <TrackingComponent />
        </Box>
        <Box title="Settings">{"Prout"}</Box>
      </div>
      <div className="flex flex-col space-y-4">
        <Box title="Notifications">
          <Notifications notifications={user?.notifications || []} />
        </Box>
        <Box title="Deliveries">
          <Deliveries deliveries={user?.deliveries || []} />
        </Box>
      </div>
    </div>
  );
};

export default DashboardComponent;
