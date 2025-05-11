
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSystemStatistics } from "@/hooks/useSystemStatistics";
import { ArrowUpIcon, ArrowDownIcon, Loader2 } from "lucide-react";

export function OverviewCards() {
  const { statistics, loading } = useSystemStatistics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Participación general</CardDescription>
          <CardTitle className="text-2xl">
            {loading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span>{statistics.totalUsers || 0} usuarios</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <div className="flex items-center text-emerald-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span>Activos en el sistema</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Encuestas completadas</CardDescription>
          <CardTitle className="text-2xl">
            {loading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span>{statistics.totalSurveys || 0}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <div className="flex items-center text-emerald-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span>Total de encuestas</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Feedback recibido</CardDescription>
          <CardTitle className="text-2xl">
            {loading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span>{statistics.totalFeedback || 0}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <div className="flex items-center text-emerald-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span>Nuevos mensajes</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Recompensas canjeadas</CardDescription>
          <CardTitle className="text-2xl">
            {loading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span>{statistics.rewardsRedeemed || 0}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <div className="flex items-center text-emerald-500">
                <span>Desde el inicio</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
