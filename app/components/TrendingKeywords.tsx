import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { getTopKeywords, KeywordTrend } from '../services/aiTrendsService';
import { shareKeywordsToSlack } from '../services/slackService';
import ShareButton from './ShareButton';

const TrendingKeywords: FC = () => {
  const [keywords, setKeywords] = useState<KeywordTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const data = await getTopKeywords();
        setKeywords(data);
      } catch (error) {
        console.error('Failed to fetch trending keywords:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, []);

  const handleShare = async () => {
    return await shareKeywordsToSlack(keywords);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Trending Keywords</CardTitle>
        {!loading && keywords.length > 0 && (
          <ShareButton onShare={handleShare} label="Share" />
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-[70%]" />
            <Skeleton className="h-5 w-[80%]" />
            <Skeleton className="h-5 w-[60%]" />
            <Skeleton className="h-5 w-[75%]" />
            <Skeleton className="h-5 w-[65%]" />
          </div>
        ) : keywords.length > 0 ? (
          <div className="space-y-3">
            {keywords.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1">
                    {item.count}
                  </Badge>
                  <span className="font-medium">{item.keyword}</span>
                </div>
                <div className="flex items-center">
                  {getTrendIcon(item.trend)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No trending keywords available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingKeywords; 