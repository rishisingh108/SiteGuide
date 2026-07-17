import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Free, no-API-key dark basemap (CARTO Dark Matter tiles over OpenStreetMap data)
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const STATUS_COLORS = {
  ongoing:   '#34C759',
  completed: '#007AFF',
  delayed:   '#FF3B30',
};

const SUPPLIER_COLORS = {
  cement: '#FF9500',
  steel:  '#007AFF',
  bricks: '#8B4513',
};

function makeSupplierIcon(color) {
  // Colored teardrop pin as an inline SVG divIcon — no external image assets needed
  const svg = `
    <svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C6 0 0 5.8 0 13c0 9.5 13 21 13 21s13-11.5 13-21c0-7.2-6-13-13-13z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="13" cy="13" r="5" fill="#fff"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: 'siteguide-pin',
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -30],
  });
}

export default function MapView({
  projects, suppliers, supplierFilter,
  selectedSite, selectedProject,
  onMapClick, onProjectClick,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({ site: null, projects: [], suppliers: [] });

  // Initialise map
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [28.6139, 77.2090],
      zoom: 11,
      zoomControl: false,
      attributionControl: true,
    });

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    map.on('click', (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    });

    mapInstanceRef.current = map;

    // Plot projects
    projects.forEach((p) => {
      const marker = L.circleMarker([p.lat, p.lng], {
        radius: 9,
        fillColor: STATUS_COLORS[p.status] || '#007AFF',
        fillOpacity: 0.95,
        color: '#fff',
        weight: 2,
      }).addTo(map);
      marker.bindTooltip(p.name, { direction: 'top', offset: [0, -8] });
      marker.on('click', () => onProjectClick(p));
      markersRef.current.projects.push(marker);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update supplier markers when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.suppliers.forEach((m) => map.removeLayer(m));
    markersRef.current.suppliers = [];

    const filtered = supplierFilter === 'all' ? suppliers : suppliers.filter((s) => s.type === supplierFilter);
    filtered.forEach((s) => {
      const marker = L.marker([s.lat, s.lng], {
        icon: makeSupplierIcon(SUPPLIER_COLORS[s.type] || '#007AFF'),
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:sans-serif;padding:2px 2px;min-width:150px;">
          <b style="color:#1c1c1e;font-size:13px;">${s.name}</b>
          <div style="color:#555;font-size:11px;margin-top:4px;">${s.type.toUpperCase()} &middot; ${s.price}</div>
          <div style="color:#888;font-size:11px;">Delivery: ${s.delivery}</div>
        </div>
      `);
      markersRef.current.suppliers.push(marker);
    });
  }, [suppliers, supplierFilter]);

  // Update selected site marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (markersRef.current.site) {
      map.removeLayer(markersRef.current.site);
      markersRef.current.site = null;
    }
    if (!selectedSite) return;

    const marker = L.circleMarker([selectedSite.lat, selectedSite.lng], {
      radius: 14,
      fillColor: '#007AFF',
      fillOpacity: 0.3,
      color: '#007AFF',
      weight: 3,
    }).addTo(map);
    markersRef.current.site = marker;
    map.panTo([selectedSite.lat, selectedSite.lng]);
  }, [selectedSite]);

  // Pan to selected project
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedProject) return;
    map.setView([selectedProject.lat, selectedProject.lng], 13, { animate: true });
  }, [selectedProject]);

  return (
    <div className="absolute inset-0">
      <div ref={mapRef} className="w-full h-full z-0" />
    </div>
  );
}
