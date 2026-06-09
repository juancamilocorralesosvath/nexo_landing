export interface Job {
  department: string;
  type: 'Temporal' | 'Permanente';
  title: string;
  city: string;
  schedule: string;
}

export const jobs: Job[] = [
  {
    department: 'Logística',
    type: 'Temporal',
    title: 'Coordinador de Logística',
    city: 'Bogotá',
    schedule: 'Tiempo completo',
  },
  {
    department: 'Tecnología',
    type: 'Permanente',
    title: 'Desarrollador Full Stack',
    city: 'Medellín',
    schedule: 'Tiempo completo',
  },
  {
    department: 'Ventas',
    type: 'Permanente',
    title: 'Ejecutivo Comercial Senior',
    city: 'Cali',
    schedule: 'Tiempo completo',
  },
];
