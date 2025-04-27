import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "AI News Daily - Latest Artificial Intelligence News",
  description: "Stay up-to-date with the latest artificial intelligence news, research, and developments in one convenient place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-8 w-8 text-blue-600 mr-2">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                  <path d="M3 12a9 9 0 0 0 9 9v-9H3z" />
                </svg>
                <span className="font-bold text-xl">AI News Daily</span>
              </Link>
              <nav className="flex space-x-4">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Home
                </Link>
                <Link 
                  href="/category/technical" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Technical
                </Link>
                <Link 
                  href="/category/business" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Business
                </Link>
              </nav>
            </div>
          </div>
        </header>
        
        {children}
        
        <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AI News Daily. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
