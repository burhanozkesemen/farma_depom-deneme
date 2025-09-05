'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Grid3X3, List, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface CsvProduct {
  id: string;
  name: string;
  manufacturer?: string | null;
  barcode?: string | null;
  prescriptionType?: string | null;
  ingredient?: string | null;
  price: number | null;
  imageUrl: string;
}

const AffordablePricesPage: React.FC = () => {
  const router = useRouter();

  // UI state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortTab, setSortTab] = useState<'ordercount' | 'bestprice'>('ordercount');
  const [searchQuery, setSearchQuery] = useState('');

  // Data state
  const [items, setItems] = useState<CsvProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/csv-products?limit=120', { cache: 'no-store' });
        if (!res.ok) throw new Error('CSV ürünleri alınamadı');
        const data = await res.json();
        if (!ignore) {
          const safe = Array.isArray(data.items)
            ? (data.items as CsvProduct[]).map((p) => ({
                ...p,
                price: typeof p.price === 'number' ? p.price : 0,
                imageUrl: p.imageUrl || '/api/placeholder/280/280',
                name: p.name || 'Ürün',
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

  const formatTL = (v: number) => `${v.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

  // Stable pseudo discount percentage 5-65 based on id hash
  const discountOf = (id: string) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    return 5 + (h % 61); // 5..65
  };

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let arr = items.filter((p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.ingredient?.toLowerCase().includes(q) ?? false) ||
      (p.manufacturer?.toLowerCase().includes(q) ?? false)
    );
    if (sortTab === 'bestprice') arr = arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    // 'ordercount' fallback: keep original order
    return arr;
  }, [items, searchQuery, sortTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-blue-600 transition-colors">
              Ana Sayfa
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">Uygun Fiyat</span>
          </div>
        </div>
      </div>

      {/* Hero banner like FarmazonRx */}
      <section className="bg-gradient-to-r from-[#1bb56b] via-[#22a0d7] to-[#1e69ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">💥</div>
              <h1 className="text-2xl md:text-3xl font-extrabold">Uygun Fiyat</h1>
            </div>
            <p className="max-w-3xl text-sm md:text-base text-white/90">
              Karlılık oranları, ulusal depolardaki ilk MF koşulu dikkate alınarak hesaplanmıştır.
            </p>
          </div>

          {/* Tabs container */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-3 md:p-4">
            <div className="flex items-center justify-between">
              {/* Sort tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortTab('ordercount')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    sortTab === 'ordercount' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Çok Satanlar
                </button>
                <button
                  onClick={() => setSortTab('bestprice')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    sortTab === 'bestprice' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  En Uygunlar
                </button>
              </div>

              {/* Search */}
              <div className="hidden md:block w-80">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün adı veya barkod ara"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* View switch */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <div className="-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
            {loading && <div className="py-12 text-center text-gray-500">Yükleniyor…</div>}
            {error && !loading && <div className="py-12 text-center text-red-600">{error}</div>}

            {!loading && !error && (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5' : 'space-y-4'}>
                {filtered.map((p) => (
                  <div key={p.id} className={`group relative border rounded-xl bg-white ${viewMode === 'list' ? 'flex p-3' : 'p-3'} hover:shadow-md transition-all duration-200`}>
                    {/* Discount badge */}
                    <div className="absolute" />
                    <div className={`${viewMode === 'list' ? 'w-32 h-32 mr-4 flex-shrink-0' : 'w-full h-40'} bg-gray-50 rounded-lg border flex items-center justify-center overflow-hidden`}>
                      <Image src={p.imageUrl} alt={p.name} width={220} height={220} className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-105" unoptimized />
                    </div>

                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      {/* badge */}
                      <div className="mt-3">
                        <span className="inline-block text-xs font-semibold text-white bg-green-600 rounded-full px-2 py-1">
                          %{discountOf(p.id)} daha uygun
                        </span>
                      </div>

                      {/* title */}
                      <h3 className={`text-gray-900 font-semibold ${viewMode === 'list' ? 'text-base' : 'text-sm'} mt-2 line-clamp-2`}>{p.name}</h3>

                      {/* price */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">{formatTL(p.price ?? 0)}</div>
                      </div>

                      {/* sub labels */}
                      <div className="mt-2 text-xs text-gray-500">
                        {p.manufacturer || 'Depo'}
                      </div>

                      {/* chips */}
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-600">
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gray-100 border">
                          2500 TL üzeri kargo bedava!
                        </span>
                      </div>

                      {/* actions: visible on hover */}
                      <div className="mt-3 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                        <button className="pointer-events-auto w-full bg-[#1E69FF] hover:bg-[#1557d6] text-white text-sm font-semibold py-2 rounded-lg inline-flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" /> Sepete Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffordablePricesPage;
