
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types/news";

export function useNewsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: news = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsService.getAllNews,
  });

  const handleCreateNews = () => {
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await newsService.deleteNews(id);
      queryClient.invalidateQueries({ queryKey: ["news"] });
      
      toast({
        title: "Éxito",
        description: "Noticia eliminada correctamente",
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      
      toast({
        title: "Error",
        description: "No se pudo eliminar la noticia",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNews = () => {
    queryClient.invalidateQueries({ queryKey: ["news"] });
    setIsModalOpen(false);
  };

  return {
    news,
    isLoading,
    isError,
    error,
    refetch,
    isModalOpen,
    selectedNews,
    handleCreateNews,
    handleEditNews,
    handleDeleteNews,
    handleCloseModal,
    handleSaveNews
  };
}
