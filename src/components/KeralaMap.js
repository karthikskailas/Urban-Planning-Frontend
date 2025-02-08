import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const KeralaMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetch the Kerala GeoJSON data from an online source
    fetch("https://raw.githubusercontent.com/tonywr71/geojson-map-data/master/india/kerala.json")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  return (
    <MapContainer center={[10.8505, 76.2711]} zoom={7} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && <GeoJSON data={geoJsonData} />}
    </MapContainer>
  );
};

export default KeralaMap;
