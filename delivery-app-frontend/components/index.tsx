import React from "react";
import Frame1 from "./LandingPage/Frame1/frame1";
import Frame2 from "./LandingPage/Frame2/frame2";

interface IndexComponentProps {}

const IndexComponent = ({}: IndexComponentProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center uppercase space-y-20">
      <Frame1 />
      <Frame2 />
    </div>
  );
};

export default IndexComponent;
