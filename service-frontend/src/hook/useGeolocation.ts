import { useState, useEffect } from 'react';

interface LocationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const useGeolocation = (): LocationType => {
  const [location, setLocation] = useState<LocationType>(() => {
    const cachedLocation = localStorage.getItem('userLocation');
    return cachedLocation
      ? { loaded: true, coordinates: JSON.parse(cachedLocation) }
      : { loaded: false, coordinates: { lat: 37.4979, lng: 127.0276 } };
  });

  const onSuccess = (location: { coords: { latitude: number; longitude: number } }) => {
    const coordinates = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    localStorage.setItem('userLocation', JSON.stringify(coordinates));
    setLocation({
      loaded: true,
      coordinates,
    });
  };

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!location.loaded || !location.coordinates) {
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
    }
  }, [location.loaded]);

  return location;
};

export default useGeolocation;
