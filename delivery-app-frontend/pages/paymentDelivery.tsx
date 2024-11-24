import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

declare const google: any;

const warehouses = [
  { name: 'Warehouse 1', lat: 45.5017, lng: -73.5673 },
  { name: 'Warehouse 2', lat: 45.5088, lng: -73.5619 },
  { name: 'Warehouse 3', lat: 45.5155, lng: -73.553 },
  { name: 'Warehouse 4', lat: 45.5234, lng: -73.5498 },
  { name: 'Warehouse 5', lat: 45.5300, lng: -73.545 },
];

// Montreal center coordinates
const MONTREAL_CENTER = { lat: 45.5017, lng: -73.5673 };
const DELIVERY_RADIUS_KM = 10; // Updated delivery radius to 10 km

const PaymentDelivery = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [nearestWarehouse, setNearestWarehouse] = useState<any>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof google !== 'undefined') {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initAutocomplete = async () => {
      await loadGoogleMapsScript();

      const input = document.getElementById('autocomplete') as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(input);

      const mapElement = document.getElementById('map') as HTMLElement;
      const googleMap = new google.maps.Map(mapElement, {
        center: { lat: 45.5017, lng: -73.5673 },
        zoom: 13,
      });
      setMap(googleMap);

      const googleMarker = new google.maps.Marker({
        map: googleMap,
      });
      setMarker(googleMarker);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          setError('Please select a valid address.');
          setCoordinates(null);
          return;
        }

        const location = place.geometry.location;
        setAddress(place.formatted_address || '');
        setCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        });
        setError(''); // Clear any previous error

        // Center map on selected location
        googleMap.setCenter(location);
        googleMarker.setPosition(location);
      });
    };

    initAutocomplete();
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handlePlanDelivery = () => {
    if (!coordinates) {
      setError('Please select a valid address.');
      return;
    }
    if (!weight || parseFloat(weight) <= 0) {
      setError('Please enter a valid package weight.');
      return;
    }

    // Check if address is within the delivery radius
    const distanceFromMontreal = calculateDistance(
      coordinates.lat,
      coordinates.lng,
      MONTREAL_CENTER.lat,
      MONTREAL_CENTER.lng
    );

    if (distanceFromMontreal > DELIVERY_RADIUS_KM) {
      setError(`Sorry, the selected address is outside the delivery area (${DELIVERY_RADIUS_KM} km radius).`);
      return;
    }

    // Find the nearest warehouse
    let minDistance = Infinity;
    let nearest = null;

    for (const warehouse of warehouses) {
      const distance = calculateDistance(
        coordinates.lat,
        coordinates.lng,
        warehouse.lat,
        warehouse.lng
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = warehouse;
      }
    }

    setNearestWarehouse(nearest);

    // Calculate price
    const distanceCost = minDistance * 0.5; // $0.5 per km
    const weightCost = parseFloat(weight) * 1; // $1 per kg
    const totalPrice = 5 + distanceCost + weightCost; // Base price + distance + weight
    setPrice(totalPrice);

    // Redirect to checkout with price
    router.push({
      pathname: '/checkout',
      query: { amount: totalPrice.toFixed(2) },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Plan Your Delivery</h1>
      <div style={styles.formGroup}>
        <label htmlFor="autocomplete" style={styles.label}>
          Delivery Address:
        </label>
        <input
          id="autocomplete"
          type="text"
          placeholder="Enter your delivery address"
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="weight" style={styles.label}>
          Package Weight (kg):
        </label>
        <input
          id="weight"
          type="number"
          placeholder="Enter weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
        />
      </div>
      <div id="map" style={styles.map}></div>
      <button onClick={handlePlanDelivery} style={styles.button}>
        Plan Delivery
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default PaymentDelivery;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  map: {
    height: '400px',
    width: '100%',
    marginBottom: '15px',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#2ecc71',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: '#ff0000',
    marginTop: '10px',
    textAlign: 'center',
  },
};
