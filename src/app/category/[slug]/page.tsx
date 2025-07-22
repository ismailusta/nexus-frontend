
import { PaginatedDocs, Post, PopulatedPost, Category } from '@/interfaces';
import { fetchPayload } from '@/services/payload';
import { PostFilters } from '@/components/PostFilters';
import { PostCard } from '@/components/PostCard';
import { notFound } from 'next/navigation';
import { Pagination } from '@/components/Pagination';

export async function generateStaticParams(): Promise<{ slug: string }[]>{
  try {
    const data = await fetchPayload<PaginatedDocs<Category>>('/api/categories?limit=100');
    return data.docs.map(({ slug }) => ({ slug }));
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({ params, searchParams }: {
    params: { slug: string };
    searchParams: { q?: string; page?: string };
    }) {
  const { slug } = params;
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.q || ''; 


  const categoryData = await fetchPayload<PaginatedDocs<Category>>(`/api/categories?where[slug][equals]=${slug}`);
  const category = categoryData.docs[0];

  if (!category) {
    return notFound();
  }


  let queryFilter = `&where[category][equals]=${category.id}`;
  if (searchQuery) {
    queryFilter += `&where[title][like]=${searchQuery}`;
  }


  const [postsData, allCategoriesData] = await Promise.all([
    fetchPayload<PaginatedDocs<Post>>(`/api/posts?sort=-createdAt&limit=9&page=${page}&depth=2${queryFilter}`),
    fetchPayload<PaginatedDocs<Category>>('/api/categories?limit=100'),
  ]);

  const posts = postsData.docs as PopulatedPost[];
  const totalPages = postsData.totalPages;
  const allCategories = allCategoriesData.docs;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Kategori: {category.name}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Bu kategorideki yazıları keşfedin.</p>
  
      <PostFilters categories={allCategories} />

      {posts && posts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
            <Pagination
                basePath={`/category/${slug}`}
                currentPage={page}
                totalPages={totalPages}
            />
        </>
      ) : (
        <p>Bu kategoride aramanızla eşleşen yazı bulunamadı.</p>
      )}
    </div>
  );
}