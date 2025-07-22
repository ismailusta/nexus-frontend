
import Link from 'next/link'
import { fetchPayload } from '@/services/payload'
import { Category, PaginatedDocs } from '@/interfaces'
import { ThemeSwitcher } from './ThemeSwitcher'
import { WeatherWidget } from './WeatherWidget' 

export const Header = async () => {
  const categoriesData = await fetchPayload<PaginatedDocs<Category>>('/api/categories?limit=5');
  const categories = categoriesData.docs;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold">
              Nexus News
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Home</Link>
              <Link href="/posts" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Posts</Link>
              {categories?.map((category: Category) => (
                <Link key={category.id} href={`/category/${category.slug}`} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <WeatherWidget /> 
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}