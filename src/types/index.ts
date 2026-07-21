// Tipos compartidos del portal NEXO SAS

export type Role = 'candidate' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: Role;
  createdAt: number;
}

export type ContractType =
  | 'Término indefinido'
  | 'Término fijo'
  | 'Obra o labor'
  | 'Prestación de servicios'
  | 'Aprendizaje';

export interface Job {
  id: string;
  title: string;
  area: string;
  city: string;
  contractType: ContractType;
  description: string;
  requirements: string[];
  salary?: string;
  active: boolean;
  createdAt: number;
  createdBy: string;
}

// Payload para crear/editar una oferta (sin campos autogenerados)
export type JobInput = Omit<Job, 'id' | 'createdAt' | 'createdBy'>;

export interface CandidateDoc {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  name: string;
  contentType: string;
  size: number;
  storagePath: string;
  downloadURL: string;
  uploadedAt: number;
}

export type ApplicationStatus =
  | 'Recibida'
  | 'En revisión'
  | 'Preseleccionada'
  | 'Rechazada';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  status: ApplicationStatus;
  createdAt: number;
}
