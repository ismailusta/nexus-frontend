import Link from 'next/link'
import { PaginatedDocs, Post, PopulatedPost } from '@/interfaces'
import { fetchPayload } from '@/services/payload'
import { FormattedDate } from '@/components/FormattedDate'
import { CurrencyTicker } from '@/components/CurrencyTicker'
import { QuoteOfTheDay } from '@/components/QuoteOfTheDay'

// Tek bir öne çıkan yazıyı göstermek için küçük, yeniden kullanılabilir bir bileşen
const PostHeroCard = ({ post }: { post: PopulatedPost }) => {
  // Yazar avatarı veya varsayılan resim için URL'yi belirliyoruz
  const staticImages = ['/images/post1.jpg', '/images/post2.jpg', '/images/post3.jpg', '/images/post4.jpeg'];

  return (
    <div className="flex flex-col">
      <Link href={`/posts/${post.slug}`} className="block group mb-4">
        <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            src={staticImages[Math.floor(Math.random() * staticImages.length)]}
            alt={post.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </Link>
      <span className="text-sm font-semibold text-blue-500 dark:text-blue-400">
        {post.category?.name}
      </span>
      <h2 className="text-2xl font-bold mt-2 hover:text-blue-500 transition-colors">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
        <span>{post.author?.name || 'Bilinmeyen Yazar'}</span>
        <span>·</span>
        <span><FormattedDate dateString={post.createdAt} /></span>
      </div>
      <Link href={`/posts/${post.slug}`} className="mt-4 text-blue-500 font-semibold hover:underline">
        Read More &rarr;
      </Link>
    </div>
  )
}

export default async function HomePage() {
  // API'den en son 2 yazıyı, ilişkili yazar ve resim bilgileriyle çekiyoruz
  const data = await fetchPayload<PaginatedDocs<Post>>(
    '/api/posts?sort=-createdAt&limit=2&depth=2',
  )

  const posts = data.docs as PopulatedPost[]

  return (
    <div className="flex-grow">
      {/* Header altı bileşenleri */}
      <CurrencyTicker />
      <QuoteOfTheDay />

      <div className="py-12">
        {posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-12">
            {posts.map(post => (
              <PostHeroCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>Gösterilecek yazı bulunamadı.</p>
        )}
      </div>
    </div>
  )
}