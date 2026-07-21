import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserProfile } from '../types';

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  phone?: string;
}

// El registro público SIEMPRE crea candidatos. El rol 'admin' se asigna
// manualmente en Firestore (ver README) y nunca se acepta desde el cliente.
export async function register(data: RegisterData): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
  await updateProfile(cred.user, { displayName: data.displayName });

  const profile: UserProfile = {
    uid: cred.user.uid,
    email: data.email,
    displayName: data.displayName,
    phone: data.phone ?? '',
    role: 'candidate',
    createdAt: Date.now(),
  };

  await setDoc(doc(db, 'users', cred.user.uid), profile);
  return profile;
}

export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function fetchProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}
