# AI News Daily

A modern, responsive web application built with Next.js and TypeScript that aggregates and displays AI-related news in different categories.

## Features

- Latest AI news from reputable sources
- AI-powered summaries using OpenAI
- Categorized news: Overview, Technical, Business, Ethics, and Products
- Responsive design that works on mobile, tablet, and desktop
- Clean, modern UI with dark mode support
- Ability to refresh news on demand
- Detailed news article pages
- Mock data for development without requiring API keys

## Tech Stack

- [Next.js 13+](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [date-fns](https://date-fns.org/) for date formatting

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-news-daily.git
cd ai-news-daily
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your API keys
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   You can get a free NewsAPI key by registering at [https://newsapi.org/register](https://newsapi.org/register)
   
   For the OpenAI API key, sign up at [https://platform.openai.com/signup](https://platform.openai.com/signup) and create an API key in your account settings.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
ai-news-daily/
├── app/                  # Next.js app directory
│   ├── components/       # React components
│   ├── services/         # Service files (API calls, etc.)
│   ├── category/         # Category pages
│   ├── news/             # News detail pages
│   └── page.tsx          # Home page
├── public/               # Static files
└── package.json          # Dependencies and scripts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various tech news aggregators
- Mock news data generated for development purposes
- [NewsAPI](https://newsapi.org/) for providing the news data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [OpenAI](https://openai.com/) for AI-powered summaries
