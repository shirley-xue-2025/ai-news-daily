import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { getWeeklySummary, WeeklySummary as WeeklySummaryType } from '../services/aiTrendsService';
import { shareWeeklySummaryToSlack } from '../services/slackService';
import ShareButton from './ShareButton';

const WeeklySummary: FC = () => {
  const [summary, setSummary] = useState<WeeklySummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getWeeklySummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch weekly summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const handleShare = async () => {
    if (summary) {
      return await shareWeeklySummaryToSlack(summary.summary);
    }
    throw new Error('No summary available to share');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Weekly AI Summary</CardTitle>
          {!loading && summary && (
            <CardDescription>
              Week of {formatDate(summary.date)}
            </CardDescription>
          )}
        </div>
        {!loading && summary && (
          <ShareButton onShare={handleShare} label="Share" />
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        ) : summary ? (
          <p className="text-sm leading-relaxed">{summary.summary}</p>
        ) : (
          <p className="text-sm text-gray-500">Failed to load weekly summary.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklySummary; 