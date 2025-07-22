
'use client'

import Link from 'next/link'

type Props = {
  basePath: string 
  currentPage: number
  totalPages: number
}

export const Pagination = ({ basePath, currentPage, totalPages }: Props) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded-md transition-colors ${
          !hasPrevPage 
          ? 'bg-gray-800 text-gray-500 pointer-events-none' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-disabled={!hasPrevPage}
      >
        {'< Önceki'}
      </Link>

      <span className="text-gray-400">
        Sayfa {currentPage} / {totalPages}
      </span>

      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={`px-4 py-2 rounded-md transition-colors ${
          !hasNextPage 
          ? 'bg-gray-800 text-gray-500 pointer-events-none' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-disabled={!hasNextPage}
      >
        {'Sonraki >'}
      </Link>
    </div>
  )
}