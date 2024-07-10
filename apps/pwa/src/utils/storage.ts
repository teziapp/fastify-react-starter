export const getItem = <T>(key: string): T | null => {
  let value = null;
  try {
    const result = window.localStorage.getItem(key);
    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

export const getStringItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
export const clearItems = () => {
  localStorage.clear();
};
