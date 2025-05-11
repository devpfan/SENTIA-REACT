
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Gift, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/components/layout/PageLayout";
import { useRewards } from "@/hooks/useRewards";

const Rewards = () => {
  const {
    userPoints,
    activeCategory,
    isLoadingRewards,
    isLoadingHistory,
    handleCategoryChange,
  } = useRewards();

  const renderEmptyState = () => (
    <div className="text-center py-10">
      <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium">No hay recompensas disponibles</h3>
      <p className="text-gray-500">Las recompensas serán cargadas próximamente desde el panel de administrador.</p>
    </div>
  );

  const renderEmptyHistoryState = () => (
    <div className="text-center py-4">
      <p className="text-gray-500">No hay historial de canjes disponible</p>
    </div>
  );

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tienda de recompensas</h1>
              <p className="text-gray-600">
                Canjea tus puntos por increíbles recompensas
              </p>
            </div>
            <div className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Tus puntos</span>
                <span className="text-xl font-bold">{userPoints}</span>
              </div>
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={handleCategoryChange}>
          <div className="mb-6">
            <TabsList className="w-full md:w-auto justify-start overflow-x-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="popular">Populares</TabsTrigger>
              <TabsTrigger value="food">Comida</TabsTrigger>
              <TabsTrigger value="time">Tiempo libre</TabsTrigger>
              <TabsTrigger value="learning">Aprendizaje</TabsTrigger>
              <TabsTrigger value="entertainment">Entretenimiento</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="mt-0">
            {isLoadingRewards ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-secondary/30 p-4 flex justify-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-2/3 mt-1" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-24" />
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Skeleton className="h-10 w-full rounded-md" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              renderEmptyState()
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                <span>Historial de canjes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                renderEmptyHistoryState()
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Rewards;
