import React from "react";
import type { Pro } from "./config";
import Image from "next/image";
import DiagonalArrow from "@/public/icons/diagarrow.svg";

interface ProsBoxProps {
  pro: Pro;
}

const ProsBox = ({ pro }: ProsBoxProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-customLightGreen cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-300 px-10 py-5 space-y-72 select-none">
      <button className="self-end border border-customBlack rounded-full px-6 py-2">
        <Image
          src={DiagonalArrow}
          alt="Diagonal Arrow"
          width={20}
          height={20}
        />
      </button>
      <div>
        <div className="text-header3 font-medium">{pro.title}</div>
        <div className="">{pro.description}</div>
      </div>
    </div>
  );
};

export default ProsBox;
