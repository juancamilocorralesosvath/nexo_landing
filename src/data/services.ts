export interface Service {
  num: string;
  tabLabel: string;
  title: string;
  description: string;
  hint: string;
  chips: string[];
}

export const services: Service[] = [
  {
    num: 'SERVICE (01)',
    tabLabel: 'Reclutamiento de Candidatos',
    title: 'Reclutamiento de Candidatos',
    description: 'Identificamos y atraemos el talento idóneo mediante headhunting, portales especializados y nuestra red de profesionales en todo el país.',
    hint: 'foto candidatos / entrevista grupal',
    chips: ['Head Hunting', 'Atracción de Talento', 'Perfiles Técnicos'],
  },
  {
    num: 'SERVICE (02)',
    tabLabel: 'Selección de Personal',
    title: 'Selección de Personal',
    description: 'Evaluamos competencias, cultura organizacional y potencial de cada candidato con herramientas validadas para garantizar la contratación más acertada.',
    hint: 'foto evaluación / assessment center',
    chips: ['Assessment Centers', 'Pruebas Psicotécnicas', 'Entrevistas por Competencias'],
  },
  {
    num: 'SERVICE (03)',
    tabLabel: 'Contratación Temporal',
    title: 'Contratación Temporal',
    description: 'Soluciones flexibles para proyectos específicos y picos de demanda. Gestionamos toda la carga administrativa y legal de sus colaboradores temporales.',
    hint: 'foto firma de contrato / equipo temporal',
    chips: ['Outsourcing', 'Personal en Misión', 'Administración de Nómina'],
  },
  {
    num: 'SERVICE (04)',
    tabLabel: 'Consultoría RRHH',
    title: 'Consultoría en RRHH',
    description: 'Acompañamos a su organización en la gestión integral del capital humano: desde la estrategia de talento hasta la transformación organizacional.',
    hint: 'foto reunión estratégica / consultoría',
    chips: ['Clima Organizacional', 'Diseño de Cargos', 'Transformación Cultural'],
  },
  {
    num: 'SERVICE (05)',
    tabLabel: 'Formación y Desarrollo',
    title: 'Formación y Desarrollo',
    description: 'Programas de capacitación diseñados a medida para potenciar el desempeño y la motivación de sus equipos en toda Colombia.',
    hint: 'foto capacitación / taller formativo',
    chips: ['Capacitación In-house', 'Coaching Ejecutivo', 'Liderazgo'],
  },
];
