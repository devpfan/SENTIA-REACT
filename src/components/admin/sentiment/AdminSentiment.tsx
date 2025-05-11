
import { SentimentMetrics } from "./SentimentMetrics";
import { SentimentTrendChart } from "./SentimentTrendChart";
import { KeywordsList } from "./KeywordsList";
import { RecentComments } from "./RecentComments";
import { useSentimentAnalysis } from "@/hooks/useSentimentAnalysis";

export function AdminSentiment() {
  const { mappedFeedback } = useSentimentAnalysis();

  return (
    <>
      <SentimentMetrics />
      <div className="grid grid-cols-1 gap-6 mb-8">
        <SentimentTrendChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KeywordsList />
        <RecentComments feedback={mappedFeedback} />
      </div>
    </>
  );
}
