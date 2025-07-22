// src/components/QuoteOfTheDay.tsx

async function getQuote() {
  try {
    const res = await fetch('https://zenquotes.io/api/random', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch quote');
    const data = await res.json();
    return data[0];
  } catch (error) {
    return { q: "Hayat, bisiklete binmek gibidir...", a: "Albert Einstein" };
  }
}

export const QuoteOfTheDay = async () => {
  const quote = await getQuote();
  return (
    <div className="py-4 text-center border-b border-gray-200 dark:border-gray-800">
      <blockquote className="italic text-gray-600 dark:text-gray-400">
        <p>"{quote.q}"</p>
        <footer className="mt-1 text-sm">- {quote.a}</footer>
      </blockquote>
    </div>
  );
}