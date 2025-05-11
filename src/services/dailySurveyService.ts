
import { DailySurvey, DailySurveyDTO, ApiDailySurvey } from "@/types/survey";
import { API_URL, normalizeOptions } from "./utils/surveyUtils";

export const dailySurveyService = {
  getActiveDailySurvey: async (): Promise<DailySurvey | null> => {
    try {
      const response = await fetch(`${API_URL}/encuestas/diarias`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching daily surveys:", response.status, errorText);
        throw new Error("Error fetching daily surveys");
      }
      
      const data = await response.json();
      console.log("Daily surveys data:", data);
      
      const activeSurvey = data.find((survey: ApiDailySurvey) => survey.estado === 'A');
      
      if (!activeSurvey) {
        console.log("No active survey found in the list");
        return null;
      }

      return {
        id: activeSurvey.id,
        pregunta: activeSurvey.pregunta,
        opciones: normalizeOptions(activeSurvey.opciones || []),
        estado: activeSurvey.estado,
      };
    } catch (error) {
      console.error("Exception in getActiveDailySurvey:", error);
      throw error;
    }
  },

  answerDailySurvey: async (surveyId: number, userId: string): Promise<void> => {
    try {
      console.log(`Attempting to answer survey ${surveyId} for user ${userId}`);
      const response = await fetch(`${API_URL}/encuestas/diarias/${surveyId}/responder?identificacionUsuario=${userId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error answering survey:", response.status, errorText);
        
        if (response.status === 400) {
          throw new Error("Ya respondiste la encuesta de hoy.");
        } else if (response.status === 404) {
          throw new Error("No hay una encuesta activa en este momento.");
        }
        throw new Error("Error al enviar la respuesta");
      }
      
      console.log("Successfully answered survey");
    } catch (error) {
      console.error("Exception in answerDailySurvey:", error);
      throw error;
    }
  },

  createDailySurvey: async (survey: DailySurveyDTO): Promise<DailySurvey> => {
    const response = await fetch(`${API_URL}/encuestas/diarias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(survey),
    });
    if (!response.ok) throw new Error("Error creating daily survey");
    
    const data = await response.json();
    return {
      id: data.id,
      pregunta: data.pregunta,
      opciones: normalizeOptions(data.opciones),
    };
  },

  activateDailySurvey: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/encuestas/diarias/${id}/activar`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Error activating daily survey");
  },

  deactivateDailySurvey: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/encuestas/diarias/${id}/desactivar`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Error deactivating daily survey");
  },

  getDailySurveys: async (): Promise<DailySurvey[]> => {
    try {
      const response = await fetch(`${API_URL}/encuestas/diarias`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching daily surveys:", response.status, errorText);
        throw new Error("Error fetching daily surveys");
      }
      
      const data = await response.json();
      console.log("All daily surveys data:", data);
      
      return data.map((item: ApiDailySurvey) => ({
        id: item.id,
        pregunta: item.pregunta,
        opciones: normalizeOptions(item.opciones || []),
        estado: item.estado,
      }));
    } catch (error) {
      console.error("Exception in getDailySurveys:", error);
      throw error;
    }
  },

  checkDailySurveyResponse: async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/encuestas/diarias/verificar-respuesta?identificacionUsuario=${userId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error checking survey response:", response.status, errorText);
        throw new Error("Error al verificar la respuesta de la encuesta");
      }
      
      const data = await response.json();
      return data.yaRespondida;
    } catch (error) {
      console.error("Exception in checkDailySurveyResponse:", error);
      throw error;
    }
  },
};
