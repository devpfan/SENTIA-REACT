
import { useState } from "react"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FeedbackList } from "./FeedbackList"
import { useFeedback } from "@/hooks/useFeedback"
import { Feedback, FeedbackItem } from "@/types/feedback"

export function AdminFeedback() {
  const [feedbackFilter, setFeedbackFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { feedbacks, isLoadingFeedback } = useFeedback()

  // Map API feedback data to the format expected by FeedbackList
  const mappedFeedback: FeedbackItem[] = feedbacks.map((feedback: Feedback) => {
    // Map tipoId to type
    const typeMap: Record<number, 'suggestion' | 'concern' | 'recognition' | 'other'> = {
      1: 'suggestion',
      2: 'concern',
      3: 'recognition',
      4: 'other'
    }
    
    return {
      id: feedback.id.toString(),
      message: feedback.texto,
      date: new Date(feedback.fecha).toLocaleDateString(),
      type: typeMap[feedback.tipoId] || 'other',
      status: 'pending', // Default status since API doesn't provide this yet
      sentimentScore: 0, // Default score since API doesn't provide this yet
    }
  })

  const filteredFeedback = mappedFeedback.filter((item) => {
    const matchesFilter = feedbackFilter === "all" || item.status === feedbackFilter
    const matchesSearch = item.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (isLoadingFeedback) {
    return <div className="flex items-center justify-center p-8">Cargando...</div>
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Select value={feedbackFilter} onValueChange={setFeedbackFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="reviewed">Revisados</SelectItem>
            <SelectItem value="closed">Cerrados</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <FeedbackList 
        feedback={filteredFeedback}
        filter={feedbackFilter}
        searchQuery={searchQuery}
      />
    </>
  )
}
