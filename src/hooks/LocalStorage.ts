import { useState } from "react";
import CryptoJS from "crypto-js";

export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
  const secretKey = import.meta.env.REACT_APP_SECRET_KEY;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const localValue = window.localStorage.getItem(keyName);
      const sessionValue = window.sessionStorage.getItem(keyName);

      if (localValue) {
        const decryptedValue = CryptoJS.AES.decrypt(localValue, secretKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedValue) as T;
      } else if (sessionValue) {
        const decryptedValue = CryptoJS.AES.decrypt(sessionValue, secretKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedValue) as T;
      } else {
        // Store defaultValue in localStorage by default
        const encryptDefaultValue = CryptoJS.AES.encrypt(JSON.stringify(defaultValue), secretKey).toString();
        window.localStorage.setItem(keyName, encryptDefaultValue);
        return defaultValue;
      }
    } catch (err) {
      console.error('Error retrieving value from storage:', err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T | ((prevState: T) => T), rememberMe?: boolean) => {
    try {
      // Handle null value: remove key from both storages
      if (newValue === null) {
        window.localStorage.removeItem(keyName);
        window.sessionStorage.removeItem(keyName);
        setStoredValue(newValue);
        return;
      }

      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;
      const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(valueToStore), secretKey).toString();

      // Store in the appropriate storage
      if (rememberMe) {
        window.localStorage.setItem(keyName, encryptedValue);
        // Optionally, remove from sessionStorage if it exists
        window.sessionStorage.removeItem(keyName);
      } else {
        window.sessionStorage.setItem(keyName, encryptedValue);
        // Optionally, remove from localStorage if it exists
        window.localStorage.removeItem(keyName);
      }

      setStoredValue(valueToStore);
    } catch (err) {
      console.error('Error setting value in storage:', err);
    }
  };

  return [storedValue, setValue] as const;
};
