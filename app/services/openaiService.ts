import axios from 'axios';

interface SummaryOptions {
  content: string;
  maxLength?: number;
  temperature?: number;
}

/**
 * Service to interact with OpenAI API
 */
export class OpenAIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openai.com/v1';
  
  constructor(apiKey?: string) {
    // Try to get API key from multiple sources with priority:
    // 1. Direct parameter (highest priority)
    // 2. localStorage (client-side)
    // 3. Environment variable (server-side)
    let key = apiKey;
    
    // Check localStorage if running in browser
    if (!key && typeof window !== 'undefined') {
      key = localStorage.getItem('openai_api_key') || '';
    }
    
    // Finally check environment variable
    if (!key) {
      key = process.env.OPENAI_API_KEY || '';
    }
    
    this.apiKey = key;
    
    if (!this.apiKey) {
      console.warn('OpenAI API key is not set. Features requiring OpenAI will use fallback data.');
    }
  }

  /**
   * Set or update the API key
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generates a summary of the provided content using OpenAI
   */
  async generateSummary({ content, maxLength = 200, temperature = 0.5 }: SummaryOptions): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is not set.');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are an AI news summarizer. Summarize the following content concisely in about ${maxLength} characters.`
            },
            {
              role: 'user',
              content
            }
          ],
          temperature,
          max_tokens: Math.floor(maxLength / 3), // Approximate token count
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data.choices[0]?.message?.content || 'No summary generated';
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary. Please check your API key and try again.');
    }
  }

  /**
   * Analyzes content to extract key topics and trends
   */
  async extractTrends(content: string): Promise<string[]> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is not set.');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are an AI trend analyzer. Extract the top 5 key trends or topics from the following content as a JSON array of strings.'
            },
            {
              role: 'user',
              content
            }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      const result = response.data.choices[0]?.message?.content;
      try {
        const parsed = JSON.parse(result);
        return parsed.trends || [];
      } catch (e) {
        console.error('Error parsing JSON from OpenAI response:', e);
        return [];
      }
    } catch (error) {
      console.error('Error extracting trends:', error);
      throw new Error('Failed to extract trends. Please check your API key and try again.');
    }
  }
}

// Create a singleton instance
const openaiServiceInstance = new OpenAIService();

export default openaiServiceInstance; 