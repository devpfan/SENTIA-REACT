
import { useState, useEffect } from "react";
import { getSystemStatistics, SystemStatistics } from "@/services/statisticsService";

export const useSystemStatistics = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [statistics, setStatistics] = useState<SystemStatistics>({
    totalUsers: 0,
    totalSurveys: 0,
    totalFeedback: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const data = await getSystemStatistics();
        setStatistics(data);
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar las estadísticas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { statistics, loading, error };
};
