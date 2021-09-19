export class LocalStorageService {
  public static get<T>(key: string, def?: T): T | undefined {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : def;
  }

  public static set<T>(key: string, val: T) {
    window.localStorage.setItem(key, JSON.stringify(val));
  }

  public static remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
