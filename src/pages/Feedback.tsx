
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/layout/PageLayout";
import { useFeedback } from "@/hooks/useFeedback";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Feedback = () => {
  const {
    feedbackTypes,
    isAnonymous,
    setIsAnonymous,
    handleSubmit,
    isLoadingTypes,
    isSubmitting,
  } = useFeedback();
  
  const [texto, setTexto] = useState("");
  const [tipoId, setTipoId] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto || !tipoId) return;
    
    handleSubmit({
      texto,
      tipoId: parseInt(tipoId),
    });
    
    setTexto("");
    setTipoId("");
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feedback a la organización</h1>
          <p className="text-gray-600">
            Comparte tus ideas, sugerencias o preocupaciones para mejorar nuestro ambiente laboral
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enviar feedback</CardTitle>
            <CardDescription>
              Tu opinión es valiosa para nosotros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous">Enviar de forma anónima</Label>
                  <p className="text-sm text-gray-500">
                    Tu identidad no será revelada al equipo de recursos humanos
                  </p>
                </div>
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de feedback</Label>
                <Select value={tipoId} onValueChange={setTipoId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingTypes ? (
                      <SelectItem value="loading">Cargando...</SelectItem>
                    ) : (
                      feedbackTypes.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                          {tipo.descripcion}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="texto">Describe tu feedback</Label>
                <Textarea
                  id="texto"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Comparte tus ideas o preocupaciones..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || !texto || !tipoId}>
                  {isSubmitting ? "Enviando..." : "Enviar feedback"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Feedback;
