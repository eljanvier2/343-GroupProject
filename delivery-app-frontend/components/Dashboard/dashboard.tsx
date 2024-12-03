import React from "react";
import Box from "./DashboardBox";
import { User } from "@/data";
import Notifications from "./Notifications";
import TrackingComponent from "./TrackingComponent";
import Deliveries from "./Deliveries";
import WeatherTrackingComponent from "./Weather";

interface DashboardComponentProps {
  user: User | null;
}

const DashboardComponent = ({ user }: DashboardComponentProps): JSX.Element => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 h-[80vh]">
        <Box title="Tracking">
          <TrackingComponent />
        </Box>
      </div>
      <div className="flex flex-col space-y-4 h-[80vh]">
        <Box title="Deliveries">
          <Deliveries deliveries={user?.deliveries || []} />
        </Box>
        <Box title="Notifications">
          <Notifications notifications={user?.notifications || []} />
        </Box>
      </div>
      <div className="h-[80vh]">
        <Box>
          <WeatherTrackingComponent />
        </Box>
      </div>
    </div>
  );
};

export default DashboardComponent;
