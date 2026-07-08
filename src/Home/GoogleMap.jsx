import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Service areas to highlight
const SERVICE_AREAS = [
  'Tirupattur District',
  'Krishnagiri District',
  'Vellore District',
  'Dharmapuri District',
  'Tiruvannamalai District',
];

// Small helper to fetch GeoJSON from Nominatim (OpenStreetMap)
async function fetchGeoJSONForPlace(name) {
  // Nominatim search for polygon geometry in GeoJSON format
  const q = encodeURIComponent(`${name}, Tamil Nadu, India`);
  const url = `https://nominatim.openstreetmap.org/search.php?q=${q}&format=geojson&polygon_geojson=1&limit=1`;
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Nominatim error');
    const data = await res.json();
    if (data && data.features && data.features.length > 0) return data.features[0];
    return null;
  } catch (err) {
    console.warn('Failed to fetch GeoJSON for', name, err);
    return null;
  }
}

function FitBounds({ geoJsons }) {
  const map = useMap();
  useEffect(() => {
    const layers = geoJsons
      .map((g) => {
        if (!g) return null;
        try {
          return L.geoJSON(g.geometry);
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);

    if (layers.length === 0) return;
    const group = L.featureGroup(layers);
    map.fitBounds(group.getBounds().pad(0.1));
    // cleanup
    return () => {
      group.clearLayers();
    };
  }, [geoJsons, map]);
  return null;
}

export default function GoogleMap() {
  const [areas, setAreas] = useState([]); // { name, feature }
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const load = async () => {
      const results = [];
      for (let i = 0; i < SERVICE_AREAS.length; i++) {
        const name = SERVICE_AREAS[i];
        // be polite to Nominatim: small delay
        // eslint-disable-next-line no-await-in-loop
        const feature = await fetchGeoJSONForPlace(name);
        results.push({ name, feature });
        // small delay between requests
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 350));
        if (!mountedRef.current) break;
      }
      if (mountedRef.current) setAreas(results);
    };
    load();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const geoJsons = areas.map((a) => a.feature).filter(Boolean);
  const center = [12.5, 78.5]; // fallback center around Tamil Nadu inland

  const polygonStyle = {
    color: '#0c5940',
    weight: 2,
    fillColor: '#0c5940',
    fillOpacity: 0.12,
  };

  const highlightStyle = {
    color: '#38B6FF',
    weight: 2.5,
    fillColor: '#38B6FF',
    fillOpacity: 0.18,
  };

  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-gray-200 shadow-md">
      <MapContainer center={center} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds geoJsons={geoJsons.map((g) => (g ? { geometry: g.geometry } : null)).filter(Boolean)} />

        {areas.map((a, idx) => {
          if (!a.feature) return (
            <Marker key={`m-${idx}`} position={center}>
              <Popup>
                {a.name} — boundary not found; zoom or search to locate.
              </Popup>
            </Marker>
          );

          const geom = a.feature.geometry;

          return (
            <GeoJSON
              key={`g-${idx}`}
              data={geom}
              style={polygonStyle}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle(highlightStyle);
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle(polygonStyle);
                },
                click: (e) => {
                  const layer = e.target;
                  layer.bindPopup(`<strong>${a.name}</strong>`).openPopup();
                },
              }}
            />
          );
        })}

      </MapContainer>
    </div>
  );
}