declare namespace google.maps {
  type LatLngLiteral = {
    lat: number;
    lng: number;
  };

  type Padding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  type MapOptions = {
    center?: LatLngLiteral;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
    clickableIcons?: boolean;
    gestureHandling?: "auto" | "cooperative" | "greedy" | "none";
    keyboardShortcuts?: boolean;
  };

  interface MapsEventListener {
    remove(): void;
  }

  class Map {
    constructor(container: HTMLElement, options?: MapOptions);
    addListener(eventName: string, handler: () => void): MapsEventListener;
    fitBounds(bounds: LatLngBounds, padding?: number | Padding): void;
    panTo(position: LatLngLiteral): void;
    setCenter(position: LatLngLiteral): void;
    setZoom(zoom: number): void;
  }

  type CircleOptions = {
    map?: Map;
    center?: LatLngLiteral;
    radius?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    clickable?: boolean;
  };

  class Circle {
    constructor(options?: CircleOptions);
    getBounds(): LatLngBounds | null;
    setCenter(center: LatLngLiteral): void;
    setMap(map: Map | null): void;
    setOptions(options: CircleOptions): void;
    setRadius(radius: number): void;
  }

  class LatLngBounds {
    extend(position: LatLngLiteral): LatLngBounds;
  }

  namespace marker {
    type AdvancedMarkerElementOptions = {
      map?: Map;
      position?: LatLngLiteral;
      title?: string;
      content?: Node;
    };

    class AdvancedMarkerElement {
      constructor(options?: AdvancedMarkerElementOptions);
      map: Map | null;
      position: LatLngLiteral | null;
    }
  }
}

interface Window {
  google?: { maps: typeof google.maps };
  gm_authFailure?: () => void;
  __franuiGoogleMapsReady?: () => void;
}
