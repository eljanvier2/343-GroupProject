import { GeoPoint, Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  notifications: Notification[];
  deliveries: Delivery[];
}

export interface Notification {
  id: string;
  titre: string;
  description: string;
  type: number;
}

export interface Delivery {
  id: string;
  departure: string;
  from: { latitude: number; longitude: number };
  to: { latitude: number; longitude: number };
  status: string;
  weight: number;
  trackingId: string;
}
