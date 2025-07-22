// src/components/Header.tsx
import { fetchPayload } from '@/services/payload'
import { SiteSettings, Category, PaginatedDocs } from '@/interfaces'
import { Navbar } from './Navbar'

export const Header = async () => {
  const [siteSettings, categoriesData] = await Promise.all([
    fetchPayload<SiteSettings>('/api/globals/site-settings').catch(() => null),
    fetchPayload<PaginatedDocs<Category>>('/api/categories?limit=5').catch(() => ({ docs: [] })),
  ]);

  const categories = categoriesData?.docs || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <Navbar siteSettings={siteSettings} categories={categories} />
    </header>
  );
}