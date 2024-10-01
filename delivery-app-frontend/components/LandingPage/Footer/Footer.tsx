import React from "react";
import Image from "next/image";
import { footerLinks1, footerLinks2 } from "./config";
import Logo from "@/public/images/dronelogowhite.svg";
import { useRouter } from "next/router";

interface FooterProps {}

const Footer = ({}: FooterProps): JSX.Element => {
  const router = typeof window !== "undefined" ? useRouter() : undefined;

  return (
    <footer className="w-full">

      {/* TOP FOOTER */}
      <div className="w-full h-4/5 bg-customBlack flex justify-between items-center py-10 px-20">
        
        <div className="w-1/2">
          <Image src={Logo} alt="logo" width={128} height={128} /> 
          <div className="w-455 font-semibold text-customWhite text-header3 mt-2">
          Greener without compromising on comfort
          </div>
          <div className="w-159 text-customWhite text-body mt-2">
          DroneDelivery, {new Date().getFullYear()}
          </div>
        </div>

        <div className="w-1/3 grid grid-cols-2 gap-6 justify-end">
          {footerLinks1.map((link, index) => (
            <div
              key={index}
              className="uppercase text-customWhite text-body cursor-pointer mx-3"
              onClick={() => router?.push(link.path)}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="w-full h-1/5 bg-customGreen flex justify-between items-center py-2 px-20 border-t border-customBlack">
      
        <div className="w-1/3 font-semibold text-customBlack text-body">
            © {new Date().getFullYear()} DroneDelivery Inc. All rights reserved.
        </div>


        <div className="w-1/3 flex">
          {footerLinks2.map((link, index) => (
            <div
              key={index}
              className="uppercase font-semibold text-customBlack text-body cursor-pointer mx-3"
              onClick={() => router?.push(link.path)}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;