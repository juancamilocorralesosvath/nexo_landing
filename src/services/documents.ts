import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import type { CandidateDoc, UserProfile } from '../types';

const docsCol = collection(db, 'documents');

function mapDoc(id: string, data: Record<string, unknown>): CandidateDoc {
  return { id, ...(data as Omit<CandidateDoc, 'id'>) };
}

// Sube un archivo del candidato: guarda el binario en Storage y los metadatos en Firestore.
export async function uploadDocument(
  file: File,
  owner: UserProfile
): Promise<CandidateDoc> {
  const safeName = file.name.replace(/[^\w.-]+/g, '_');
  const storagePath = `documents/${owner.uid}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file, { contentType: file.type });
  const downloadURL = await getDownloadURL(storageRef);

  const meta = {
    ownerId: owner.uid,
    ownerName: owner.displayName,
    ownerEmail: owner.email,
    name: file.name,
    contentType: file.type || 'application/octet-stream',
    size: file.size,
    storagePath,
    downloadURL,
    uploadedAt: Date.now(),
  };

  const created = await addDoc(docsCol, meta);
  return mapDoc(created.id, meta);
}

// Documentos de un candidato (su propia vista)
export async function listOwnDocuments(uid: string): Promise<CandidateDoc[]> {
  const q = query(docsCol, where('ownerId', '==', uid), orderBy('uploadedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data()));
}

// Todos los documentos (vista de administrador)
export async function listAllDocuments(): Promise<CandidateDoc[]> {
  const q = query(docsCol, orderBy('uploadedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data()));
}

export async function deleteDocument(docMeta: CandidateDoc): Promise<void> {
  await deleteObject(ref(storage, docMeta.storagePath)).catch(() => void 0);
  await deleteDoc(doc(db, 'documents', docMeta.id));
}
