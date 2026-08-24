export const browserStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const value = window.localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // La experiencia debe seguir funcionando aunque el almacenamiento esté bloqueado.
    }
  },

  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Sin acción: es una mejora local, no un requisito para navegar.
    }
  },
};
