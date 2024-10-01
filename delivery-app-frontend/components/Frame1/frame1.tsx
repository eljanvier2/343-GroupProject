import Image from "next/image";
import React from "react";
import Drone from "@/public/images/drone.png";
import RoundButton from "@/components/Global/RoundButton";

interface Frame1Props {}

const Frame1 = ({}: Frame1Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex-col uppercase text-black text-center -space-y-2">
        <div className="font-medium">Your Parcels</div>
        <div className="text-header1 font-semibold">Wherever Whenever</div>
      </div>
      <Image
        src={Drone}
        alt="Delivery Drone"
        width={882}
        height={384}
        style={{ filter: "drop-shadow(0px 40px 60px rgba(0, 0, 0, 0.25))" }}
      />
      <RoundButton text="Plan delivery" onClick={() => {}} />
    </div>
  );
};

export default Frame1;
