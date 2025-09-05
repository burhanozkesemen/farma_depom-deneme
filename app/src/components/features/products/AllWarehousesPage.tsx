'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Home } from 'lucide-react';
import Image from 'next/image';

interface CsvProduct {
  id: string;
  name: string;
  price: number | null;
  imageUrl: string;
}

interface WarehouseDef {
  slug: string;
  name: string;
}

// Display order and names similar to screenshot
const WAREHOUSES: WarehouseDef[] = [
  { slug: 'land', name: 'Land' },
  { slug: 'hamzapharma', name: 'hamzapharma' },
  { slug: 'merkez', name: 'Merkez Depo' },
  { slug: 'anadolu', name: 'Anadolu Depo' },
  { slug: 'ege', name: 'Ege Depo' },
  { slug: 'marmara', name: 'Marmara Depo' },
];

const AllWarehousesPage: React.FC = () => {
  const router = useRouter();

  const [items, setItems] = useState<CsvProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/csv-products?limit=400', { cache: 'no-store' });
        if (!res.ok) throw new Error('CSV ürünleri alınamadı');
        const data = await res.json();
        if (!ignore) {
          const safe = Array.isArray(data.items)
            ? data.items.map((p: any) => ({
                id: String(p.id ?? p.barcode ?? Math.random()),
                name: p.name || 'Ürün',
                price: typeof p.price === 'number' ? p.price : 0,
                imageUrl: p.imageUrl || '/api/placeholder/280/280',
              }))
            : [];
          setItems(safe);
          setError(null);
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message || 'Hata oluştu');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Deterministically assign products to warehouses for demo purposes
  const hashIndex = (id: string, mod: number) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 131 + id.charCodeAt(i)) >>> 0;
    return h % mod;
  };

  const grouped = useMemo(() => {
    const map: Record<string, CsvProduct[]> = {};
    for (const w of WAREHOUSES) map[w.slug] = [];
    for (const it of items) {
      const idx = hashIndex(it.id, WAREHOUSES.length);
      const w = WAREHOUSES[idx];
      map[w.slug].push(it);
    }
    return map;
  }, [items]);

  const formatTL = (v: number) => `${v.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Optional background visual */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tüm Depolar</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-10">
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">Yükleniyor…</div>
        )}
        {error && !loading && (
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {WAREHOUSES.map((w) => {
              const list = grouped[w.slug] || [];
              const top4 = list.slice(0, 4);
              return (
                <div key={w.slug} className="bg-white rounded-2xl shadow-sm border">
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      {/* Left: warehouse info */}
                      <div className="md:w-[260px] flex-shrink-0">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                          <Home className="w-4 h-4" />
                          {w.name}
                        </div>
                        <div className="mt-2 text-sm text-blue-600">2500 TL ve üzeri kargo bedava!</div>
                        <button
                          onClick={() => router.push(`/affordable-prices?warehouse=${w.slug}`)}
                          className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 text-sm"
                        >
                          Tüm Ürünleri Gör ({list.length})
                        </button>
                      </div>

                      {/* Right: top 4 products */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                        {top4.map((p) => (
                          <div key={p.id} className="group relative border rounded-xl p-3 hover:shadow-md transition-all duration-200 overflow-hidden">
                            <div className="w-full h-28 bg-gray-50 rounded-lg border flex items-center justify-center overflow-hidden">
                              <Image src={p.imageUrl} alt={p.name} width={180} height={180} className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-105" unoptimized />
                            </div>
                            <div className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">{p.name}</div>
                            <div className="mt-1 text-gray-900 font-semibold">{formatTL(p.price ?? 0)}</div>
                            {/* Hover actions */}
                            <div className="mt-2 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                              <button
                                onClick={() => router.push(`/product/${encodeURIComponent(p.id)}`)}
                                className="pointer-events-auto w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg"
                              >
                                Ürüne git
                              </button>
                            </div>
                          </div>
                        ))}

                        {top4.length === 0 && (
                          <div className="col-span-full text-sm text-gray-500">Bu depoda listelenecek ürün bulunamadı.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWarehousesPage;
