"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchNews, NewsCategory, NewsItem } from '../services/newsService';

interface CategorySection {
  category: NewsCategory;
  title: string;
  description: string;
}

interface OverviewPageProps {
  activeTab: NewsCategory;
}

export default function OverviewPage({ activeTab }: OverviewPageProps) {
  const [categoryNews, setCategoryNews] = useState<Record<NewsCategory, NewsItem[]>>({
    [NewsCategory.TECHNICAL]: [],
    [NewsCategory.BUSINESS]: [],
    [NewsCategory.ETHICS]: [],
    [NewsCategory.PRODUCTS]: [],
    [NewsCategory.OVERVIEW]: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategoryNews = async () => {
      setLoading(true);
      try {
        const categories = [
          NewsCategory.TECHNICAL,
          NewsCategory.BUSINESS,
          NewsCategory.ETHICS,
          NewsCategory.PRODUCTS
        ];

        const newsPromises = categories.map(category => fetchNews(category, 3));
        const results = await Promise.all(newsPromises);

        const newsCategoryMap: Record<NewsCategory, NewsItem[]> = {
          [NewsCategory.OVERVIEW]: [],
          [NewsCategory.TECHNICAL]: results[0],
          [NewsCategory.BUSINESS]: results[1],
          [NewsCategory.ETHICS]: results[2],
          [NewsCategory.PRODUCTS]: results[3]
        };

        setCategoryNews(newsCategoryMap);
      } catch (error) {
        console.error('Error fetching overview news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategoryNews();
  }, []);

  const categorySections: CategorySection[] = [
    {
      category: NewsCategory.TECHNICAL,
      title: "Technical AI News",
      description: "Latest research papers, technical breakthroughs, and innovations in AI/ML"
    },
    {
      category: NewsCategory.BUSINESS,
      title: "Business & Industry News",
      description: "AI business trends, investments, market analysis, and company developments"
    },
    {
      category: NewsCategory.ETHICS,
      title: "Ethics & Regulation News",
      description: "Policy updates, ethical considerations, and regulatory developments in AI"
    },
    {
      category: NewsCategory.PRODUCTS,
      title: "New AI Products",
      description: "Latest AI tools, applications, and product launches for developers and users"
    }
  ];

  if (loading) {
    return <div className="animate-pulse">Loading overview...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI News Daily</h1>
      <p className="text-gray-600 mb-10 text-lg">
        Your comprehensive source for the latest developments in artificial intelligence - from 
        cutting-edge research to business applications, ethical considerations, and new products.
      </p>

      <div className="space-y-16">
        {categorySections.map((section) => (
          <div key={section.category} className="border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                <p className="text-gray-600 mt-1">{section.description}</p>
              </div>
              <Link
                href={`/?category=${section.category}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryNews[section.category].slice(0, 3).map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-indigo-600 px-2 py-1 bg-indigo-50 rounded-full">
                        {item.source}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 