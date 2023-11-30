export const setLocalStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(key: string): T | undefined => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value) as T;
};
