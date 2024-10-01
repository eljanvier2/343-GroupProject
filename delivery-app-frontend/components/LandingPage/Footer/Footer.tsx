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
          <div className=" font-semibold text-customWhite text-[36px] mt-2">
            Greener without
            <br />
            compromising on comfort
          </div>
          <div className="text-customWhite text-body mt-2">
            DroneDelivery, {new Date().getFullYear()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 justify-end">
          {footerLinks1.map((link, index) => (
            <div
              className="uppercase text-customWhite text-header4 font-light w-min whitespace-nowrap ml-3"
              key={index}
              style={{
                cursor: link.path ? "pointer" : "default",
                opacity: link.path ? 1 : 0.8,
              }}
              onClick={() => {
                link.path ? router?.push(link.path) : null;
              }}>
              {link.name}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="w-full bg-customGreen flex justify-between items-center py-10 px-20 border-t border-customBlack">
        <div className="w-1/3 font-semibold text-customBlack text-body">
          © {new Date().getFullYear()} DroneDelivery Inc. All rights reserved.
        </div>

        <div className="w-1/3 flex justify-end">
          {footerLinks2.map((link, index) => (
            <div
              key={index}
              className="uppercase font-semibold text-customBlack text-body cursor-pointer mx-3"
              onClick={() => {
                link.path ? router?.push(link.path) : null;
              }}>
              {link.name}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
