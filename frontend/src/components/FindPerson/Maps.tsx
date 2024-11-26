import React, { useEffect, useState } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";

interface User {
  id: number;
  name: string;
  description: string;
  location: [number, number];
}

const Maps = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "User 1",
      description: "This is User 1's profile",
      location: [59.9342802, 30.3350986], // Saint Petersburg
    },
    {
      id: 2,
      name: "User 2",
      description: "This is User 2's profile",
      location: [59.9500154, 30.3165996], // Saint Petersburg
    },
  ]);

  // Get user location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to display user profile on marker click
  const handleMarkerClick = (user: User) => {
    alert(`Name: ${user.name}\nDescription: ${user.description}`);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        defaultState={{ center: [59.9342802, 30.3350986], zoom: 12 }} // Centered on Saint Petersburg
        width="100%"
        height="100%"
      >
        {/* User location */}
        {userLocation && (
          <Placemark
            geometry={userLocation}
            properties={{
              hintContent: "You are here!",
              balloonContent: "This is your current location.",
            }}
            options={{
              preset: "islands#blueDotIcon",
            }}
          />
        )}

        {/* Other locations */}
        {users.map((user) => (
          <Placemark
            key={user.id}
            geometry={user.location}
            properties={{
              hintContent: user.name,
              balloonContent: user.description,
            }}
            options={{
              preset: "islands#redIcon",
            }}
            onClick={() => handleMarkerClick(user)}
          />
        ))}
      </Map>
    </div>
  );
};

export default Maps;
