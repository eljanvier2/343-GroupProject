import { Delivery } from "@/data";
import React, { useEffect, useState } from "react";
import DeliveryComponent from "./Delivery";

interface DeliveriesProps {
  deliveries: Delivery[];
}

const Deliveries = ({ deliveries }: DeliveriesProps): JSX.Element => {
  const [displayedDeliveries, setDisplayedDeliveries] = useState<Delivery[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const filteredDeliveries = deliveries.filter((delivery) => delivery.trackingId);
    setDisplayedDeliveries(filteredDeliveries.slice(0, 3));
  }, [deliveries]);

  return (
    <div className="w-full">
      {displayedDeliveries.length === 0 && (
        <div className="text-center text-black my-2">
            No deliveries found
        </div>
      )}
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
