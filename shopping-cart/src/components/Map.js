import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Map.css';

const Map = ({ onPlaceSelect, street, streetNumber, city }) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [zoom, setZoom] = useState(12);
  const isMarkerDrag = useRef(false);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Función para cargar el script de Google Maps
  const loadGoogleMapsScript = useCallback(() => {
    if (window.google) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }, [apiKey]);

  const initializeMap = useCallback((initialPosition) => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialPosition,
      zoom,
      disableDefaultUI: true,
    });
    setMap(mapInstance);

    const markerInstance = new window.google.maps.Marker({
      position: initialPosition,
      map: mapInstance,
      draggable: true,
    });
    setMarker(markerInstance);

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
    autocomplete.setFields(['address_components', 'geometry', 'formatted_address']);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        mapInstance.setCenter(location);
        markerInstance.setPosition(location);
        onPlaceSelect(place);
        setSelectedAddress(place.formatted_address);
      }
    });

    markerInstance.addListener('dragstart', () => {
      isMarkerDrag.current = true;
    });

    markerInstance.addListener('dragend', () => {
      const geocoder = new window.google.maps.Geocoder();
      const newPosition = markerInstance.getPosition();
      mapInstance.setCenter(newPosition);
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === 'OK' && results[0]) {
          onPlaceSelect(results[0]);
          searchInputRef.current.value = results[0].formatted_address;
          setSelectedAddress(results[0].formatted_address);
        }
        isMarkerDrag.current = false;
      });
    });
  }, [onPlaceSelect, zoom]);

  const geocodeAddress = useCallback(() => {
    if (isMarkerDrag.current || (!street && !streetNumber && !city) || !map || !marker) return;

    const address = `${street} ${streetNumber}, ${city}`;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        marker.setPosition(location);
        searchInputRef.current.value = results[0].formatted_address;
        setSelectedAddress(results[0].formatted_address);
      }
    });
  }, [street, streetNumber, city, map, marker]);

  useEffect(() => {
    const handler = setTimeout(() => {
      geocodeAddress();
    }, 1000);
    return () => clearTimeout(handler);
  }, [street, streetNumber, city, geocodeAddress]);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        const setDefaultPosition = () => {
          const defaultPosition = { lat: -34.6037, lng: -58.3816 };
          initializeMap(defaultPosition);
        };

        const initializeWithGeolocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userPosition = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                initializeMap(userPosition);
              },
              setDefaultPosition
            );
          } else {
            setDefaultPosition();
          }
        };

        if (street && streetNumber && city) {
          const geocoder = new window.google.maps.Geocoder();
          const address = `${street} ${streetNumber}, ${city}`;
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results[0]) {
              initializeMap(results[0].geometry.location);
              setSelectedAddress(results[0].formatted_address);
            } else {
              initializeWithGeolocation();
            }
          });
        } else {
          initializeWithGeolocation();
        }
      })
      .catch(() => {
        console.error('Failed to load Google Maps script');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    map.setZoom(zoom);
  }, [zoom, map]);

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener('zoom_changed', () => {
      setZoom(map.getZoom());
    });
    return () => window.google.maps.event.removeListener(listener);
  }, [map]);

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  return (
    <div className="map-container">
      <input ref={searchInputRef} type="text" placeholder="Buscar dirección..." className="map-search-input" />
      <div ref={mapRef} className="map-canvas" />
      <input
        type="range"
        min="1"
        max="20"
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="zoom-slider"
      />
      {selectedAddress && (
        <div className="floating-address-label">
          <LocationIcon />
          <span>{selectedAddress}</span>
        </div>
      )}
    </div>
  );
};

export default Map;
