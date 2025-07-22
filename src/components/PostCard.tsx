
import Link from 'next/link'
import { PopulatedPost } from '@/interfaces'
import { FormattedDate } from './FormattedDate'

export const PostCard = ({ post }: { post: PopulatedPost }) => {
  const staticImages = ['/images/post1.jpg', '/images/post2.jpg', '/images/post3.jpg', '/images/post4.jpeg'];

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <img
          src={staticImages[Math.floor(Math.random() * staticImages.length)]}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="mt-4">
        <span className="text-sm font-semibold text-blue-500 dark:text-blue-400">
          {post.category?.name}
        </span>
        <h3 className="text-xl font-bold mt-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <FormattedDate dateString={post.createdAt} />
        </p>
      </div>
    </Link>
  )
}