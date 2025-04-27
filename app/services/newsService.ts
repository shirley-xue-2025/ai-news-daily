import axios from 'axios';
import { Key } from 'react';

// Using environment variable for API key
// This should be set in your .env.local file as NEXT_PUBLIC_NEWS_API_KEY=your_api_key
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export enum NewsCategory {
  OVERVIEW = 'overview',
  TECHNICAL = 'technical',
  BUSINESS = 'business',
  ETHICS = 'ethics',
  PRODUCTS = 'products'
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  imageUrl?: string;
  description: string;
  publishedAt: string;
  category: NewsCategory;
}

// Mock data for development
const generateMockNews = (category: NewsCategory, count: number = 10): NewsItem[] => {
  const mockImages = [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    'https://images.unsplash.com/photo-1677442135126-21d016522c5f',
    'https://images.unsplash.com/photo-1701368041245-3361ff1edf89',
    'https://images.unsplash.com/photo-1684423301294-7308ae328a70',
    'https://images.unsplash.com/photo-1589254065878-42c9da997008',
  ];
  
  const sources = ['AI Today', 'TechCrunch', 'ML Weekly', 'AI Research', 'The Verge', 'Wired', 'MIT Technology Review'];
  
  // Different titles based on category
  const titlePrefixes: Record<NewsCategory, string[]> = {
    [NewsCategory.OVERVIEW]: ['AI Trends', 'Tech News', 'Weekly Roundup', 'Industry Updates'], 
    [NewsCategory.TECHNICAL]: [
      'Researchers Develop', 
      'New Algorithm Enhances', 
      'Google DeepMind Announces', 
      'Breakthrough in',
      'OpenAI Publishes Research on',
      'Meta AI Advances',
      'Novel Approach to',
      'Improving Large Language Models:',
      'Efficiency Gains in',
    ],
    [NewsCategory.BUSINESS]: [
      'AI Startup Raises', 
      'Microsoft Invests in', 
      'Google Partners with', 
      'Amazon Launches',
      'Investors Back',
      'Enterprise Adoption of',
      'Market Growth in',
      'Quarterly Report Shows',
      'Business Impact:',
    ],
    [NewsCategory.ETHICS]: [
      'New Policy on', 
      'Ethical Guidelines for', 
      'Addressing Bias in', 
      'Regulation Proposed for',
      'Study Reveals Issues with',
      'Transparency Report on',
      'Privacy Concerns in',
      'Accountability Framework for',
      'Industry Leaders Commit to',
    ],
    [NewsCategory.PRODUCTS]: [
      'New Version of', 
      'Introducing', 
      'Product Launch:', 
      'Updated Features in',
      'Beta Release:',
      'Developer Preview:',
      'AI-Powered Tool',
      'Platform Update:',
      'User Experience Improvements in',
    ]
  };
  
  const titleSuffixes: Record<NewsCategory, string[]> = {
    [NewsCategory.OVERVIEW]: ['in AI', 'This Week', 'for Developers', 'You Should Know About'],
    [NewsCategory.TECHNICAL]: [
      'Neural Networks', 
      'Transformer Architecture', 
      'Image Generation', 
      'Language Understanding',
      'Training Efficiency',
      'Model Compression',
      'Few-Shot Learning',
      'Multimodal Systems',
      'Reinforcement Learning',
    ],
    [NewsCategory.BUSINESS]: [
      '$100M in Funding', 
      'Enterprise AI Solutions', 
      'Strategic Partnership', 
      'AI Infrastructure',
      'Financial Performance',
      'Market Position',
      'Customer Adoption Rates',
      'Industry Verticalization',
      'Workforce Transformation',
    ],
    [NewsCategory.ETHICS]: [
      'Facial Recognition', 
      'AI Governance', 
      'Data Privacy', 
      'Algorithmic Bias',
      'Decision-Making Systems',
      'AI Safety Standards',
      'Autonomous Systems',
      'Personal Data Usage',
      'Content Moderation',
    ],
    [NewsCategory.PRODUCTS]: [
      'ChatGPT', 
      'Stable Diffusion', 
      'GitHub Copilot', 
      'DALL-E',
      'Claude',
      'Midjourney',
      'AutoGPT',
      'Gemini',
      'Audio Generation Tools',
    ]
  };
  
  // Different descriptions based on category
  const descriptionTemplates: Record<NewsCategory, string[]> = {
    [NewsCategory.OVERVIEW]: [
      'An overview of the latest developments in AI and machine learning.',
      'Weekly roundup of important AI news and breakthroughs.',
      'A summary of key happenings in the AI industry this week.',
    ],
    [NewsCategory.TECHNICAL]: [
      'This research presents a novel approach to improving model performance while reducing computational requirements.',
      'The paper demonstrates significant advancements in reasoning capabilities of large language models.',
      'A new technique for training neural networks shows promising results on benchmark datasets.',
      'Researchers have developed an innovative method addressing key limitations in current AI systems.',
      'The latest breakthrough could have implications for various applications in natural language processing.',
    ],
    [NewsCategory.BUSINESS]: [
      'The funding round will accelerate development of enterprise AI solutions for various industries.',
      'This strategic partnership aims to bring advanced AI capabilities to a wider business audience.',
      'Market analysis shows accelerating adoption of AI technologies across Fortune 500 companies.',
      'The company reported strong growth in its AI division, highlighting increased enterprise demand.',
      'Industry experts predict significant business transformation driven by these AI developments.',
    ],
    [NewsCategory.ETHICS]: [
      'New guidelines aim to ensure responsible development and deployment of AI systems.',
      'The policy framework addresses growing concerns about algorithmic bias and transparency.',
      'Researchers highlight ethical considerations for next-generation AI technologies.',
      'The proposed regulation seeks to balance innovation with necessary safeguards.',
      'Independent auditing of AI systems becomes central to ensuring fairness and accountability.',
    ],
    [NewsCategory.PRODUCTS]: [
      'The new version includes significant improvements to user experience and capabilities.',
      'This AI-powered tool promises to streamline workflows for developers and content creators.',
      'Early access users report substantial productivity gains from the newly launched features.',
      'The updated platform introduces several highly requested capabilities for enterprise users.',
      'This product launch represents a major advancement in making AI tools more accessible.',
    ]
  };
  
  return Array.from({ length: count }, (_, i) => {
    const prefixes = titlePrefixes[category];
    const suffixes = titleSuffixes[category];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const descTemplates = descriptionTemplates[category];
    const description = descTemplates[Math.floor(Math.random() * descTemplates.length)];
    
    const source = sources[Math.floor(Math.random() * sources.length)];
    const imageUrl = Math.random() > 0.2 ? mockImages[Math.floor(Math.random() * mockImages.length)] : undefined;
    
    // Generate a date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `mock-${category}-${i}`,
      title: `${prefix} ${suffix}`,
      source,
      url: 'https://example.com/article',
      imageUrl,
      description,
      publishedAt: date.toISOString(),
      category
    };
  });
};

// Function to fetch news based on category
export const fetchNews = async (category: NewsCategory = NewsCategory.OVERVIEW, limit: number = 10): Promise<NewsItem[]> => {
  // For development: return mock data instead of making API calls
  if (process.env.NODE_ENV === 'development' || !API_KEY) {
    return generateMockNews(category, limit);
  }
  
  try {
    // In a real implementation, you would call your news API here
    // Example with NewsAPI.org:
    let query = '';
    
    switch(category) {
      case NewsCategory.TECHNICAL:
        query = 'artificial intelligence research OR machine learning research OR neural networks';
        break;
      case NewsCategory.BUSINESS:
        query = 'AI business OR artificial intelligence investment OR machine learning industry';
        break;
      case NewsCategory.ETHICS:
        query = 'AI ethics OR artificial intelligence regulation OR machine learning bias';
        break;
      case NewsCategory.PRODUCTS:
        query = 'new AI product OR artificial intelligence tool OR machine learning application';
        break;
      default:
        query = 'artificial intelligence OR machine learning';
    }
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: limit
      }
    });
    
    if (response.data.status === 'ok') {
      return response.data.articles.map((article: any, index: number) => ({
        id: `${category}-${index}`,
        title: article.title,
        source: article.source.name,
        url: article.url,
        imageUrl: article.urlToImage,
        description: article.description || article.content,
        publishedAt: article.publishedAt,
        category
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Function to get a specific news item by ID
export const getNewsById = async (id: string): Promise<NewsItem | undefined> => {
  // For simplicity in the demo, we'll generate mock news for all categories
  // and search through them
  if (process.env.NODE_ENV === 'development' || !API_KEY) {
    const allCategories = [
      NewsCategory.OVERVIEW,
      NewsCategory.TECHNICAL,
      NewsCategory.BUSINESS,
      NewsCategory.ETHICS,
      NewsCategory.PRODUCTS
    ];
    
    const allNews = allCategories.flatMap(category => generateMockNews(category, 20));
    return allNews.find(item => item.id === id);
  }
  
  // In a real implementation, you would fetch the specific article
  // or ideally cache the results to avoid refetching
  return undefined;
}; 