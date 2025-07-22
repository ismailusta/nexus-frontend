// src/components/PostFilters.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/interfaces'
import { useEffect, useState } from 'react'

export const PostFilters = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newPath = '/posts?';
    if (searchQuery.trim()) {
      newPath += `q=${encodeURIComponent(searchQuery.trim())}&`;
    }
    if (selectedCategory) {
      newPath += `category=${selectedCategory}&`;
    }
    router.push(newPath.slice(0, -1)); // Sondaki '&' veya '?' karakterini kaldır
  };

  return (
   <form onSubmit={handleFilter} className="flex flex-col md:flex-row items-center gap-4 mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Yazı başlığında ara..."
        className="w-full md:w-1/2 px-4 py-2 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Filtrele
      </button>
    </form>
  )
}