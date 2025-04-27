import React from 'react';
import { NewsCategory } from '../services/newsService';

interface CategoryFilterProps {
  selectedCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const categories = [
    { id: NewsCategory.ALL, label: 'All AI News' },
    { id: NewsCategory.GENERAL_AI, label: 'General AI' },
    { id: NewsCategory.MACHINE_LEARNING, label: 'Machine Learning' },
    { id: NewsCategory.ROBOTICS, label: 'Robotics' },
    { id: NewsCategory.ETHICS, label: 'Ethics & Policy' },
    { id: NewsCategory.BUSINESS, label: 'Business & Startups' },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 