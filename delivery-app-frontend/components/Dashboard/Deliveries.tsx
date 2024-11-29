import { Delivery } from "@/data";
import React from "react";
import DeliveryComponent from "./Delivery";

interface DeliveriesProps {
  deliveries: Delivery[];
}

const Deliveries = ({ deliveries }: DeliveriesProps): JSX.Element => {
  deliveries = deliveries.filter((delivery) => delivery.trackingId);
  return (
    <div className="w-full">
      {deliveries.map((delivery, index) => {
        if (delivery.trackingId) {
          return (
            <div className="w-full">
              <DeliveryComponent key={delivery.id} delivery={delivery} />
              {index < deliveries.length - 1 && (
                <hr className="my-2 border-t w-full border-gray-300" />
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Deliveries;
