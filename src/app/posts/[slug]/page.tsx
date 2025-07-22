

import { PaginatedDocs, Post, PopulatedPost } from '@/interfaces';
import { fetchPayload } from '@/services/payload';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { FormattedDate } from '@/components/FormattedDate';

export async function generateStaticParams() {
  try {
    const data = await fetchPayload<PaginatedDocs<Post>>('/api/posts?limit=100');
    return data.docs.map(({ slug }) => ({ slug }));
  } catch (error) {
    return [];
  }
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug } = params;

  const data = await fetchPayload<PaginatedDocs<Post>>(
    `/api/posts?where[slug][equals]=${slug}&depth=2`
  );
  
  const post = data.docs[0] as PopulatedPost;

  if (!post) {
    return notFound();
  }

  const staticImages = ['/images/post1.jpg', '/images/post2.jpg', '/images/post3.jpg', '/images/post4.jpeg'];

  return (
    <article className="py-8">
      <div className="mb-8 text-center">
        <p className="text-blue-500 font-semibold">{post.category.name}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{post.title}</h1>
        <div className="flex justify-center items-center gap-4 mt-4 text-gray-500 dark:text-gray-400">
          <span>{post.author.name}</span>
          <span>·</span>
          <span><FormattedDate dateString={post.createdAt} /></span>
        </div>
      </div>
      <div className="mb-8">
        <img 
          src={staticImages[Math.floor(Math.random() * staticImages.length)]} 
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <RichText content={post.content} />
      </div>
    </article>
  );
};