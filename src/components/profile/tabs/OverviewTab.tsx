
import { UserInfo } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Flame } from "lucide-react";

interface OverviewTabProps {
  userData: UserInfo;
}

export const OverviewTab = ({ userData }: OverviewTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Insignias y logros</CardTitle>
          <CardDescription>
            Insignias que has conseguido por tu participación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {userData.badges && userData.badges.length > 0 ? (
            userData.badges.map((badge, index) => (
              <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{badge.description}</p>
                  <p className="text-xs text-gray-500">Obtenido el {badge.date}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <Award className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Aún no tienes insignias</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Rachas semanales</CardTitle>
          <CardDescription>
            Tu historial de participación en encuestas diarias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <Flame className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No hay rachas registradas</p>
            <p className="text-xs text-gray-400 mt-1">Completa encuestas diarias para comenzar tu racha</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
