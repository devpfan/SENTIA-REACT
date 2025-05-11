
import { WeeklySurvey, WeeklySurveyDTO, ApiWeeklySurvey } from "@/types/survey";
import { API_URL, normalizeOptions } from "./utils/surveyUtils";

export const weeklySurveyService = {
  createWeeklySurvey: async (survey: WeeklySurveyDTO): Promise<WeeklySurvey> => {
    const response = await fetch(`${API_URL}/encuestas/semanales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(survey),
    });
    if (!response.ok) throw new Error("Error creating weekly survey");
    
    const data = await response.json();
    return {
      id: data.id,
      preguntas: data.preguntas,
      opciones: normalizeOptions(data.opciones),
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
    };
  },

  getWeeklySurveys: async (): Promise<WeeklySurvey[]> => {
    const response = await fetch(`${API_URL}/encuestas/semanales`, {
      method: "GET", // Explicitly using GET to ensure we're not modifying state
      headers: {
        "Cache-Control": "no-cache", // Prevent caching
      },
    });
    if (!response.ok) throw new Error("Error fetching weekly surveys");
    
    const data = await response.json();
    return data.map((item: ApiWeeklySurvey) => ({
      id: item.id,
      preguntas: item.preguntas,
      opciones: normalizeOptions(item.opciones),
      fechaInicio: item.fechaInicio,
      fechaFin: item.fechaFin,
      estado: item.estado,
    }));
  },

  getActiveWeeklySurvey: async (): Promise<WeeklySurvey | null> => {
    try {
      const response = await fetch(`${API_URL}/encuestas/semanales`, {
        method: "GET", // Explicit GET method
        headers: {
          "Cache-Control": "no-cache", // Prevent caching issues
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching active weekly survey:", response.status, errorText);
        throw new Error("Error fetching active weekly survey");
      }
      
      const data = await response.json();
      console.log("Weekly surveys data:", data);
      
      // Find an active survey (estado: 'A')
      const activeSurvey = Array.isArray(data) ? data.find((survey: ApiWeeklySurvey) => survey.estado === 'A') : null;
      
      if (!activeSurvey) {
        console.log("No active weekly survey found");
        return null;
      }

      return {
        id: activeSurvey.id,
        preguntas: activeSurvey.preguntas,
        opciones: normalizeOptions(activeSurvey.opciones || []),
        fechaInicio: activeSurvey.fechaInicio,
        fechaFin: activeSurvey.fechaFin,
        estado: activeSurvey.estado,
      };
    } catch (error) {
      console.error("Exception in getActiveWeeklySurvey:", error);
      throw error;
    }
  },

  checkWeeklySurveyResponse: async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/encuestas/semanales/verificar-respuesta?identificacionUsuario=${userId}`, {
        method: "GET", // Explicit GET method
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error checking weekly survey response:", response.status, errorText);
        
        if (errorText.includes("rango de fechas")) {
          console.warn("Survey is outside of valid date range");
          // Return true to indicate the user doesn't need to answer this survey
          return true;
        }
        
        throw new Error("Error al verificar la respuesta de la encuesta semanal");
      }
      
      const data = await response.json();
      return data.yaRespondida;
    } catch (error) {
      console.error("Exception in checkWeeklySurveyResponse:", error);
      throw error;
    }
  },

  answerWeeklySurvey: async (surveyId: number, userId: string): Promise<void> => {
    try {
      console.log(`Attempting to answer weekly survey ${surveyId} for user ${userId}`);
      const response = await fetch(`${API_URL}/encuestas/semanales/${surveyId}/responder?identificacionUsuario=${userId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error answering weekly survey:", response.status, errorText);
        
        if (response.status === 400) {
          if (errorText.includes("rango de fechas")) {
            throw new Error("La encuesta activa ya no está dentro del rango de fechas.");
          }
          throw new Error("Ya respondiste la encuesta semanal de esta semana.");
        } else if (response.status === 404) {
          throw new Error("No hay una encuesta semanal activa en este momento.");
        }
        throw new Error("Error al enviar la respuesta");
      }
      
      console.log("Successfully answered weekly survey");
    } catch (error) {
      console.error("Exception in answerWeeklySurvey:", error);
      throw error;
    }
  },

  activateWeeklySurvey: async (id: number): Promise<void> => {
    console.log(`Attempting to activate weekly survey ${id}`);
    const response = await fetch(`${API_URL}/encuestas/semanales/${id}/activar`, {
      method: "PUT",
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error activating weekly survey:", response.status, errorText);
      throw new Error("Error activating weekly survey. Solo puede haber una encuesta activa a la vez.");
    }
  },

  deactivateWeeklySurvey: async (id: number): Promise<void> => {
    console.log(`Attempting to deactivate weekly survey ${id}`);
    const response = await fetch(`${API_URL}/encuestas/semanales/${id}/desactivar`, {
      method: "PUT",
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error deactivating weekly survey:", response.status, errorText);
      throw new Error("Error deactivating weekly survey");
    }
  },
};
