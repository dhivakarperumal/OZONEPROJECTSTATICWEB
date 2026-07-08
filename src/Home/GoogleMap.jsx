import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, RefreshCw, Maximize2 } from 'lucide-react';

// Service areas to highlight
const SERVICE_AREAS = [
  'Tirupattur District',
  'Krishnagiri District',
  'Vellore District',
  'Dharmapuri District',
  'Tiruvannamalai District',
];

const serviceIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

function getCenter(feature) {
  try {
    const layer = L.geoJSON(feature.geometry);
    return layer.getBounds().getCenter();
  } catch {
    return null;
  }
}

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

  // compute label offsets to avoid overlapping labels for close centers
  useEffect(() => {
    if (!areas || areas.length === 0) return;
    const centers = areas.map((a) => {
      if (!a.feature) return null;
      const c = computeCentroid(a.feature) || getCenter(a.feature);
      return c ? { lat: c.lat, lng: c.lng } : null;
    });
    const offsets = [];
    for (let i = 0; i < centers.length; i++) {
      const ci = centers[i];
      if (!ci) { offsets.push([12, 0]); continue; }
      let shiftCount = 0;
      for (let j = 0; j < i; j++) {
        const cj = centers[j];
        if (!cj) continue;
        const d = haversineKm(ci, cj);
        if (d < 12) shiftCount++; // if closer than ~12km, consider overlapping
      }
      // alternate up/down for multiple overlaps
      const yOffset = shiftCount === 0 ? 0 : ((shiftCount % 2 === 0) ? (10 * shiftCount) : (-10 * shiftCount));
      offsets.push([12, yOffset]);
    }
    setLabelOffsets(offsets);
  }, [areas]);

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

  const [map, setMap] = useState(null);
  const [labelOffsets, setLabelOffsets] = useState([]);

  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-gray-200 shadow-md relative">
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
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

          // compute a center point for the marker using a centroid helper (better than bounds)
          let centerPoint = computeCentroid(a.feature) || ((): any => {
            try { const tmp = L.geoJSON(geom); return tmp.getBounds().getCenter(); } catch { return null; }
          })();

          // custom red pin icon as inline SVG inside a divIcon
          const pinHtml = `
            <div style="display:flex;flex-direction:column;align-items:center;">
              <svg width=28 height=42 viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C7.03 0 3.333 3.697 3.333 8.667C3.333 15.333 12 36 12 36C12 36 20.667 15.333 20.667 8.667C20.667 3.697 16.97 0 12 0Z" fill="#D23F3F" stroke="#9b2b2b" stroke-width="0"/>
                <circle cx="12" cy="9" r="3.5" fill="white"/>
              </svg>
            </div>
          `;

          const pinIcon = L.divIcon({
            className: 'custom-pin-wrapper',
            html: pinHtml,
            iconSize: [28, 42],
            iconAnchor: [14, 42],
            popupAnchor: [0, -42],
          });

          return (
            <React.Fragment key={`g-${idx}`}>
              <GeoJSON
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

              {centerPoint && (
                <Marker position={[centerPoint.lat, centerPoint.lng]} icon={pinIcon} zIndexOffset={1000 + idx}>
                  <Tooltip direction="right" permanent offset={labelOffsets[idx] || [12, 0]} className="text-sm font-semibold">
                    {a.name}
                  </Tooltip>
                </Marker>
              )}
            </React.Fragment>
          );
        })}

      </MapContainer>

      {/* Bottom-right overlay controls (zoom-to-fit and locate) */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3 z-30">
        <button
          title="Zoom to service areas"
          onClick={() => {
            try {
              const layers = geoJsons
                .map((g) => (g ? L.geoJSON(g.geometry) : null))
                .filter(Boolean);
              if (layers.length === 0) return;
              const group = L.featureGroup(layers);
              map && map.fitBounds(group.getBounds().pad(0.1));
            } catch (e) {}
          }}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:scale-105 transition"
        >
          <Maximize2 size={18} />
        </button>

        <button
          title="Center on my location"
          onClick={() => {
            if (!map) return;
            map.locate({ setView: true, maxZoom: 12 });
          }}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:scale-105 transition"
        >
          <MapPin size={18} />
        </button>

        <button
          title="Refresh highlights"
          onClick={() => {
            // simple refresh: re-fetch boundaries by toggling state
            setAreas((s) => [...s]);
          }}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:scale-105 transition"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}

function computeCentroid(feature) {
  try {
    const geom = feature.geometry;
    if (geom.type === 'Polygon') {
      const ring = geom.coordinates[0];
      let sumX = 0, sumY = 0;
      for (let i = 0; i < ring.length; i++) {
        sumX += ring[i][1]; // lat
        sumY += ring[i][0]; // lng
      }
      const n = ring.length;
      return { lat: sumX / n, lng: sumY / n };
    }
    if (geom.type === 'MultiPolygon') {
      const ring = geom.coordinates[0][0];
      let sumX = 0, sumY = 0;
      for (let i = 0; i < ring.length; i++) {
        sumX += ring[i][1];
        sumY += ring[i][0];
      }
      const n = ring.length;
      return { lat: sumX / n, lng: sumY / n };
    }
    return null;
  } catch (e) {
    return null;
  }
}

function haversineKm(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aa = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}