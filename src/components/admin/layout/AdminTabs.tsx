
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Brain, MessageSquare, Users, PenSquare, FileText } from "lucide-react"
import { AdminDashboard } from "../dashboard/AdminDashboard"
import { AdminSentiment } from "../sentiment/AdminSentiment"
import { AdminFeedback } from "../feedback/AdminFeedback"
import { AdminUsers } from "../users/AdminUsers"
import { AdminSurveys } from "../surveys/AdminSurveys"
import { AdminNews } from "../news/AdminNews"

export function AdminTabs() {
  return (
    <Tabs defaultValue="dashboard">
      <div className="mb-6 border-b">
        <TabsList className="w-full md:w-auto justify-start overflow-x-auto">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Análisis de Sentimiento</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Feedback</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Empleados</span>
          </TabsTrigger>
          <TabsTrigger value="surveys" className="flex items-center gap-2">
            <PenSquare className="h-4 w-4" />
            <span>Encuestas</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Noticias</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="dashboard">
        <AdminDashboard />
      </TabsContent>
      <TabsContent value="sentiment">
        <AdminSentiment />
      </TabsContent>
      <TabsContent value="feedback">
        <AdminFeedback />
      </TabsContent>
      <TabsContent value="users">
        <AdminUsers />
      </TabsContent>
      <TabsContent value="surveys">
        <AdminSurveys />
      </TabsContent>
      <TabsContent value="news">
        <AdminNews />
      </TabsContent>
    </Tabs>
  )
}
