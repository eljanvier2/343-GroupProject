import React from "react";
import ArrowRight from "@/public/icons/arrowright.svg";
import Image from "next/image";

interface RoundButtonProps {
  text: string;
  onClick: () => void;
  arrow?: boolean;
}

const RoundButton = ({
  text,
  onClick,
  arrow = true,
}: RoundButtonProps): JSX.Element => {
  return (
    <button
      className="rounded-full bg-customGreen p-2 cursor-pointer"
      onClick={onClick}>
      <div className="flex justify-center px-10 py-5 space-x-2.5">
        <div className="text-black uppercase text-center text-header4 font-medium ">
          {text}
        </div>
        {arrow && (
          <Image src={ArrowRight} alt="arrow right" width={24} height={24} />
        )}
      </div>
    </button>
  );
};

export default RoundButton;
