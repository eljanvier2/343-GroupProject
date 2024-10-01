import React from "react";
import Navbar from "../LandingPage/Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-32">{children}</div>
    </div>
  );
};

export default Layout;
