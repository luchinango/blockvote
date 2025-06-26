import type { Election, Candidate } from '@/types';

export const elections: Election[] = [
  {
    id: 'eleccion-directorio-2025',
    nombre: 'Elección de Directorio 2025',
    descripcion: 'Elección anual para los miembros del directorio de la Cámara Boliviana de Blockchain.',
    fecha_inicio: '2025-01-15',
    fecha_fin: '2025-01-30',
    estado: 'Abierta',
  },
  {
    id: 'eleccion-comite-etica-2024',
    nombre: 'Elección Comité de Ética 2024',
    descripcion: 'Elección para los nuevos miembros del comité de ética.',
    fecha_inicio: '2024-06-01',
    fecha_fin: '2024-06-15',
    estado: 'Cerrada',
    votos_totales: 350,
    resultados: [
      { candidateId: 'cand-etica-01', votos: 180 },
      { candidateId: 'cand-etica-02', votos: 115 },
      { candidateId: 'cand-etica-03', votos: 55 },
    ],
  },
];

export const candidates: Candidate[] = [
  // Candidatos Directorio 2025
  {
    id: 'cand-01',
    eleccion_id: 'eleccion-directorio-2025',
    nombre: 'Ana Paredes',
    perfil: 'Ingeniera de software con 10 años de experiencia en tecnología blockchain y desarrollo de DApps.',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Fomentar la adopción de blockchain en el sector público. Crear programas de capacitación para nuevos desarrolladores.',
  },
  {
    id: 'cand-02',
    eleccion_id: 'eleccion-directorio-2025',
    nombre: 'Carlos Mendoza',
    perfil: 'Economista especializado en criptomonedas y finanzas descentralizadas (DeFi). Consultor para varios startups cripto.',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Establecer alianzas estratégicas con instituciones financieras. Promover un marco regulatorio claro y favorable.',
  },
  {
    id: 'cand-03',
    eleccion_id: 'eleccion-directorio-2025',
    nombre: 'Sofia Rojas',
    perfil: 'Abogada experta en derecho tecnológico y regulación de activos digitales. Miembro fundador de "Mujeres en Blockchain".',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Impulsar la educación sobre la seguridad en el manejo de activos digitales. Defender los derechos de los usuarios y la privacidad.',
  },
  // Candidatos Comité de Ética 2024 (elección cerrada)
  {
    id: 'cand-etica-01',
    eleccion_id: 'eleccion-comite-etica-2024',
    nombre: 'Lucia Guzman',
    perfil: 'Filósofa y experta en ética tecnológica. Ha trabajado en comités de ética para empresas de tecnología.',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Crear un código de ética claro para los miembros de CABLOCK. Fomentar la transparencia y la rendición de cuentas.',
  },
  {
    id: 'cand-etica-02',
    eleccion_id: 'eleccion-comite-etica-2024',
    nombre: 'Javier Soliz',
    perfil: 'Auditor con experiencia en sistemas de información y seguridad. Certificado en auditoría de smart contracts.',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Implementar auditorías periódicas de los proyectos de la cámara. Fortalecer los mecanismos de control interno.',
  },
  {
    id: 'cand-etica-03',
    eleccion_id: 'eleccion-comite-etica-2024',
    nombre: 'Maria Pinto',
    perfil: 'Mediadora y especialista en resolución de conflictos. Experiencia en comunidades open-source.',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Establecer un sistema de mediación para resolver disputas entre miembros. Promover una cultura de colaboración.',
  },
];

export const getCandidatesByElection = (electionId: string): Candidate[] => {
  return candidates.filter(c => c.eleccion_id === electionId);
};
