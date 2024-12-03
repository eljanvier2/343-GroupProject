import React from "react";

interface BoxProps {
  title?: string;
  children: React.ReactNode;
}

const Box = ({ title, children }: BoxProps): JSX.Element => {
  return (
    <div className="bg-white rounded-3xl shadow-lg h-min p-6 min-w-[25vw] flex flex-col justify-center items-start space-y-4">
      {title && (
        <h1 className="text-2xl font-bold text-customBlack self-start">
          {title}
        </h1>
      )}
      <div className="pl-2 w-full">{children}</div>
    </div>
  );
};

export default Box;
