
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types/news";
import PageLayout from "@/components/layout/PageLayout";
import { NewsArticleDetails } from "@/components/news/NewsArticleDetails";
import { NewsFilterAndSearch } from "@/components/news/NewsFilterAndSearch";
import { NewsContent } from "@/components/news/NewsContent";
import { Tabs } from "@/components/ui/tabs";

const News = () => {
  // State for filtering and searching
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Fetch news data
  const {
    data: newsData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["publicNews"],
    queryFn: newsService.getAllNews,
  });

  // Filter only published news
  const publishedNews = newsData.filter(news => news.publicada);

  // Filter news by category and search query
  const filteredNews = publishedNews
    .filter(news => 
      tab === "all" || 
      (tab === "0" && news.tipo === 0) ||
      (tab === "1" && news.tipo === 1) ||
      (tab === "2" && news.tipo === 2) ||
      (tab === "3" && news.tipo === 3)
    )
    .filter(news => 
      news.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.contenido.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        {selectedArticle ? (
          <NewsArticleDetails 
            article={selectedArticle} 
            onBack={() => setSelectedArticle(null)} 
          />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Noticias y anuncios</h1>
              <p className="text-gray-600">
                Mantente informado sobre las últimas novedades de la organización
              </p>
            </div>

            <Tabs defaultValue="all" value={tab}>
              <NewsFilterAndSearch
                tab={tab}
                onTabChange={setTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              
              <NewsContent
                tab={tab}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                filteredNews={filteredNews}
                onSelectArticle={setSelectedArticle}
              />
            </Tabs>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default News;
