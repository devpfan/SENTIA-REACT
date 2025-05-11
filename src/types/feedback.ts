
export interface FeedbackType {
  id: number;
  descripcion: string;
}

export interface CreateFeedbackDto {
  usuarioId?: number;
  texto: string;
  tipoId: number;
  anonimo: boolean;
}

export interface Feedback extends CreateFeedbackDto {
  id: number;
  fecha: string;
}

// Add the FeedbackItem interface for the admin components
export interface FeedbackItem {
  id: string;
  message: string;
  date: string;
  type: 'suggestion' | 'concern' | 'recognition' | 'other';
  status: 'pending' | 'reviewed' | 'closed';
  sentimentScore?: number;
  sentimentLabel?: string;
}

// Add new interface for sentiment analysis data
export interface SentimentAnalysis {
  id: number;
  feedback: {
    id: number;
    usuario: any;
    texto: string;
    fecha: string;
    tipoFeedback: {
      id: number;
      descripcion: string;
    };
    anonimo: boolean;
  };
  resultado: 'POS' | 'NEU' | 'NEG';
}
