import { useState, useEffect } from "react";
import { requestForToken } from "@/config/firebase";

export default function useNotification() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const initNotification = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await requestForToken();
        if (fcmToken) {
          setToken(fcmToken);
        }
      }
    };

    initNotification();
  }, []);

  return token;
}
