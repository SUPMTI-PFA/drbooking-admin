importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB0xXdhM41MhDsdxxQCb7AGJYlNQ9-3FaY",
  authDomain: "drbooking-supmtipfa.firebaseapp.com",
  projectId: "drbooking-supmtipfa",
  storageBucket: "drbooking-supmtipfa.appspot.com",
  messagingSenderId: "606502321745",
  appId: "1:606502321745:web:214aac73f84b4b4c3f0270",
  measurementId: "G-MBVLPV0SE4"
});

const messaging = firebase.messaging();
