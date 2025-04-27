import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI News Daily - Your Daily Dose of AI Updates',
  description: 'Stay updated with the latest artificial intelligence news, research, and developments. Daily updates on AI technology, machine learning breakthroughs, and industry insights.',
  keywords: 'AI news, artificial intelligence, machine learning, daily updates, technology news',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                  AI News Daily
                </h2>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="md:flex md:items-center md:justify-between">
                <div className="text-center md:text-left">
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} AI News Daily. All rights reserved.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Powered by Next.js and NewsAPI
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 