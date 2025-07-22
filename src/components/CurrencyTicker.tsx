// src/components/CurrencyTicker.tsx

async function getRates() {
  const apiKey = process.env.NEXT_PUBLIC_COLLECTAPI_KEY;
  if (!apiKey) {
    console.error("CollectAPI Key bulunamadı.");
    return null;
  }

  try {
    // Üç farklı API isteğini aynı anda başlatıyoruz
    const [frankfurterResDolar, frankfurterResEuro, goldRes, bistRes] = await Promise.all([
      fetch('https://api.frankfurter.app/latest?from=USD&to=TRY', { next: { revalidate: 3600 } }),
      fetch('https://api.frankfurter.app/latest?from=EUR&to=TRY', { next: { revalidate: 3600 } }),
      fetch('https://api.collectapi.com/economy/goldPrice', {
        headers: { 'authorization': `apikey ${apiKey}` },
        next: { revalidate: 3600 },
      }),
      fetch('https://api.collectapi.com/economy/borsaIstanbul', {
        headers: { 'authorization': `apikey ${apiKey}`,
                    'content-type': 'application/json' },
        next: { revalidate: 300 }, // Borsa verisini 5 dakikada bir tazele
      })
    ]);

    if (!frankfurterResDolar.ok || !goldRes.ok || !bistRes.ok|| !frankfurterResEuro.ok) {
      throw new Error('Finansal veriler alınamadı');
    }

    const frankfurterDataDolar = await frankfurterResDolar.json();
    const frankfurterDataEuro = await frankfurterResEuro.json();
    const goldData = await goldRes.json();
    const bistData = await bistRes.json();

    // BIST 100 endeksini buluyoruz
    const bist100 = bistData.result[0]; 
    console.log(bist100);
    return {
      usd: frankfurterDataDolar.rates.TRY,
      eur: frankfurterDataEuro.rates.TRY,
      gold: goldData.result[0].selling, // Gram Altın (Satış)
      bist: bist100?.currentstr || 'N/A',
      bistChange: bist100?.changeratestr || 'N/A',
    };
  } catch (error) {
    console.error("Finansal veri çekme hatası:", error);
    return null;
  }
}
// Yüzde değişimine göre renk belirleyen yardımcı fonksiyon
const getChangeColor = (change: string) => {
  if (change.startsWith('-')) return 'text-red-500';
  if (change.startsWith('+') || parseFloat(change) > 0) return 'text-green-500';
  return 'text-gray-400';
}


export const CurrencyTicker = async () => {
  const rates = await getRates();

  if (!rates) {
    return null;
  }

  const bistChangeColor = getChangeColor(rates.bistChange);

  return (
    <div className="py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">DOLAR</span>
          <span className="text-green-500">{rates.usd.toFixed(2)}₺</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">EURO</span>
          <span className="text-green-500">{rates.eur.toFixed(2)}₺</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">ALTIN (GR)</span>
          <span className="text-yellow-500">{rates.gold.toFixed(2)}₺</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">BIST 100</span>
          <span className={bistChangeColor}>{rates.bist} ({rates.bistChange})</span>
        </div>
      </div>
    </div>
  );
}