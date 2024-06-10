import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Geolocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [destination, setDestination] = useState({ lat: '', lon: '' }); // Destination input state
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [destinationName, setDestinationName] = useState("Enter coordinates to get name");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining geolocation:", error);
          // Fallback ke lokasi manual jika geolocation gagal
          const jakartaCoords = { lat: -6.2088, lon: 106.8456 };
          setLocation(jakartaCoords);
        }
      );
    } else {
      // Fallback ke lokasi manual jika geolocation tidak didukung
      const jakartaCoords = { lat: -6.2088, lon: 106.8456 };
      setLocation(jakartaCoords);
    }
  }, []);

  const handleCalculateDistance = async () => {
    if (location.lat !== null && location.lon !== null && destination.lat && destination.lon) {
      const url = `http://router.project-osrm.org/route/v1/driving/${location.lon},${location.lat};${destination.lon},${destination.lat}?overview=full&geometries=geojson`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRoute(routeCoords);
          setDistance(data.routes[0].distance / 1000); // distance in kilometers
        } else {
          console.error("No route found or invalid response structure");
          setRoute([]);
          setDistance(null);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
        setRoute([]);
        setDistance(null);
      }
    } else {
      alert("Please enter valid coordinates for destination.");
    }
  };

  const fetchDestinationName = async () => {
    if (destination.lat && destination.lon) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${destination.lat}&lon=${destination.lon}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.display_name) {
          setDestinationName(data.display_name);
        } else {
          setDestinationName("Unknown location");
        }
      } catch (error) {
        console.error("Error fetching destination name:", error);
        setDestinationName("Error fetching name");
      }
    }
  };

  useEffect(() => {
    fetchDestinationName();
  }, [destination]);

  return (
    <div>
      <h1>Geolocation API Example</h1>
      <div>
        <h2>Your Location:</h2>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lon}</p>
      </div>
      <div>
        <h2>Destination:</h2>
        <input
          type="text"
          placeholder="Latitude"
          value={destination.lat}
          onChange={(e) => setDestination({ ...destination, lat: e.target.value })}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={destination.lon}
          onChange={(e) => setDestination({ ...destination, lon: e.target.value })}
        />
        <button onClick={handleCalculateDistance}>Calculate Distance to Destination</button>
        <p>{destinationName}</p>
      </div>
      {distance !== null && (
        <div>
          <h2>Distance to Destination:</h2>
          <p>{distance.toFixed(2)} km</p>
        </div>
      )}
      {location.lat && location.lon && (
        <MapContainer center={[location.lat, location.lon]} zoom={8} style={{ height: '600px', width: '800px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {location.lat && location.lon && (
            <Marker position={[location.lat, location.lon]}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
          {destination.lat && destination.lon && (
            <Marker position={[destination.lat, destination.lon]}>
              <Popup>{destinationName}</Popup>
            </Marker>
          )}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
        </MapContainer>
      )}
    </div>
  );
};

export default Geolocation;
