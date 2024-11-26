import DashboardComponent from "@/components/Dashboard/dashboard";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  GeoPoint,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Delivery, User, Notification } from "@/data";

interface DashboardProps {
  isAuthenticated: boolean;
  user: User | null;
  fetchedUser: User | null;
  setUser: (value: any) => void;
}

const Dashboard = ({
  isAuthenticated,
  user,
  fetchedUser,
  setUser,
}: DashboardProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    // if (!isAuthenticated) {
    //   void router.push("/");
    // }
  });
  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);
  return (
    <div className="text-black pt-4">
      {
        /* !isAuthenticated ? "Login failed" :  */ <DashboardComponent
          user={user}
        />
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;
  let fetchedUser = null;

  if (userId) {
    const userDoc = await getDoc(doc(db, "users", userId as string));
    if (userDoc.exists()) {
      fetchedUser = { id: userDoc.id, ...userDoc.data() } as User;

      const notificationsSnapshot = await getDocs(
        collection(db, "users", userId as string, "notifications")
      );
      fetchedUser.notifications = notificationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        titre: doc.data().title,
        ...doc.data(),
      })) as Notification[];

      const deliveriesSnapshot = await getDocs(
        collection(db, "users", userId as string, "deliveries")
      );
      fetchedUser.deliveries = deliveriesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          departure: (data.departure as Timestamp).toDate().toISOString(),
          from: {
            latitude: (data.from as GeoPoint).latitude,
            longitude: (data.from as GeoPoint).longitude,
          },
          to: {
            latitude: (data.to as GeoPoint).latitude,
            longitude: (data.to as GeoPoint).longitude,
          },
          status: data.status,
          weight: data.weight,
        };
      }) as Delivery[];
    }
  }
  return {
    props: {
      isAuthenticated: !!fetchedUser,
      fetchedUser,
    },
  };
};

export default Dashboard;
