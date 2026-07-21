import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Application, ApplicationStatus, Job, UserProfile } from '../types';

const appsCol = collection(db, 'applications');

function mapApp(id: string, data: Record<string, unknown>): Application {
  return { id, ...(data as Omit<Application, 'id'>) };
}

export async function applyToJob(job: Job, candidate: UserProfile): Promise<void> {
  // Evita postulaciones duplicadas del mismo candidato a la misma oferta
  const dup = query(
    appsCol,
    where('jobId', '==', job.id),
    where('candidateId', '==', candidate.uid)
  );
  const existing = await getDocs(dup);
  if (!existing.empty) {
    throw new Error('Ya te postulaste a esta oferta.');
  }

  await addDoc(appsCol, {
    jobId: job.id,
    jobTitle: job.title,
    candidateId: candidate.uid,
    candidateName: candidate.displayName,
    candidateEmail: candidate.email,
    status: 'Recibida' as ApplicationStatus,
    createdAt: Date.now(),
  });
}

export async function listOwnApplications(uid: string): Promise<Application[]> {
  const q = query(appsCol, where('candidateId', '==', uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapApp(d.id, d.data()));
}

export async function listAllApplications(): Promise<Application[]> {
  const q = query(appsCol, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapApp(d.id, d.data()));
}

export async function setApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  await updateDoc(doc(db, 'applications', id), { status });
}
