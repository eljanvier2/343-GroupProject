import React, { useEffect } from "react";
import Image from "next/image";
import { routes, dashboardRoutes } from "./config";
import NavbarButton from "./NavbarButton";
import Logo from "@/public/images/dronelogo.svg";
import NavbarLoginButton from "./NavbarLoginButton";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next/client";

interface NavbarProps {
  showLogin: (value: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  dashboard: boolean;
}

const Navbar = ({
  showLogin,
  isAuthenticated,
  setIsAuthenticated,
  dashboard,
}: NavbarProps): JSX.Element => {
  const router = typeof window !== "undefined" ? useRouter() : undefined;
  let usedRoutes = dashboard ? dashboardRoutes : routes;
  const userId = getCookie('userId')

  useEffect(() => {
    // find if route with name 'Dashboard' exists and remove it if !isAuthenticated
    const index = usedRoutes.findIndex((route) => route.name === "Dashboard");
    if ((!isAuthenticated && getCookie('userId') === null) && index !== -1) {
      usedRoutes.splice(index, 1);
    }
  })

  return (
    <div className="w-full flex justify-between items-center px-20 py-2.5 border-b border-black/20">
      <div className="w-1/3">
        <Image src={Logo} alt="logo" width={100} height={100} />
      </div>
      <div className="flex justify-between items-center w-1/3">
        {usedRoutes.map((route, index) => {
          return (
            <NavbarButton
              text={route.name}
              onClick={() => {
                void router?.push(route.path + `?userId=${userId}`)
              }}
              key={index}
            />
          );
        })}
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <NavbarLoginButton
          showLogin={showLogin}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </div>
  );
};

export default Navbar;
