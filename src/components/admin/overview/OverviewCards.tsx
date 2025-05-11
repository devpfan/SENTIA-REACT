
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Participación general</CardDescription>
          <CardTitle className="text-2xl">
            <Skeleton className="h-6 w-16" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Satisfacción promedio</CardDescription>
          <CardTitle className="text-2xl">
            <Skeleton className="h-6 w-16" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Feedback recibido</CardDescription>
          <CardTitle className="text-2xl">
            <Skeleton className="h-6 w-16" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Recompensas canjeadas</CardDescription>
          <CardTitle className="text-2xl">
            <Skeleton className="h-6 w-16" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
