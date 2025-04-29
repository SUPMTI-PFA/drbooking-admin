import { useEffect, useState, useCallback } from "react";
import { decrypt, encrypt } from "./cryptoHelper";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "fallback-secret-key";

export const useLocalStorage = <T>(
  keyName: string,
  defaultValue: T
) => {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isAlive = true;
    const loadValue = async () => {
      try {
        // 1. Try localStorage first, then sessionStorage
        const encrypted =
          localStorage.getItem(keyName) ??
          sessionStorage.getItem(keyName);

        if (encrypted) {
          const decrypted = await decrypt(encrypted, SECRET_KEY);
          const parsed: T = JSON.parse(decrypted);

          if (parsed != null) {
            isAlive && setStoredValue(parsed);
          } else {
            // corrupted/null → remove entirely
            localStorage.removeItem(keyName);
            sessionStorage.removeItem(keyName);
            isAlive && setStoredValue(defaultValue);
          }

        } else {
          // Nothing stored yet → use default, but don't auto-persist
          isAlive && setStoredValue(defaultValue);
        }
      } catch (err) {
        console.error("Error loading encrypted data:", err);
        isAlive && setStoredValue(defaultValue);
      } finally {
        isAlive && setInitialized(true);
      }
    };

    loadValue();
    return () => { isAlive = false; };
  }, [keyName]); // <-- no defaultValue here to avoid extra reloads

  const setValue = useCallback(
    async (
      value: T | ((prev: T) => T),
      rememberMe = false
    ) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        if (valueToStore == null) {
          // clear both stores
          localStorage.removeItem(keyName);
          sessionStorage.removeItem(keyName);

        } else {
          // encrypt once
          const encrypted = await encrypt(
            JSON.stringify(valueToStore),
            SECRET_KEY
          );

          if (rememberMe) {
            localStorage.setItem(keyName, encrypted);
            sessionStorage.removeItem(keyName);
          } else {
            sessionStorage.setItem(keyName, encrypted);
            localStorage.removeItem(keyName);
          }
        }

        setStoredValue(valueToStore);
      } catch (err) {
        console.error("Error setting encrypted data:", err);
      }
    },
    [keyName, storedValue]
  );

  return [storedValue, setValue, initialized] as const;
};
