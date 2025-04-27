'use client';

import { useState, useEffect } from 'react';
import { fetchNews, NewsCategory } from './services/newsService';
import NewsList from './components/NewsList';
import CategorySelector from './components/CategorySelector';
import ApiKeyConfig from './components/ApiKeyConfig';
import openaiService from './services/openaiService';

export default function Home() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(NewsCategory.OVERVIEW);
  const [showApiConfig, setShowApiConfig] = useState(false);

  const loadNews = async (category = selectedCategory) => {
    try {
      setIsLoading(true);
      setError(null);
      const news = await fetchNews(category, 12);
      setNewsItems(news);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load news. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    loadNews(category);
  };

  const handleApiKeySave = (apiKey) => {
    openaiService.setApiKey(apiKey);
    // Reload the news to use the new API key
    loadNews();
  };

  const formatDate = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-50 dark:bg-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            AI News Daily
          </h1>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mr-3">
              Last updated: {formatDate(lastUpdated)}
            </p>
            <button
              onClick={() => loadNews()}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Refreshing...' : 'Refresh News'}
            </button>
            <button
              onClick={() => setShowApiConfig(!showApiConfig)}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-transparent font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {showApiConfig ? 'Hide API Config' : 'API Settings'}
            </button>
          </div>
        </div>

        {/* API Key Configuration */}
        {showApiConfig && (
          <ApiKeyConfig onSave={handleApiKeySave} />
        )}
        
        <CategorySelector selectedCategory={selectedCategory} />
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md max-w-2xl mx-auto mb-4 text-sm">
            {error}
          </div>
        )}
        
        <NewsList news={newsItems} loading={isLoading} />
      </div>
    </main>
  );
}
