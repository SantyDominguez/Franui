import { MapPin } from "lucide-react";
import type { Place } from "../../types/place";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="rounded-2xl border border-white/75 bg-white/70 p-5">
      <MapPin className="text-primary" size={21} />
      <h3 className="mt-3 font-display text-xl text-ink">{place.name}</h3>
      {place.description && <p className="mt-2 text-sm text-muted">{place.description}</p>}
    </article>
  );
}
