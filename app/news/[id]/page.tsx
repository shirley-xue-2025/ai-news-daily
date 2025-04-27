import { Metadata } from 'next';
import { getNewsById } from '@/app/services/newsService';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

export async function generateMetadata({ params }) {
  const newsItem = await getNewsById(params.id);
  
  if (!newsItem) {
    return {
      title: 'News not found - AI News Daily',
      description: 'The requested news article could not be found.',
    };
  }
  
  return {
    title: `${newsItem.title} - AI News Daily`,
    description: newsItem.description,
  };
}

export default async function NewsDetailPage({ params }) {
  const newsItem = await getNewsById(params.id);
  
  if (!newsItem) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">News Article Not Found</h1>
          <p className="mb-6">The news article you're looking for couldn't be found.</p>
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }
  
  const publishedDate = new Date(newsItem.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  const categoryLabel = newsItem.category.charAt(0).toUpperCase() + newsItem.category.slice(1);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <article className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <Link 
            href={`/category/${newsItem.category}`}
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to {categoryLabel} News
          </Link>
          
          <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">From: {newsItem.source}</span>
            <span>{timeAgo}</span>
          </div>
          
          {newsItem.imageUrl && (
            <div className="relative w-full h-72 mb-8 rounded-lg overflow-hidden">
              <Image
                src={newsItem.imageUrl}
                alt={newsItem.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 728px"
              />
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg">{newsItem.description}</p>
            
            <div className="mt-8">
              <a 
                href={newsItem.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Read the Full Article
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Category: {categoryLabel}</h2>
          <Link 
            href={`/category/${newsItem.category}`}
            className="text-blue-600 hover:underline"
          >
            See more {categoryLabel} news
          </Link>
        </div>
      </article>
    </main>
  );
} 