'use client';

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
    { id: NewsCategory.OVERVIEW, label: 'All AI News', mobileLabel: 'All' },
    { id: NewsCategory.TECHNICAL, label: 'Technical', mobileLabel: 'Technical' },
    { id: NewsCategory.BUSINESS, label: 'Business', mobileLabel: 'Business' },
    { id: NewsCategory.ETHICS, label: 'Ethics', mobileLabel: 'Ethics' },
    { id: NewsCategory.PRODUCTS, label: 'Products', mobileLabel: 'Products' },
  ];

  return (
    <div className="w-full mb-4">
      <div className="flex flex-wrap justify-center gap-1 md:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="hidden md:inline">{category.label}</span>
            <span className="md:hidden">{category.mobileLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 