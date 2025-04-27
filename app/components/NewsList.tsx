'use client';

import Image from 'next/image';
import { NewsItem } from '../services/newsService';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface NewsListProps {
  news: NewsItem[];
  loading: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ news, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 animate-pulse"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return <p className="text-center text-gray-500">No news available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => {
        const publishedDate = new Date(item.publishedAt);
        const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
        
        return (
          <Link 
            href={`/news/${item.id}`} 
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2zM9 7h6m-6 4h6m-6 4h6"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {item.source} · {timeAgo}
              </p>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{item.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsList; 