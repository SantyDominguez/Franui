import { CalendarDays } from "lucide-react";

type EventCardProps = {
  title: string;
  date: string;
  place?: string;
};

export function EventCard({ title, date, place }: EventCardProps) {
  return (
    <article className="rounded-2xl border border-white/75 bg-white/70 p-5">
      <CalendarDays className="text-primary" size={21} />
      <h3 className="mt-3 font-display text-xl text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{date}{place ? ` · ${place}` : ""}</p>
    </article>
  );
}
