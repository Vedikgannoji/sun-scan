import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateSunPosition } from "@/lib/solarCalculations";

interface Map3DProps {
  latitude: string;
  longitude: string;
  onCoordinatesChange: (lat: number, lng: number) => void;
  onAreaChange: (area: number) => void;
}

const Map3D = ({ latitude, longitude, onCoordinatesChange, onAreaChange }: Map3DProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const drawnPolygonRef = useRef<any>(null);

  const initializeMap = () => {
    if (!mapContainer.current || mapRef.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [parseFloat(longitude), parseFloat(latitude)],
      zoom: 18,
      pitch: 60,
      bearing: 0,
      antialias: true,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add 3D buildings
    map.on("load", () => {
      // Add 3D terrain
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // Add 3D buildings layer
      const layers = map.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === "symbol" && layer.layout?.["text-field"]
      )?.id;

      map.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );

      // Add sun visualization
      addSunVisualization(map, parseFloat(latitude), parseFloat(longitude));
      setIsMapInitialized(true);
    });

    // Handle map clicks for drawing polygon
    map.on("click", (e) => {
      onCoordinatesChange(e.lngLat.lat, e.lngLat.lng);
    });
  };

  const addSunVisualization = (map: mapboxgl.Map, lat: number, lng: number) => {
    const sunPos = calculateSunPosition(lat, lng);
    
    // Add a light source representing the sun
    if (map.getLayer("sky")) map.removeLayer("sky");
    if (map.getSource("sky")) map.removeSource("sky");

    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [sunPos.azimuth, sunPos.altitude],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
  };

  const drawPolygon = () => {
    if (!mapRef.current) return;

    // Simple rectangle drawing for demo
    const center = mapRef.current.getCenter();
    const offset = 0.001;
    
    const coordinates = [
      [center.lng - offset, center.lat - offset],
      [center.lng + offset, center.lat - offset],
      [center.lng + offset, center.lat + offset],
      [center.lng - offset, center.lat + offset],
      [center.lng - offset, center.lat - offset],
    ];

    if (drawnPolygonRef.current) {
      mapRef.current.removeLayer("polygon-fill");
      mapRef.current.removeLayer("polygon-outline");
      mapRef.current.removeSource("polygon");
    }

    mapRef.current.addSource("polygon", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates],
        },
        properties: {},
      },
    });

    mapRef.current.addLayer({
      id: "polygon-fill",
      type: "fill",
      source: "polygon",
      paint: {
        "fill-color": "#3b82f6",
        "fill-opacity": 0.4,
      },
    });

    mapRef.current.addLayer({
      id: "polygon-outline",
      type: "line",
      source: "polygon",
      paint: {
        "line-color": "#3b82f6",
        "line-width": 3,
      },
    });

    drawnPolygonRef.current = true;

    // Calculate approximate area (simplified)
    const area = calculatePolygonArea(coordinates);
    onAreaChange(Math.round(area));
  };

  const calculatePolygonArea = (coords: number[][]): number => {
    // Simplified area calculation for demo
    // In production, use turf.js or similar for accurate geodesic area
    const latDiff = Math.abs(coords[0][1] - coords[2][1]);
    const lngDiff = Math.abs(coords[0][0] - coords[2][0]);
    const metersPerDegree = 111000;
    return latDiff * lngDiff * metersPerDegree * metersPerDegree;
  };

  const clearDrawing = () => {
    if (!mapRef.current || !drawnPolygonRef.current) return;
    
    try {
      if (mapRef.current.getLayer("polygon-fill")) mapRef.current.removeLayer("polygon-fill");
      if (mapRef.current.getLayer("polygon-outline")) mapRef.current.removeLayer("polygon-outline");
      if (mapRef.current.getSource("polygon")) mapRef.current.removeSource("polygon");
      drawnPolygonRef.current = null;
      onAreaChange(0);
    } catch (e) {
      console.error("Error clearing drawing:", e);
    }
  };

  const recenterMap = () => {
    if (!mapRef.current) return;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 18,
        pitch: 60,
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (mapRef.current && isMapInitialized) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        addSunVisualization(mapRef.current, lat, lng);
      }
    }
  }, [latitude, longitude, isMapInitialized]);

  // Expose methods
  useEffect(() => {
    (window as any).map3DControls = {
      recenter: recenterMap,
      clearDrawing: clearDrawing,
      drawPolygon: drawPolygon,
    };
  }, [latitude, longitude]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-96 rounded-lg border border-border p-6 flex flex-col items-center justify-center space-y-4 bg-muted/30">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">3D Map Setup Required</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to enable 3D visualization
            </p>
            <p className="text-xs text-muted-foreground">
              Get your token at{" "}
              <a
                href="https://mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <Button onClick={() => initializeMap()} className="w-full">
            Initialize 3D Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div ref={mapContainer} className="w-full h-96 rounded-lg border border-border shadow-sm" />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={drawPolygon}>
          Draw Area
        </Button>
      </div>
    </div>
  );
};

export default Map3D;
