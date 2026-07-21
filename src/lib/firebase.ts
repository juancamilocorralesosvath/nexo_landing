// Inicialización de Firebase.
// La configuración se lee desde variables de entorno (.env). Ver .env.example.
// Los valores de config de Firebase Web NO son secretos: la seguridad real
// se aplica con las reglas de Firestore/Storage (firestore.rules, storage.rules).

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Aviso temprano y claro si falta configuración (evita errores crípticos en runtime)
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    '[NEXO] Falta configuración de Firebase. Copia .env.example a .env y ' +
      'completa las variables VITE_FIREBASE_* con los datos de tu proyecto.'
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
