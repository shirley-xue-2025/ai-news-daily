'use client';

import { useState, useEffect } from 'react';

interface ApiKeyConfigProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      // Save to localStorage - in a production app, consider more secure storage
      localStorage.setItem('openai_api_key', apiKey);
      onSave(apiKey);
      setIsSaved(true);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsSaved(false);
    onSave('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        OpenAI API Configuration
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Enter your OpenAI API key to enable AI-powered summaries and analysis.
      </p>
      
      <div className="relative mb-3">
        <input
          type={isVisible ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-2 top-2 text-gray-500 dark:text-gray-400"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handleSave}
          disabled={!apiKey.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save API Key
        </button>
        
        {isSaved && (
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear Key
          </button>
        )}
      </div>
      
      {isSaved && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          API key saved! AI features are now enabled.
        </p>
      )}
    </div>
  );
};

export default ApiKeyConfig; 