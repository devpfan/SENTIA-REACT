
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import PageLayout from "@/components/layout/PageLayout"
import { AdminTabs } from "@/components/admin/layout/AdminTabs"

const Admin = () => {
  const { toast } = useToast()

  const exportData = () => {
    toast({
      title: "Exportando datos",
      description: "Los datos se están descargando en formato CSV",
    })
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Panel de administración</h1>
              <p className="text-gray-600">
                Analiza el clima organizacional y gestiona la participación
              </p>
            </div>
            <Button onClick={exportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Exportar datos</span>
            </Button>
          </div>
        </div>

        <AdminTabs />
      </div>
    </PageLayout>
  )
}

export default Admin
