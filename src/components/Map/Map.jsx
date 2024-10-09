import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import useUrlLocation from "../hooks/useUrlLocation";

export default function Map({ markerLocations }) {
  // const { hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const [lat, lng] = useUrlLocation();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) {
      console.log("Setting map center from URL location:", [lat, lng]);
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      console.log("Setting map center from geolocation:", [
        geoLocationPosition.lat,
        geoLocationPosition.lng,
      ]);
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={[lat || 50, lng || 3]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="getLocation">
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
      ,
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log("Map clicked at:", e.latlng);
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
