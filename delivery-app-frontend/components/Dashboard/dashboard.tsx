import React from "react";
import Box from "./DashboardBox";
import { User } from "@/data";
import Notifications from "./Notifications";
import TrackingComponent from "./TrackingComponent";

interface DashboardComponentProps {
  user: User | null;
}

const DashboardComponent = ({ user }: DashboardComponentProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Box title="Tracking"><TrackingComponent /></Box>
      <Box title="Notifications">
        <Notifications notifications={user?.notifications || []} />
      </Box>
      <Box title="Map">{"Prout"}</Box>
      <Box title="Settings">{"Prout"}</Box>
    </div>
  );
};

export default DashboardComponent;
