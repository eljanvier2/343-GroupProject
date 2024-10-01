import React from "react";

interface NavbarButtonProps {
  text: string;
  onClick: () => void;
}

const NavbarButton = ({ text, onClick }: NavbarButtonProps): JSX.Element => {
  return (
    <div
      className="uppercase text-customGrey text-xl cursor-pointer select-none hover:underline"
      onClick={() => {
        onClick();
      }}>
      {text}
    </div>
  );
};

export default NavbarButton;