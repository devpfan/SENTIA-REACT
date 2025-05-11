
export interface SystemStatistics {
    totalUsers: number;
    totalSurveys: number;
    totalFeedback: number;
    participationRate?: number;
    averageSatisfaction?: number;
    recognitionsSent?: number;
    rewardsRedeemed?: number;
  }
  
  export const getSystemStatistics = async (): Promise<SystemStatistics> => {
    try {
      const response = await fetch("http://localhost:8080/estadisticas/sistema");
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas del sistema');
      }
      return await response.json();
    } catch (error) {
      console.error("Error obteniendo estadísticas:", error);
      // Retornar datos por defecto en caso de error
      return {
        totalUsers: 0,
        totalSurveys: 0,
        totalFeedback: 0,
      };
    }
  };
  