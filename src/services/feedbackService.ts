import { CreateFeedbackDto, Feedback, FeedbackType, SentimentAnalysis } from "@/types/feedback";

const API_URL = "http://localhost:8080/feedback";
const TIPO_FEEDBACK_URL = "http://localhost:8080/tipo-feedback";

export const getFeedbackTypes = async (): Promise<FeedbackType[]> => {
  const response = await fetch(TIPO_FEEDBACK_URL);
  if (!response.ok) {
    throw new Error('Error al obtener tipos de feedback');
  }
  return response.json();
};

export const getAllFeedback = async (): Promise<Feedback[]> => {
  const response = await fetch(`${API_URL}/all`);
  if (!response.ok) {
    throw new Error('Error al obtener feedback');
  }
  return response.json();
};

export const getFeedbackById = async (id: number): Promise<Feedback> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Feedback no encontrado');
    }
    throw new Error('Error al obtener feedback');
  }
  return response.json();
};

export const createFeedback = async (feedback: CreateFeedbackDto): Promise<Feedback> => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedback),
  });
  if (!response.ok) {
    throw new Error('Error al crear feedback');
  }
  return response.json();
};

export const deleteFeedback = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Feedback no encontrado');
    }
    throw new Error('Error al eliminar feedback');
  }
};

// Add new function to get sentiment analysis data
export const getSentimentAnalysis = async (): Promise<SentimentAnalysis[]> => {
  const response = await fetch('http://localhost:8080/analisis-feedback');
  if (!response.ok) {
    throw new Error('Error al obtener análisis de sentimientos');
  }
  return response.json();
};
