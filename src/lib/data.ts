import type { Election, Candidate, Vote } from '@/types';

export const elections: Election[] = [
  {
    id: 'eleccion-directorio-2025',
    nombre: 'Elección de Directorio 2025',
    descripcion: 'Elección anual para los miembros del directorio de la Cámara Boliviana de Blockchain.',
    fecha_inicio: '2025-01-15',
    estado: "Abierta", // <-- ¡Asegúrate de que esté presente!
    anonimato: 'Auditado',
    votos_totales: 0,
    progreso: 0,
  },
  {
    id: 'eleccion-comite-etica-2024',
    nombre: 'Elección Comité de Ética 2024',
    descripcion: 'Elección para los nuevos miembros del comité de ética.',
    fecha_inicio: '2024-06-01',
    fecha_fin: '2024-06-15',
    estado: 'Cerrada',
    anonimato: 'Secreto',
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

export const votes: Vote[] = [
    // Votes for 'eleccion-directorio-2025' (Auditado)
    { wallet_address: '0x1A2b3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9a0B', id_eleccion: 'eleccion-directorio-2025', id_candidato: 'cand-01', timestamp: 1737849600000, firma_digital: '0xfa2c31527e551382946a4892c9d3e5b3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9' },
    { wallet_address: '0x2B3c4d5E6f7a8b9C0d1e2F3a4b5c6D7e8F9a0b1C', id_eleccion: 'eleccion-directorio-2025', id_candidato: 'cand-02', timestamp: 1737936000000, firma_digital: '0xacb3e4c6d8a2c1b3f5d7e9fa2c31527e551382946a4892c9d3e5b3b5a7c0f2e9' },
    { wallet_address: '0x3C4d5e6F7a8b9c0D1e2f3a4b5c6d7E8f9a0b1c2D', id_eleccion: 'eleccion-directorio-2025', id_candidato: 'cand-01', timestamp: 1738022400000, firma_digital: '0x9d3e5b3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9fa2c31527e551382946a4892c' },
    { wallet_address: '0x4D5e6f7A8b9c0d1E2f3a4b5c6d7e8F9a0b1c2d3E', id_eleccion: 'eleccion-directorio-2025', id_candidato: 'cand-03', timestamp: 1738108800000, firma_digital: '0x551382946a4892c9d3e5b3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9fa2c31527e' },

    // Votes for 'eleccion-comite-etica-2024' (Secreto)
    // For 'Secreto' mode, the wallet_address would be a unique, non-identifiable hash.
    { wallet_address: 'vote-hash-2a1b9c4f', id_eleccion: 'eleccion-comite-etica-2024', id_candidato: 'cand-etica-01', timestamp: 1718022400000, firma_digital: '0xc1b3f5d7e9fa2c31527e551382946a4892c9d3e5b3b5a7c0f2e9b8a3e4c6d8a2' },
    { wallet_address: 'vote-hash-8d7e6f5a', id_eleccion: 'eleccion-comite-etica-2024', id_candidato: 'cand-etica-02', timestamp: 1718032400000, firma_digital: '0xb3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9fa2c31527e551382946a4892c9d3e5' },
    { wallet_address: 'vote-hash-3c2b1a9f', id_eleccion: 'eleccion-comite-etica-2024', id_candidato: 'cand-etica-01', timestamp: 1718042400000, firma_digital: '0x4892c9d3e5b3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9fa2c31527e551382946a' },
    { wallet_address: 'vote-hash-d4e5f6a7', id_eleccion: 'eleccion-comite-etica-2024', id_candidato: 'cand-etica-01', timestamp: 1718052400000, firma_digital: '0xe4c6d8a2c1b3f5d7e9fa2c31527e551382946a4892c9d3e5b3b5a7c0f2e9b8a3' },
    { wallet_address: 'vote-hash-9f8e7d6c', id_eleccion: 'eleccion-comite-etica-2024', id_candidato: 'cand-etica-03', timestamp: 1718062400000, firma_digital: '0x946a4892c9d3e5b3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9fa2c31527e551382' },
    { wallet_address: 'vote-hash-b1a2c3d4', id_eleccion: 'eleccion-comite-etica-2024', id_candidato: 'cand-etica-02', timestamp: 1718072400000, firma_digital: '0x2946a4892c9d3e5b3b5a7c0f2e9b8a3e4c6d8a2c1b3f5d7e9fa2c31527e55138' },
];

export const getCandidatesByElection = (electionId: string): Candidate[] => {
  return candidates.filter(c => c.eleccion_id === electionId);
};

export const getVotesByElection = (electionId: string): Vote[] => {
  if (!electionId) return [];
  return votes.filter(v => v.id_eleccion === electionId);
};
