import React from "react";
import { Stat } from "./config";

interface StatsBoxProps {
  stat: Stat;
}

const StatsBox = ({ stat }: StatsBoxProps): JSX.Element => {
  return (
    <div className="rounded-3xl bg-customBlack flex flex-col items-center justify-center px-28 py-24">
      <div className="text-header2 text-customLightGreen">
        {stat.percentage}%
      </div>
      <div className="text-customWhite text-header4">{stat.hasSource ? `${stat.title}*` : stat.title}</div>
    </div>
  );
};

export default StatsBox;
