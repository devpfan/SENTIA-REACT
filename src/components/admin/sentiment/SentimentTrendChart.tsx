
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSentimentAnalysis } from "@/hooks/useSentimentAnalysis";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SentimentTrendChart() {
  const { sentimentData, isLoading } = useSentimentAnalysis();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Evolución del sentimiento</span>
          </CardTitle>
          <CardDescription>
            Análisis de la evolución del sentimiento en los comentarios durante el último mes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-full mb-4">
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-2 w-5/6 mb-2" />
                <Skeleton className="h-2 w-4/6 mb-2" />
                <Skeleton className="h-2 w-5/6 mb-2" />
                <Skeleton className="h-2 w-3/6 mb-2" />
                <Skeleton className="h-2 w-full" />
              </div>
              <p className="text-sm text-gray-500">Cargando datos...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sentimentData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Evolución del sentimiento</span>
          </CardTitle>
          <CardDescription>
            Análisis de la evolución del sentimiento en los comentarios durante el último mes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80 flex items-center justify-center">
            <p className="text-sm text-gray-500">No hay datos disponibles</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group data by date and count sentiment types
  const sentimentByDate = sentimentData.reduce((acc: any, item) => {
    const date = new Date(item.feedback.fecha).toLocaleDateString();
    
    if (!acc[date]) {
      acc[date] = { 
        date, 
        positive: 0, 
        negative: 0, 
        neutral: 0,
        total: 0
      };
    }
    
    if (item.resultado === 'POS') acc[date].positive += 1;
    if (item.resultado === 'NEG') acc[date].negative += 1;
    if (item.resultado === 'NEU') acc[date].neutral += 1;
    acc[date].total += 1;
    
    return acc;
  }, {});

  const chartData = Object.values(sentimentByDate);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{`Fecha: ${label}`}</p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span>Positivo: {payload[0].value}</span>
            </li>
            <li className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Negativo: {payload[1].value}</span>
            </li>
            <li className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>Neutral: {payload[2].value}</span>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Evolución del sentimiento</span>
        </CardTitle>
        <CardDescription>
          Análisis de la evolución del sentimiento en los comentarios a lo largo del tiempo
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10b981" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#ef4444" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#f59e0b" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
