import { FC } from 'react';
import { Tab } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NewsCategory } from '../services/newsService';

interface NewsTabsProps {
  activeTab: NewsCategory;
}

const NewsTabs: FC<NewsTabsProps> = ({ activeTab }) => {
  const router = useRouter();
  
  // Category tabs with display names
  const categories = [
    { key: NewsCategory.OVERVIEW, name: 'Overview' },
    { key: NewsCategory.TECHNICAL, name: 'Technical' },
    { key: NewsCategory.BUSINESS, name: 'Business' },
    { key: NewsCategory.ETHICS, name: 'Ethics' },
    { key: NewsCategory.PRODUCTS, name: 'Products' },
  ];
  
  // Find the index of the active tab
  const activeIndex = categories.findIndex(cat => cat.key === activeTab) || 0;

  const handleTabChange = (index: number) => {
    const category = categories[index].key;
    if (category === NewsCategory.OVERVIEW) {
      router.push('/');
    } else {
      router.push(`/?category=${category}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-6">
      <Tab.Group selectedIndex={activeIndex} onChange={handleTabChange}>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
          {categories.map((category) => (
            <Tab
              key={category.key}
              className={({ selected }: { selected: boolean }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                ${
                  selected
                    ? 'bg-white text-indigo-700 shadow'
                    : 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700'
                }`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default NewsTabs; 