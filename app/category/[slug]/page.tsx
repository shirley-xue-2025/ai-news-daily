import { Metadata } from 'next';
import { fetchNews, NewsCategory } from '@/app/services/newsService';
import NewsList from '@/app/components/NewsList';
import CategorySelector from '@/app/components/CategorySelector';

export async function generateMetadata({ params }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return {
    title: `${categoryName} AI News - AI News Daily`,
    description: `Latest ${params.slug} news in artificial intelligence and machine learning.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  
  // Validate the slug is a valid category
  const isValidCategory = Object.values(NewsCategory).includes(slug as NewsCategory);
  const category = isValidCategory ? (slug as NewsCategory) : NewsCategory.OVERVIEW;
  
  // Fetch news for the selected category
  const news = await fetchNews(category, 20);
  
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-3xl font-bold mb-8 text-center">{categoryName} AI News</h1>
        
        <CategorySelector selectedCategory={category} />
        
        {news.length > 0 ? (
          <NewsList news={news} loading={false} />
        ) : (
          <p className="text-center text-gray-500">No news available for this category.</p>
        )}
      </div>
    </main>
  );
} 