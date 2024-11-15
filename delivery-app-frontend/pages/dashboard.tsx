import React, { use, useEffect } from "react";
import { useRouter } from "next/router";

interface DashboardProps {
  isAuthenticated: boolean;
}

const Dashboard = ({ isAuthenticated }: DashboardProps): JSX.Element => {
  const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!isAuthenticated) {
//         void router.push("/");
//       }
//     }, 2000);
//   }, [isAuthenticated]);

useEffect(() => {}, [isAuthenticated]);
  return <div className="text-black">{isAuthenticated ? 'Succesfully Logged-In' : 'Succesfully logged-in'}</div>;
};

export default Dashboard;
