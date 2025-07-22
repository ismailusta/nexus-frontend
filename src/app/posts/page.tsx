
import { PaginatedDocs, Post, PopulatedPost, Category } from '@/interfaces';
import { fetchPayload } from '@/services/payload';
import { PostFilters } from '@/components/PostFilters';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';

type Props = {
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
  };
};

export default async function PostsPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.q || '';
  const categoryId = searchParams.category || '';

  let queryFilter = '';
  if (searchQuery) {
    queryFilter += `&where[title][like]=${searchQuery}`;
  }
  if (categoryId) {
    queryFilter += `&where[category][equals]=${categoryId}`;
  }

  const [postsData, categoriesData] = await Promise.all([
    fetchPayload<PaginatedDocs<Post>>(`/api/posts?sort=-createdAt&limit=9&page=${page}&depth=2${queryFilter}`),
    fetchPayload<PaginatedDocs<Category>>('/api/categories?limit=100'),
  ]);

  const posts = postsData.docs as PopulatedPost[];
  const totalPages = postsData.totalPages;
  const categories = categoriesData.docs;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Tüm Yazılar</h1>
      <PostFilters categories={categories} />

      {posts && posts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
            <Pagination
                basePath="/posts"
                currentPage={page}
                totalPages={totalPages}
            />
        </>
      ) : (
        <p>Aramanızla eşleşen yazı bulunamadı.</p>
      )}
    </div>
  );
}