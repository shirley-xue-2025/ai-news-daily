import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { NewsCategory } from '../services/newsService';

interface CategorySummaryProps {
  title: string;
  summary: string;
  category: NewsCategory;
  onViewMore: (category: NewsCategory) => void;
  type?: 'text' | 'list' | 'products';
  items?: string[];
  products?: Array<{ name: string; description: string }>;
}

const CategorySummary: FC<CategorySummaryProps> = ({
  title,
  summary,
  category,
  onViewMore,
  type = 'text',
  items = [],
  products = [],
}) => {
  const handleViewMore = () => {
    onViewMore(category);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleViewMore}
          className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 py-1"
        >
          View more →
        </Button>
      </CardHeader>
      <CardContent>
        {type === 'text' && (
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
        )}
        
        {type === 'list' && (
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        
        {type === 'products' && (
          <div className="space-y-3">
            {products.map((product, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategorySummary; 