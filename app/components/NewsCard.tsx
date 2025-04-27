'use client';

import React from 'react';
import { NewsItem, NewsCategory } from '../services/newsService';
import Image from 'next/image';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category display name
  const getCategoryLabel = (category?: string) => {
    if (!category) return null;
    
    const categoryMap: Record<string, string> = {
      [NewsCategory.OVERVIEW]: 'Overview',
      [NewsCategory.TECHNICAL]: 'Technical',
      [NewsCategory.BUSINESS]: 'Business',
      [NewsCategory.ETHICS]: 'Ethics',
      [NewsCategory.PRODUCTS]: 'Products',
    };
    
    return categoryMap[category] || null;
  };

  const categoryLabel = getCategoryLabel(news.category);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full">
        {news.imageUrl ? (
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-indigo-500 font-semibold">
              {news.source}
            </p>
            {categoryLabel && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {categoryLabel}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {news.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {news.description || 'No description available'}
          </p>
        </div>
        
        <div className="mt-auto pt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(news.publishedAt)}
            </p>
            <a 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard; 