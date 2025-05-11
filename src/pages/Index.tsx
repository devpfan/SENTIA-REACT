import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { CheckCircle, Award, MessageSquare, ChevronRight, Calendar, Users, BarChart3, Gift, Loader2, Newspaper } from "lucide-react";
import { useSystemStatistics } from "@/hooks/useSystemStatistics";
import { NewsItem } from "@/types/news";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/services/newsService";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { statistics, loading } = useSystemStatistics();
  
  const { 
    data: newsData = [],
    isLoading: isLoadingNews 
  } = useQuery({
    queryKey: ['news'],
    queryFn: newsService.getAllNews,
  });
  
  // Get only published news, sorted by publication date (most recent first)
  const recentNews = newsData
    .filter(news => news.publicada)
    .sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime())
    .slice(0, 3); // Get only the first 3 news items
  
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      console.log("Estado de autenticación:", authStatus);
      setIsAuthenticated(authStatus);
    };
    
    checkAuth();
    
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const formatImageSrc = (base64String?: string | null) => {
    if (!base64String) return null;
    return base64String.startsWith('data:') 
      ? base64String 
      : `data:image/jpeg;base64,${base64String}`;
  };

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="py-16 md:py-24 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bienvenido a SENTIA! 
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sistema de Evaluación y Notificación del Talento con Inteligencia Artificial. 
            Mejora la experiencia de tus empleados con encuestas,
            sistema de puntos y reconocimientos.
          </p>
          <div className="mb-12">
            <Link to="/login">
              <Button size="lg" className="gap-2">
                Iniciar sesión
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardHeader className="pb-3">
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Encuestas diarias</CardTitle>
                <CardDescription>
                  Participa en breves encuestas para compartir cómo te sientes y ganar puntos.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Reconocimientos</CardTitle>
                <CardDescription>
                  Reconoce el buen trabajo de tus compañeros y recibe reconocimientos por tus logros.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Recompensas</CardTitle>
                <CardDescription>
                  Canjea tus puntos acumulados por beneficios exclusivos.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-6 my-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Nuestro impacto en números</h2>
              <p className="text-gray-600">
                Juntos estamos construyendo un mejor lugar para trabajar
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                {loading ? (
                  <div className="flex justify-center items-center h-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <span className="block text-3xl font-bold text-primary mb-1">
                    {statistics.totalUsers || 0}
                  </span>
                )}
                <span className="text-sm text-gray-600">Usuarios registrados</span>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="flex justify-center items-center h-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <span className="block text-3xl font-bold text-primary mb-1">
                    {statistics.totalSurveys || 0}
                  </span>
                )}
                <span className="text-sm text-gray-600">Encuestas completadas</span>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="flex justify-center items-center h-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <span className="block text-3xl font-bold text-primary mb-1">
                    {statistics.totalFeedback || 0}
                  </span>
                )}
                <span className="text-sm text-gray-600">Feedback recibido</span>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Mejora el talento con SENTIA
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transforma la experiencia de tus empleados con encuestas diarias, 
          puntos por participación, reconocimientos y un sistema inteligente de evaluación.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/surveys">
            <Button size="lg" className="gap-2">
              <CheckCircle className="h-5 w-5" />
              Completar encuesta diaria
            </Button>
          </Link>
          <Link to="/feedback">
            <Button size="lg" variant="outline" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Enviar feedback
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        <Card>
          <CardHeader className="pb-3">
            <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Encuestas diarias</CardTitle>
            <CardDescription>
              Participa en breves encuestas diarias para compartir cómo te sientes y ganar puntos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/surveys" className="text-sm text-primary font-medium flex items-center">
              Ir a encuestas
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Reconocimientos</CardTitle>
            <CardDescription>
              Reconoce el buen trabajo de tus compañeros y recibe reconocimientos por tus logros.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/feedback" className="text-sm text-primary font-medium flex items-center">
              Reconocer a un compañero
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Tienda de recompensas</CardTitle>
            <CardDescription>
              Canjea tus puntos acumulados por recompensas atractivas y beneficios exclusivos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/rewards" className="text-sm text-primary font-medium flex items-center">
              Ver recompensas
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Feedback an��nimo</CardTitle>
            <CardDescription>
              Comparte sugerencias y preocupaciones de forma anónima para mejorar el ambiente laboral.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/feedback" className="text-sm text-primary font-medium flex items-center">
              Enviar feedback
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-secondary/30 rounded-lg p-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Nuestro impacto en números</h2>
          <p className="text-gray-600">
            Juntos estamos construyendo un mejor lugar para trabajar
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <span className="block text-3xl font-bold text-primary mb-1">
                {statistics.totalUsers || 0}
              </span>
            )}
            <span className="text-sm text-gray-600">Usuarios registrados</span>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <span className="block text-3xl font-bold text-primary mb-1">
                {statistics.totalSurveys || 0}
              </span>
            )}
            <span className="text-sm text-gray-600">Encuestas completadas</span>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <span className="block text-3xl font-bold text-primary mb-1">
                {statistics.totalFeedback || 0}
              </span>
            )}
            <span className="text-sm text-gray-600">Feedback recibido</span>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Noticias recientes</h2>
          <Link to="/news" className="text-primary font-medium flex items-center">
            Ver todas
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoadingNews ? (
            // Loading state for news
            Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <div className="h-40 bg-secondary/20 animate-pulse"></div>
                <CardHeader>
                  <div className="h-6 bg-secondary/20 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-secondary/20 rounded animate-pulse w-1/3"></div>
                </CardHeader>
              </Card>
            ))
          ) : recentNews.length > 0 ? (
            // Display real news data
            recentNews.map((newsItem: NewsItem) => (
              <Card key={newsItem.id}>
                <div className="h-40 bg-secondary/20">
                  {newsItem.imagenBase64 ? (
                    <img 
                      src={formatImageSrc(newsItem.imagenBase64)}
                      alt={newsItem.titulo} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Newspaper className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{newsItem.titulo}</CardTitle>
                  <CardDescription>
                    {format(new Date(newsItem.fechaPublicacion), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/news?id=${newsItem.id}`} className="text-sm text-primary font-medium flex items-center">
                    Leer más
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            // No news available
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No hay noticias publicadas disponibles</p>
            </div>
          )}
        </div>
      </div>

      {localStorage.getItem("isAdmin") === "true" && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4 md:w-1/2">
              <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                Para administradores
              </div>
              <h2 className="text-3xl font-bold">Panel de administración</h2>
              <p className="text-gray-600">
                Accede a estadísticas detalladas, gestiona encuestas y analiza el clima organizacional con nuestro potente panel de administración.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link to="/admin">
                  <Button className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Ver dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-1/2">
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Participación</h3>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center h-6">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                ) : (
                  <p className="text-2xl font-bold">{statistics.participationRate || "0"}%</p>
                )}
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Empleados</h3>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center h-6">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                ) : (
                  <p className="text-2xl font-bold">{statistics.totalUsers || 0}</p>
                )}
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Feedback</h3>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center h-6">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                ) : (
                  <p className="text-2xl font-bold">{statistics.totalFeedback || 0}</p>
                )}
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Reconocimientos</h3>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center h-6">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                ) : (
                  <p className="text-2xl font-bold">{statistics.recognitionsSent || 0}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-8 bg-primary/5 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¿Listo para participar?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6">
          Tu opinión es importante para construir un mejor ambiente laboral. Completa tu encuesta diaria y gana puntos hoy.
        </p>
        <Link to="/surveys">
          <Button size="lg" className="gap-2">
            <CheckCircle className="h-5 w-5" />
            Completar encuesta diaria
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
};

export default Index;
