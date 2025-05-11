
import { useQuery } from "@tanstack/react-query";
import { getSentimentAnalysis } from "@/services/feedbackService";

export const useSentimentAnalysis = () => {
  const { data: sentimentData = [], isLoading, error } = useQuery({
    queryKey: ['sentimentAnalysis'],
    queryFn: getSentimentAnalysis,
  });

  // Calculate sentiment metrics
  const sentimentMetrics = {
    positive: sentimentData.filter(item => item.resultado === 'POS').length,
    negative: sentimentData.filter(item => item.resultado === 'NEG').length,
    neutral: sentimentData.filter(item => item.resultado === 'NEU').length,
    total: sentimentData.length,
    sentimentIndex: 0
  };

  // Calculate sentiment index: (positive - negative) / total * 100
  if (sentimentMetrics.total > 0) {
    sentimentMetrics.sentimentIndex = 
      ((sentimentMetrics.positive - sentimentMetrics.negative) / sentimentMetrics.total) * 100;
  }

  // Map feedback for the RecentComments component
  const mappedFeedback = sentimentData.map(item => ({
    id: item.feedback.id.toString(),
    message: item.feedback.texto,
    date: new Date(item.feedback.fecha).toLocaleDateString(),
    type: mapFeedbackType(item.feedback.tipoFeedback.id),
    status: 'pending' as const, // Using 'as const' to ensure the type is 'pending' | 'reviewed' | 'closed'
    sentimentScore: mapSentimentScore(item.resultado),
    sentimentLabel: mapSentimentLabel(item.resultado)
  }));

  return { sentimentData, mappedFeedback, sentimentMetrics, isLoading, error };
};

// Helper functions
const mapFeedbackType = (typeId: number): 'suggestion' | 'concern' | 'recognition' | 'other' => {
  switch (typeId) {
    case 1: return 'suggestion';
    case 2: return 'concern';
    case 3: return 'recognition';
    default: return 'other';
  }
};

const mapSentimentScore = (sentiment: string): number => {
  switch (sentiment) {
    case 'POS': return 0.8;
    case 'NEU': return 0;
    case 'NEG': return -0.8;
    default: return 0;
  }
};

const mapSentimentLabel = (sentiment: string): string => {
  switch (sentiment) {
    case 'POS': return 'Positivo';
    case 'NEU': return 'Neutral';
    case 'NEG': return 'Negativo';
    default: return 'Neutral';
  }
};
