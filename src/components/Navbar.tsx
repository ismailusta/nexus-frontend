
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Category, SiteSettings } from '@/interfaces'
import { ThemeSwitcher } from './ThemeSwitcher'
import { WeatherWidget } from './WeatherWidget'

type Props = {
  siteSettings: SiteSettings | null
  categories: Category[]
}

export const Navbar = ({ siteSettings, categories }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              {siteSettings?.siteTitle || 'Nexus News'}
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Home</Link>
            <Link href="/posts" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Posts</Link>
            {categories?.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                {category.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <WeatherWidget />
            <ThemeSwitcher />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <WeatherWidget />
            <ThemeSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 ml-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Home</Link>
                <Link href="/posts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Posts</Link>
                {categories?.map((category) => (
                    <Link key={category.id} href={`/category/${category.slug}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    {category.name}
                </Link>
            ))}
            </div>
        </div>
    )}
    </nav>
  )
}