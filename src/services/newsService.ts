
import { NewsCreateRequest, NewsItem, NewsUpdateRequest } from "@/types/news";

export const newsService = {
  async getAllNews(): Promise<NewsItem[]> {
    const response = await fetch("http://localhost:8080/noticias");
    if (!response.ok) throw new Error("Error al obtener noticias");
    const data = await response.json();
    return data;
  },

  async createNews(news: NewsCreateRequest): Promise<NewsItem> {
    // Asegurarnos de que las fechas no tengan el sufijo Z
    const newsWithCorrectDateFormat = {
      ...news,
      fechaEscritura: news.fechaEscritura.replace('Z', ''),
      fechaPublicacion: news.fechaPublicacion.replace('Z', '')
    };

    const response = await fetch("http://localhost:8080/noticias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsWithCorrectDateFormat),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear noticia: ${errorText}`);
    }
    
    return await response.json();
  },

  async updateNews(news: NewsUpdateRequest): Promise<NewsItem> {
    // Asegurarnos de que las fechas no tengan el sufijo Z
    const newsWithCorrectDateFormat = {
      ...news,
      fechaEscritura: news.fechaEscritura.replace('Z', ''),
      fechaPublicacion: news.fechaPublicacion.replace('Z', '')
    };

    const response = await fetch(`http://localhost:8080/noticias/${news.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsWithCorrectDateFormat),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar noticia: ${errorText}`);
    }
    
    return await response.json();
  },

  async deleteNews(id: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/noticias/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar noticia: ${errorText}`);
    }
  }
};
