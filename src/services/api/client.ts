const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new Error("El backend todavía no está configurado para esta fase.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`La solicitud falló (${response.status}).`);
  }

  return response.json() as Promise<T>;
}
