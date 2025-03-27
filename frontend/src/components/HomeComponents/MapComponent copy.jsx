// MapComponent.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/HomeStyles/Map.css";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

const MapZoomOnHover = ({ hoveredPG }) => {
  const map = useMap();

  useEffect(() => {
    if (hoveredPG) {
      const coordinates = hoveredPG.location.coordinates;
      map.setView(coordinates, map.getZoom(), {
        animate: true,
      });
    }
  }, [hoveredPG, map]);

  return null;
};

const MapComponent = ({ pgData, hoveredPG }) => {
  return (
    <div className="map-container newmap">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={20}
        // style={{ height: "800PX", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {pgData.map((pg, index) => (
          <Marker key={index} position={pg.location.coordinates}>
            <Popup>{pg.name}</Popup>
          </Marker>
        ))}

        {hoveredPG && <MapZoomOnHover hoveredPG={hoveredPG} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
