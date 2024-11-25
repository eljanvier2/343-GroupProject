import React from "react";

interface BoxProps {
  title: string;
  children: React.ReactNode;
}

const Box = ({ title, children }: BoxProps): JSX.Element => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6  flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-customBlack self-start">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default Box;
