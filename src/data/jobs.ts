export interface Step {
  number: string;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    number: '01',
    title: 'Regístrate en la plataforma',
    description:
      'Crea tu perfil profesional en minutos. Sube tu hoja de vida y cuéntanos qué tipo de oportunidad estás buscando.',
  },
  {
    number: '02',
    title: 'Explora vacantes disponibles',
    description:
      'Accede a ofertas verificadas en múltiples sectores. Filtra por ciudad, área o tipo de contrato.',
  },
  {
    number: '03',
    title: 'Postúlate con un clic',
    description:
      'Envía tu aplicación directamente desde la plataforma. Nuestro equipo conecta tu perfil con las empresas ideales.',
  },
];
