import type { Election, Candidate } from '@/types';

export const elections: Election[] = [
  {
    id: 'eleccion-directorio-2025',
    nombre: 'Elección de Directorio 2025',
    fecha_inicio: '2025-01-15',
    fecha_fin: '2025-01-30',
    estado: 'Abierta',
  },
  {
    id: 'eleccion-comite-etica-2024',
    nombre: 'Elección Comité de Ética 2024',
    fecha_inicio: '2024-06-01',
    fecha_fin: '2024-06-15',
    estado: 'Cerrada',
  },
];

export const candidates: Candidate[] = [
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
    propuestas: 'Establecer alianzas estratégicas con instituciones financieras. Promover un marco regulatorio claro y favorable para las criptomonedas en Bolivia.',
  },
  {
    id: 'cand-03',
    eleccion_id: 'eleccion-directorio-2025',
    nombre: 'Sofia Rojas',
    perfil: 'Abogada experta en derecho tecnológico y regulación de activos digitales. Miembro fundador de la comunidad "Mujeres en Blockchain".',
    foto_url: 'https://placehold.co/400x400',
    propuestas: 'Impulsar la educación sobre la seguridad en el manejo de activos digitales. Defender los derechos de los usuarios y la privacidad en la red.',
  },
];

export const getCandidatesByElection = (electionId: string): Candidate[] => {
  return candidates.filter(c => c.eleccion_id === electionId);
};
