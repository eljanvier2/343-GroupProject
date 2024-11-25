import React from "react";
import Box from "./DashboardBox";

interface DashboardComponentProps {}

const DashboardComponent = ({}: DashboardComponentProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Box title="Tracking">{"Prout"}</Box>
      <Box title="Notifications">{"Prout"}</Box>
      <Box title="Map">{"Prout"}</Box>
      <Box title="Settings">{"Prout"}</Box>
    </div>
  );
};

export default DashboardComponent;