import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { getTechTerms, TechTerm } from '../services/aiTrendsService';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { shareTechTermsToSlack } from '../services/slackService';
import ShareButton from './ShareButton';

const TechTerms: FC = () => {
  const [terms, setTerms] = useState<TechTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await getTechTerms();
        setTerms(data);
      } catch (error) {
        console.error('Failed to fetch tech terms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const handleShare = async () => {
    return await shareTechTermsToSlack(terms);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">AI Tech Terms Explained</CardTitle>
        {!loading && terms.length > 0 && (
          <ShareButton onShare={handleShare} label="Share" />
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : terms.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {terms.map((term, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="flex justify-between">
                  <div className="flex items-center space-x-2 text-left">
                    <span>{term.term}</span>
                    <Badge variant="outline" className="ml-2">
                      {term.mentionCount}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">{term.definition}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-sm text-gray-500">No tech terms available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TechTerms; 