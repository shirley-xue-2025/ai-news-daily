// AI Trends Service - provides weekly summaries, keyword analysis, and tech term explanations
// In a production environment, this would fetch data from a backend API

import openaiService from './openaiService';
import { fetchAINews, NewsItem, NewsCategory } from './newsService';

export interface WeeklySummary {
  date: string;
  summary: string;
}

export interface KeywordTrend {
  keyword: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  articles: {
    title: string;
    url: string;
    source: string;
  }[];
}

export interface TechTerm {
  term: string;
  definition: string;
  mentionCount: number;
}

// In a real app, this would be an API call
export const getWeeklySummary = async (): Promise<WeeklySummary> => {
  try {
    // First try to generate a summary using OpenAI
    const articles = await fetchAINews(NewsCategory.ALL);
    
    // Prepare content for summarization
    const content = articles.map(article => 
      `Title: ${article.title}\nSource: ${article.source.name}\nDescription: ${article.description}`
    ).join('\n\n');
    
    // Generate summary using OpenAI
    const summary = await openaiService.generateSummary({
      content,
      maxLength: 300
    });
    
    return {
      date: new Date().toISOString(),
      summary
    };
  } catch (error) {
    console.error('Failed to generate AI summary, using fallback:', error);
    
    // Fallback to mock data if API call fails or API key is not configured
    return {
      date: new Date().toISOString(),
      summary: "This week in AI saw significant advancements in large language models with OpenAI releasing improved capabilities for GPT models. Google researchers published breakthrough findings in multimodal learning, combining image and text processing in novel ways. Meanwhile, ethical concerns dominated discussions as major tech companies formed a consortium to establish industry-wide AI standards. Robotics saw continued innovation with autonomous delivery solutions gaining traction. On the business front, AI startups secured record-breaking funding rounds, highlighting the sector's robust growth despite broader economic uncertainties."
    };
  }
};

// In a real app, this would be an API call
export const getTopKeywords = async (): Promise<KeywordTrend[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  return [
    {
      keyword: "Large Language Models",
      count: 142,
      trend: "up",
      articles: [
        {
          title: "OpenAI Releases New Version of GPT with Enhanced Reasoning",
          url: "https://example.com/article1",
          source: "TechCrunch"
        },
        {
          title: "Microsoft Integrates Advanced LLMs into Office Suite",
          url: "https://example.com/article2",
          source: "The Verge"
        },
        {
          title: "Anthropic's Claude 3 Sets New Benchmarks in Reasoning Tasks",
          url: "https://example.com/article3",
          source: "VentureBeat"
        }
      ]
    },
    {
      keyword: "AI Ethics",
      count: 98,
      trend: "up",
      articles: [
        {
          title: "AI Ethics Board Established by Major Tech Companies",
          url: "https://example.com/article4",
          source: "MIT Technology Review"
        },
        {
          title: "EU Proposes New AI Regulations for High-Risk Applications",
          url: "https://example.com/article5",
          source: "Financial Times"
        },
        {
          title: "Bias in Healthcare AI Systems Raises Concerns Among Researchers",
          url: "https://example.com/article6",
          source: "Nature"
        }
      ]
    },
    {
      keyword: "Computer Vision",
      count: 87,
      trend: "stable",
      articles: [
        {
          title: "Meta's Advanced Object Recognition System Outperforms Competitors",
          url: "https://example.com/article7",
          source: "Wired"
        },
        {
          title: "Computer Vision Applications in Autonomous Driving Reach New Milestone",
          url: "https://example.com/article8",
          source: "IEEE Spectrum"
        },
        {
          title: "Real-time Object Tracking Made More Efficient with New Algorithm",
          url: "https://example.com/article9",
          source: "ArXiv Blog"
        }
      ]
    },
    {
      keyword: "AI Hardware",
      count: 76,
      trend: "up",
      articles: [
        {
          title: "NVIDIA Announces Next-Gen AI Chips with 4x Performance Improvement",
          url: "https://example.com/article10",
          source: "AnandTech"
        },
        {
          title: "Apple's Neural Engine Gets Major Upgrade in Latest Devices",
          url: "https://example.com/article11",
          source: "MacRumors"
        },
        {
          title: "Specialized AI Processors Show 70% Energy Efficiency Gains",
          url: "https://example.com/article12",
          source: "Tom's Hardware"
        }
      ]
    },
    {
      keyword: "Generative AI",
      count: 112,
      trend: "up",
      articles: [
        {
          title: "Stability AI Launches Revolutionary Image Generation Model",
          url: "https://example.com/article13",
          source: "PetaPixel"
        },
        {
          title: "Music Generation Models Enter Mainstream Production",
          url: "https://example.com/article14",
          source: "Billboard"
        },
        {
          title: "Text-to-Video Technology Reaches New Heights of Realism",
          url: "https://example.com/article15",
          source: "The Hollywood Reporter"
        }
      ]
    }
  ];
};

// In a real app, this would be an API call
export const getTechTerms = async (): Promise<TechTerm[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  return [
    {
      term: "Large Language Model (LLM)",
      definition: "An AI system trained on massive amounts of text data that can understand, summarize, generate, and predict new content. Examples include GPT-4, Claude, and Gemini.",
      mentionCount: 215
    },
    {
      term: "Multimodal Learning",
      definition: "AI systems that can process and understand multiple types of data simultaneously, such as text, images, audio, and video, enabling more comprehensive understanding.",
      mentionCount: 187
    },
    {
      term: "Generative AI",
      definition: "AI systems that can create new content, including text, images, music, and videos that didn't exist before, based on patterns learned from training data.",
      mentionCount: 176
    },
    {
      term: "Transformer Architecture",
      definition: "A neural network design that uses attention mechanisms to process relationships between all words in a text, enabling more effective language understanding and generation.",
      mentionCount: 142
    },
    {
      term: "Fine-tuning",
      definition: "The process of taking a pre-trained AI model and further training it on specific data to specialize in particular tasks or domains.",
      mentionCount: 134
    },
    {
      term: "Reinforcement Learning from Human Feedback (RLHF)",
      definition: "A technique that uses human feedback to guide AI models toward more helpful, accurate, and safe responses, rather than just predicting the most likely next word.",
      mentionCount: 128
    },
    {
      term: "Neural Radiance Fields (NeRF)",
      definition: "A technique for creating 3D scenes from 2D images by training neural networks to represent how light moves through space, enabling realistic 3D visualizations.",
      mentionCount: 112
    },
    {
      term: "Foundation Model",
      definition: "Large AI models trained on broad data that serve as a base for many different applications and can be adapted to specific tasks with minimal additional training.",
      mentionCount: 98
    },
    {
      term: "AI Hallucination",
      definition: "When AI systems generate information that sounds plausible but is factually incorrect or made up, often because they're predicting patterns rather than retrieving facts.",
      mentionCount: 94
    },
    {
      term: "Prompt Engineering",
      definition: "The practice of crafting effective inputs or instructions for AI systems to get desired outputs, becoming an important skill as generative AI becomes more widespread.",
      mentionCount: 89
    }
  ];
}; 