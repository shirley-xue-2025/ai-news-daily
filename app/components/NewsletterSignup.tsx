'use client';

import React, { useState } from 'react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    try {
      // In a real app, you would send this to your backend
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful subscription
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Subscribe to AI News Daily
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Get the latest AI news delivered to your inbox every morning.
      </p>
      
      {subscribed ? (
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md text-green-800 dark:text-green-200">
          <p className="font-medium">Thanks for subscribing!</p>
          <p className="text-sm mt-1">You'll receive your first newsletter soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            We'll never share your email. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup; 