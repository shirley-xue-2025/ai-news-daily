import React from 'react';
import NewsCard from './NewsCard';
import { NewsItem } from '../services/newsService';

interface NewsListProps {
  newsItems: NewsItem[];
  isLoading: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ newsItems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="w-full p-12 text-center">
        <h3 className="text-xl text-gray-600 dark:text-gray-300">No news articles found</h3>
        <p className="mt-2 text-gray-500">Try refreshing the page or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {newsItems.map((news, index) => (
        <div key={`${news.title}-${index}`} className="h-full">
          <NewsCard news={news} />
        </div>
      ))}
    </div>
  );
};

export default NewsList; 