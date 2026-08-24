export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeAnswer(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("es-AR")
    .replace(/\s+/g, " ");
}

export function formatDistance(metres: number) {
  if (metres < 1_000) return `${Math.round(metres)} m`;
  return `${(metres / 1_000).toFixed(1).replace(".", ",")} km`;
}

export function formatDuration(seconds: number) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours} h ${remainder ? `${remainder} min` : ""}`.trim();
}
