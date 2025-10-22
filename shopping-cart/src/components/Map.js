import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

const Map = ({ onPlaceSelect }) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps script not loaded");
      return;
    }

    const initialPosition = { lat: -34.510525, lng: -58.699404 }; // Juan María Gutiérrez 1150

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialPosition,
      zoom: 12,
    });
    setMap(mapInstance);

    const markerInstance = new window.google.maps.Marker({
      position: initialPosition,
      map: mapInstance,
      draggable: true,
    });
    setMarker(markerInstance);

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
    autocomplete.setFields(['address_components', 'geometry']);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        mapInstance.setCenter(location);
        markerInstance.setPosition(location);
        onPlaceSelect(place);
      }
    });

    markerInstance.addListener('dragend', () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: markerInstance.getPosition() }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    onPlaceSelect(results[0]);
                    searchInputRef.current.value = results[0].formatted_address;
                }
            }
        });
    });

  }, [onPlaceSelect]);

  return (
    <div className="map-container">
      <input ref={searchInputRef} type="text" placeholder="Buscar dirección..." className="map-search-input" />
      <div ref={mapRef} className="map-canvas" />
    </div>
  );
};

export default Map;
