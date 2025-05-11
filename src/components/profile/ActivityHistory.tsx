
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Award, Gift, History } from "lucide-react";

export interface Activity {
  type: 'survey' | 'recognition' | 'reward';
  title: string;
  date: string;
  points: number;
}

interface ActivityHistoryProps {
  activities: ReadonlyArray<Activity>;
}

export const ActivityHistory = ({ activities }: ActivityHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de actividad</CardTitle>
        <CardDescription>
          Registro de tu participación y puntos ganados
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className={`p-2 rounded-full ${
                  activity.type === 'survey' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'recognition' ? 'bg-green-100 text-green-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {activity.type === 'survey' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : activity.type === 'recognition' ? (
                    <Award className="h-5 w-5" />
                  ) : (
                    <Gift className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{activity.title}</h4>
                    <span className={`text-sm font-medium ${
                      activity.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.points > 0 ? '+' : ''}{activity.points} pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hay actividad registrada</p>
            <p className="text-xs text-gray-400 mt-1">El historial de actividad aparecerá aquí cuando realices acciones en la plataforma</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
