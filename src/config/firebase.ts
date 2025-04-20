// firebase.ts

import { initializeApp } from "firebase/app";
import {
    getMessaging,
    getToken,
    onMessage,
    MessagePayload,
} from "firebase/messaging";

// Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyB0xXdhM41MhDsdxxQCb7AGJYlNQ9-3FaY",
    authDomain: "drbooking-supmtipfa.firebaseapp.com",
    projectId: "drbooking-supmtipfa",
    storageBucket: "drbooking-supmtipfa.appspot.com",
    messagingSenderId: "606502321745",
    appId: "1:606502321745:web:214aac73f84b4b4c3f0270",
    measurementId: "G-MBVLPV0SE4",
};

// Load VAPID key from environment
export const FIREBASE_VAPID_KEY: string = import.meta.env.VITE_VAPID_KEY;

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize messaging
const messaging = getMessaging(app);

// Request for push token
export const requestForToken = async (): Promise<string | null> => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: FIREBASE_VAPID_KEY,
        });
        if (currentToken) {
            return currentToken;
        } else {
            alert("No registration token available. Request permission to generate one.");
            return null;
        }
    } catch (err) {
        alert("An error occurred while retrieving token: " + (err as Error).message);
        return null;
    }
};

// Handle foreground messages
onMessage(messaging, (payload: MessagePayload) => {
    const { notification } = payload;
    if (notification) {
        new Notification(notification.title ?? "Notification", {
            body: notification.body,
            icon: notification.icon,
        });
    }
});
