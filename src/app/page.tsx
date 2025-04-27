'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">AI News Daily</h1>
        <p className="text-xl text-center">Your daily AI news aggregator</p>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Test Page</h2>
          <p>If you can see this, the page is working correctly.</p>
          <p className="mt-4">This is a temporary test page to make sure changes are being applied.</p>
        </div>
      </div>
    </main>
  );
} 