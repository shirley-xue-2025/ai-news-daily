import axios from 'axios';

// Using environment variable for API key
// This should be set in your .env.local file as NEXT_PUBLIC_NEWS_API_KEY=your_api_key
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export interface NewsItem {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category?: string; // Optional category field
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}

// Define available news categories
export enum NewsCategory {
  ALL = 'all',
  GENERAL_AI = 'general',
  MACHINE_LEARNING = 'machine-learning',
  ROBOTICS = 'robotics',
  ETHICS = 'ethics',
  BUSINESS = 'business',
}

// Search queries for each category
const CATEGORY_QUERIES = {
  [NewsCategory.ALL]: 'artificial intelligence OR machine learning OR AI technology',
  [NewsCategory.GENERAL_AI]: 'artificial intelligence technology OR AI advances OR AI news',
  [NewsCategory.MACHINE_LEARNING]: 'machine learning OR deep learning OR neural networks',
  [NewsCategory.ROBOTICS]: 'AI robotics OR autonomous robots OR robotic automation',
  [NewsCategory.ETHICS]: 'AI ethics OR responsible AI OR ethical artificial intelligence',
  [NewsCategory.BUSINESS]: 'AI business applications OR AI startups OR enterprise AI',
};

const BASE_URL = 'https://newsapi.org/v2';

export const fetchAINews = async (category: NewsCategory = NewsCategory.ALL): Promise<NewsItem[]> => {
  try {
    // If no API key, use a mock response for development
    if (!API_KEY) {
      console.warn('No API key found. Using mock data.');
      return getMockNews(category);
    }

    const query = CATEGORY_QUERIES[category];
    
    const response = await axios.get<NewsResponse>(`${BASE_URL}/everything`, {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 15,
        apiKey: API_KEY,
      },
    });

    // Add the category to each news item
    const articlesWithCategory = response.data.articles.map(article => ({
      ...article,
      category: category !== NewsCategory.ALL ? category : undefined,
    }));

    return articlesWithCategory;
  } catch (error) {
    console.error('Error fetching news:', error);
    return getMockNews(category); // Fallback to mock data in case of error
  }
};

// Mock data for development or when API isn't available
const getMockNews = (category: NewsCategory = NewsCategory.ALL): NewsItem[] => {
  const allMockNews = [
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Jane Doe',
      title: 'OpenAI Releases New Version of GPT',
      description: 'The latest version includes significant improvements in reasoning capabilities.',
      url: 'https://example.com/article1',
      urlToImage: 'https://example.com/image1.jpg',
      publishedAt: new Date().toISOString(),
      content: 'OpenAI has announced the release of their newest language model...',
      category: NewsCategory.GENERAL_AI,
    },
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'John Smith',
      title: 'Google Releases New AI Research Paper',
      description: 'The paper details advancements in multimodal learning.',
      url: 'https://example.com/article2',
      urlToImage: 'https://example.com/image2.jpg',
      publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      content: 'Google researchers have published a groundbreaking paper on...',
      category: NewsCategory.MACHINE_LEARNING,
    },
    {
      source: { id: 'mit', name: 'MIT Technology Review' },
      author: 'Sarah Johnson',
      title: 'AI Ethics Board Established by Major Tech Companies',
      description: 'Tech giants collaborate on ethical AI standards.',
      url: 'https://example.com/article3',
      urlToImage: 'https://example.com/image3.jpg',
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      content: 'A consortium of major technology companies has announced...',
      category: NewsCategory.ETHICS,
    },
    {
      source: { id: 'forbes', name: 'Forbes' },
      author: 'Michael Brown',
      title: 'AI Startups Secure Record Funding in Q2',
      description: 'Investment in AI companies reached an all-time high this quarter.',
      url: 'https://example.com/article4',
      urlToImage: 'https://example.com/image4.jpg',
      publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      content: 'Venture capital investment in artificial intelligence startups...',
      category: NewsCategory.BUSINESS,
    },
    {
      source: { id: 'robotics-trends', name: 'Robotics Trends' },
      author: 'Lisa Chen',
      title: 'New Generation of Autonomous Delivery Robots Unveiled',
      description: 'The robots feature enhanced navigation systems and improved safety features.',
      url: 'https://example.com/article5',
      urlToImage: 'https://example.com/image5.jpg',
      publishedAt: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
      content: 'A leading robotics company has unveiled its newest line of autonomous delivery robots...',
      category: NewsCategory.ROBOTICS,
    },
  ];

  if (category === NewsCategory.ALL) {
    return allMockNews;
  }
  
  return allMockNews.filter(news => news.category === category);
}; 