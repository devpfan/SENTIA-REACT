
export interface NewsItem {
  id: number;
  titulo: string;
  contenido: string;
  tipo: number; // 0: "General", 1: "Anuncio", 2: "Clima", 3: "Evento"
  imagenBase64?: string | null;
  autorId: number;
  autorNombre?: string;
  autorApellido?: string;
  autorFotoBase64?: string | null;
  fechaEscritura: string;
  fechaPublicacion: string;
  publicada: boolean;
}

export interface NewsCreateRequest {
  titulo: string;
  contenido: string;
  tipo: number;
  imagenBase64: string | null;
  autorId: number;
  fechaEscritura: string;
  fechaPublicacion: string;
  publicada: boolean;
}

export interface NewsUpdateRequest extends NewsCreateRequest {
  id: number;
}

export const NEWS_TYPES = [
  { value: 0, label: "General" },
  { value: 1, label: "Anuncio" },
  { value: 2, label: "Clima" },
  { value: 3, label: "Evento" }
];

export const getNewsTypeName = (type: number): string => {
  return NEWS_TYPES.find(t => t.value === type)?.label || "General";
};
