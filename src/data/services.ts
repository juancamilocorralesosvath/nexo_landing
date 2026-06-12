export interface Service {
  num: string;
  tabLabel: string;
  title: string;
  description: string;
  hint: string;
  chips: string[];
  image: string;
}

export const services: Service[] = [
  {
    num: 'SERVICE (01)',
    tabLabel: 'Reclutamiento de Candidatos',
    title: 'Reclutamiento de Candidatos',
    description: 'Identificamos y atraemos el talento idóneo mediante headhunting, portales especializados y nuestra red de profesionales en todo el país.',
    hint: 'Reclutamiento de candidatos — entrevista grupal',
    chips: ['Head Hunting', 'Atracción de Talento', 'Perfiles Técnicos'],
    image: '/images/services/reclutamiento.jpg',
  },
  {
    num: 'SERVICE (02)',
    tabLabel: 'Selección de Personal',
    title: 'Selección de Personal',
    description: 'Evaluamos competencias, cultura organizacional y potencial de cada candidato con herramientas validadas para garantizar la contratación más acertada.',
    hint: 'Selección de personal — assessment center',
    chips: ['Assessment Centers', 'Pruebas Psicotécnicas', 'Entrevistas por Competencias'],
    image: '/images/services/seleccion.jpg',
  },
  {
    num: 'SERVICE (03)',
    tabLabel: 'Contratación Temporal',
    title: 'Contratación Temporal',
    description: 'Soluciones flexibles para proyectos específicos y picos de demanda. Gestionamos toda la carga administrativa y legal de sus colaboradores temporales.',
    hint: 'Contratación temporal — firma de contrato',
    chips: ['Outsourcing', 'Personal en Misión', 'Administración de Nómina'],
    image: '/images/services/temporal.jpg',
  },
  {
    num: 'SERVICE (04)',
    tabLabel: 'Consultoría RRHH',
    title: 'Consultoría en RRHH',
    description: 'Acompañamos a su organización en la gestión integral del capital humano: desde la estrategia de talento hasta la transformación organizacional.',
    hint: 'Consultoría en RRHH — reunión estratégica',
    chips: ['Clima Organizacional', 'Diseño de Cargos', 'Transformación Cultural'],
    image: '/images/services/consultoria.jpg',
  },
  {
    num: 'SERVICE (05)',
    tabLabel: 'Formación y Desarrollo',
    title: 'Formación y Desarrollo',
    description: 'Programas de capacitación diseñados a medida para potenciar el desempeño y la motivación de sus equipos en toda Colombia.',
    hint: 'Formación y desarrollo — taller formativo',
    chips: ['Capacitación In-house', 'Coaching Ejecutivo', 'Liderazgo'],
    image: '/images/services/formacion.jpg',
  },
];
