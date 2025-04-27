'use client';

import { useState } from 'react';
import { NewsCategory } from '../services/newsService';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategorySelectorProps {
  selectedCategory: NewsCategory;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory }) => {
  const pathname = usePathname();
  
  const categories = [
    { id: NewsCategory.OVERVIEW, label: 'Overview' },
    { id: NewsCategory.TECHNICAL, label: 'Technical' },
    { id: NewsCategory.BUSINESS, label: 'Business' },
    { id: NewsCategory.ETHICS, label: 'Ethics' },
    { id: NewsCategory.PRODUCTS, label: 'Products' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map((category) => {
        const isActive = category.id === selectedCategory;
        return (
          <Link 
            key={category.id}
            href={`/category/${category.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
};

export default CategorySelector; 