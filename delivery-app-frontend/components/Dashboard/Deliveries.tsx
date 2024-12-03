import { Delivery } from "@/data";
import React, { useState } from "react";
import DeliveryComponent from "./Delivery";

interface DeliveriesProps {
  deliveries: Delivery[];
}

const Deliveries = ({ deliveries }: DeliveriesProps): JSX.Element => {
  deliveries = deliveries.filter((delivery) => delivery.trackingId);
  const [displayedDeliveries, setDisplayedDeliveries] = useState(
    deliveries.slice(0, 3)
  );
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-full">
      {displayedDeliveries.map((delivery, index) => {
        if (delivery.trackingId) {
          return (
            <div className="w-full">
              <React.Fragment key={delivery.id}>
                <DeliveryComponent delivery={delivery} />
                {index < displayedDeliveries.length - 1 && (
                  <hr className="my-2 border-t w-full border-gray-300" />
                )}
              </React.Fragment>
            </div>
          );
        }
      })}
      {deliveries.length > 3 && (
        <div className="text-center my-2">
          <span
            className="text-xl font-bold tracking-widest cursor-pointer"
            onClick={() => {
              if (expanded) {
                setDisplayedDeliveries(deliveries.slice(0, 3));
                setExpanded(false);
                return;
              }
              setDisplayedDeliveries(deliveries);
              setExpanded(true);
            }}>
            ...
          </span>
        </div>
      )}
    </div>
  );
};

export default Deliveries;
