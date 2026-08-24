export type Place = {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  category: string;
  image?: string;
  icon?: string;
};

export type GeocodingResult = {
  id: string;
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
  category?: string;
};
