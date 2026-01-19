import { useEffect, useState, useCallback } from "react";

interface FirebaseState {
  isReady: boolean;
  isInitialized: boolean;
  error: string | null;
}

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB5-gCHNUrg3KhfvHizZ5GIElf29D996Jg",
  authDomain: "tekaccess-logistics.firebaseapp.com",
  projectId: "tekaccess-logistics",
  storageBucket: "tekaccess-logistics.firebasestorage.app",
  messagingSenderId: "406376882578",
  appId: "1:406376882578:web:905382f56e3c363626214b",
  measurementId: "G-DZWWV9Q0TN"
};

let firebaseInitialized = false;

const initializeFirebase = (): boolean => {
  // @ts-expect-error Firebase is loaded from CDN
  const firebase = window.firebase;
  
  if (!firebase) {
    return false;
  }
  
  if (firebaseInitialized) {
    return true;
  }
  
  try {
    // Check if already initialized
    if (firebase.apps && firebase.apps.length > 0) {
      firebaseInitialized = true;
      return true;
    }
    
    firebase.initializeApp(firebaseConfig);
    firebaseInitialized = true;
    console.log("✅ Firebase initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    return false;
  }
};

export const useFirebase = () => {
  const [state, setState] = useState<FirebaseState>({
    isReady: false,
    isInitialized: false,
    error: null,
  });

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max

    const checkAndInit = () => {
      // @ts-expect-error Firebase is loaded from CDN
      if (window.firebase) {
        const success = initializeFirebase();
        if (success) {
          setState({ isReady: true, isInitialized: true, error: null });
          return true;
        }
      }
      return false;
    };

    if (checkAndInit()) {
      return;
    }

    const interval = setInterval(() => {
      attempts++;
      if (checkAndInit()) {
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setState({ 
          isReady: false, 
          isInitialized: false, 
          error: "Firebase SDK failed to load" 
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getFirestore = useCallback(() => {
    // @ts-expect-error Firebase is loaded from CDN
    const firebase = window.firebase;
    if (firebase && firebaseInitialized) {
      return firebase.firestore();
    }
    return null;
  }, []);

  return { ...state, getFirestore };
};

export default useFirebase;
