export interface Candidate {
  id: string;
  nombre: string;
  perfil: string;
  foto_url: string;
  propuestas: string;
  eleccion_id: string;
}

export interface Election {
  id: string;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: "Abierta" | "Cerrada";
  anonimato: "Secreto" | "Auditado";
  votos_totales?: number;
  resultados?: {
    candidateId: string;
    votos: number;
  }[];
}

export interface Vote {
  wallet_address: string;
  id_eleccion: string;
  id_candidato: string;
  timestamp: number;
  firma_digital: string; 
}
