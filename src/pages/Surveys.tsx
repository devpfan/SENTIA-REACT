
import React from "react";
import { Loader2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { DailySurveySection } from "@/components/surveys/daily/DailySurveySection";
import { WeeklySurveySection } from "@/components/surveys/weekly/WeeklySurveySection";

const Surveys = () => {
  const [userId, setUserId] = React.useState<string>(() => localStorage.getItem("identificacion") || "");

  React.useEffect(() => {
    const storedId = localStorage.getItem("identificacion");
    console.log("User ID from localStorage:", storedId);
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  if (!userId) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg">Cargando...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Encuestas</h1>
          <p className="text-gray-600">
            Tu opinión es importante para mejorar nuestro ambiente de trabajo.
          </p>
        </div>

        <DailySurveySection userId={userId} />
        <WeeklySurveySection userId={userId} />
      </div>
    </PageLayout>
  );
};

export default Surveys;
