import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

// Fix default marker icon issue with Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapProps {
  latitude: string;
  longitude: string;
  onCoordinatesChange: (lat: number, lng: number) => void;
  onAreaChange: (area: number) => void;
}

const Map = ({ latitude, longitude, onCoordinatesChange, onAreaChange }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainer.current).setView(
      [parseFloat(latitude), parseFloat(longitude)],
      13
    );

    mapRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Initialize feature group for drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    // Add draw control
    const drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: {
            color: "#3b82f6",
            fillOpacity: 0.3,
          },
        },
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: {
          shapeOptions: {
            color: "#3b82f6",
            fillOpacity: 0.3,
          },
        },
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);

    // Handle draw created
    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      // Calculate area in square meters
      if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
        const latLngs = layer.getLatLngs();
        const coords = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;
        const area = L.GeometryUtil.geodesicArea(coords as L.LatLng[]);
        onAreaChange(Math.round(area));
      }
    });

    // Handle draw edited
    map.on(L.Draw.Event.EDITED, (e: any) => {
      const layers = e.layers;
      layers.eachLayer((layer: any) => {
        if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
          const latLngs = layer.getLatLngs();
          const coords = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;
          const area = L.GeometryUtil.geodesicArea(coords as L.LatLng[]);
          onAreaChange(Math.round(area));
        }
      });
    });

    // Handle draw deleted
    map.on(L.Draw.Event.DELETED, () => {
      if (drawnItems.getLayers().length === 0) {
        onAreaChange(0);
      }
    });

    // Handle map click to update coordinates
    map.on("click", (e: L.LeafletMouseEvent) => {
      onCoordinatesChange(e.latlng.lat, e.latlng.lng);
    });

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map center when coordinates change externally
  useEffect(() => {
    if (mapRef.current) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        mapRef.current.setView([lat, lng], mapRef.current.getZoom());
      }
    }
  }, [latitude, longitude]);

  const handleRecenter = () => {
    if (mapRef.current) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        mapRef.current.setView([lat, lng], 13, { animate: true });
      }
    }
  };

  const handleClearDrawing = () => {
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
      onAreaChange(0);
    }
  };

  // Expose methods via ref for parent component
  useEffect(() => {
    (window as any).mapControls = {
      recenter: handleRecenter,
      clearDrawing: handleClearDrawing,
    };
  }, [latitude, longitude]);

  return (
    <div ref={mapContainer} className="w-full h-96 rounded-lg border border-border shadow-sm" />
  );
};

export default Map;
