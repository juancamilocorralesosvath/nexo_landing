import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Job, JobInput } from '../types';

const jobsCol = collection(db, 'jobs');

function mapJob(id: string, data: Record<string, unknown>): Job {
  return { id, ...(data as Omit<Job, 'id'>) };
}

// Ofertas activas — vista pública
export async function listActiveJobs(): Promise<Job[]> {
  const q = query(jobsCol, where('active', '==', true), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapJob(d.id, d.data()));
}

// Todas las ofertas — vista de administrador
export async function listAllJobs(): Promise<Job[]> {
  const q = query(jobsCol, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapJob(d.id, d.data()));
}

export async function getJob(id: string): Promise<Job | null> {
  const snap = await getDoc(doc(db, 'jobs', id));
  return snap.exists() ? mapJob(snap.id, snap.data()) : null;
}

export async function createJob(input: JobInput, adminUid: string): Promise<string> {
  const ref = await addDoc(jobsCol, {
    ...input,
    createdAt: Date.now(),
    createdBy: adminUid,
  });
  return ref.id;
}

export async function updateJob(id: string, input: Partial<JobInput>): Promise<void> {
  await updateDoc(doc(db, 'jobs', id), input);
}

export async function setJobActive(id: string, active: boolean): Promise<void> {
  await updateDoc(doc(db, 'jobs', id), { active });
}

export async function deleteJob(id: string): Promise<void> {
  await deleteDoc(doc(db, 'jobs', id));
}
