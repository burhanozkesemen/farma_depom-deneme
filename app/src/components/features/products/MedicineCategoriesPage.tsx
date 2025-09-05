'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';

interface ApiCategory {
  id: string;
  name: string;
  children?: ApiCategory[];
}

interface UiCategory {
  id: string;
  name: string;
  productCount?: number;
  subcategories?: UiCategory[];
  groupLabel?: string;
}

interface ApiProduct {
  id: string;
  name: string;
  dosage?: string | null;
  form?: string | null;
  manufacturer?: string | null;
  barcode?: string | null;
  stock: number;
  price: number | null;
  imageUrl?: string | null;
}

// CSV product shape
interface CsvProduct {
  id: string;
  name: string;
  manufacturer?: string | null;
  barcode?: string | null;
  prescriptionType?: string | null;
  ingredient?: string | null;
  price: number | null;
  imageUrl?: string | null;
}

const API_BASE = '';

const MAIN_CATEGORIES = [
  'Antineoplastik & İmmünomodülatör',
  'Antiparaziter',
  'Cinsel Sağlık',
  'Dermatoloji',
  'Diğer İlaçlar',
  'Enfeksiyon',
  'Göz & Kulak Sağlığı',
  'Hematolojik Ajan',
  'Hormon & Metabolizma',
  'Kalp & Damar',
  'Kas & Eklem',
  'Sindirim',
  'Sinir Sistemi',
  'Solunum',
] as const;

const countDescendants = (node: UiCategory): number => {
  if (!node.subcategories || node.subcategories.length === 0) return 0;
  let count = 0;
  const stack: UiCategory[] = [...node.subcategories];
  while (stack.length) {
    const cur = stack.pop()!;
    count++;
    if (cur.subcategories && cur.subcategories.length) {
      stack.push(...cur.subcategories);
    }
  }
  return count;
};

const MedicineCategoriesPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<UiCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [showHandSoldOnly, setShowHandSoldOnly] = useState(false); // placeholder, no API flag yet
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showPriceIncreaseOnly, setShowPriceIncreaseOnly] = useState(false);

  // Visible page products (after filter/sort/slice)
  const [products, setProducts] = useState<ApiProduct[]>([]);
  // Cache of all CSV items mapped to ApiProduct
  const [allItems, setAllItems] = useState<ApiProduct[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const PAGE_SIZE = 50;
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [sortTab, setSortTab] = useState<'bestsellers' | 'unitprice'>('bestsellers');

  // Static categories (MAIN_CATEGORIES) — mimic screenshot, counts will be filled after CSV load
  useEffect(() => {
    setLoadingCats(true);
    const toId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const ui = MAIN_CATEGORIES.map((name) => ({ id: toId(name), name })) as UiCategory[];
    const allEntry: UiCategory = { id: 'all', name: 'İlaç Kategorileri' };
    setCategories([allEntry, ...ui]);
    setLoadingCats(false);
  }, []);

  // Fetch CSV products once and map to ApiProduct
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch('/api/csv-products?limit=1200', { cache: 'no-store' });
        const data = await res.json();
        const items: CsvProduct[] = Array.isArray(data.items) ? data.items : [];
        if (cancelled) return;
        const mapped: ApiProduct[] = items.map((p) => ({
          id: p.id,
          name: p.name || 'Ürün',
          dosage: null,
          form: null,
          manufacturer: p.manufacturer || 'Bilinmeyen',
          barcode: p.barcode || null,
          stock: 0,
          price: typeof p.price === 'number' ? p.price : 0,
          imageUrl: p.imageUrl || '/api/placeholder/280/280',
        }));
        setAllItems(mapped);
        setTotal(mapped.length);
      } catch (e) {
        console.error('CSV yüklenemedi', e);
        setAllItems([]);
        setTotal(0);
      } finally {
        setLoadingProducts(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // After CSV load, assign each product deterministically to a main category and compute counts
  const categoryIndexOf = useCallback((id: string, len: number) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    return len ? h % len : 0;
  }, []);

  const hashOf = useCallback((id: string) => {
    let h = 0;
    for (let i = 0; i <id.length; i++) h = (h * 131 + id.charCodeAt(i)) >>> 0;
    return h >>> 0;
  }, []);

  const isHandSold = useCallback((id: string) => hashOf(id) % 3 === 0, [hashOf]);
  const isFree = useCallback((id: string) => hashOf(id) % 10 === 0, [hashOf]);
  const isPriceIncreaseSoon = useCallback((id: string) => hashOf(id) % 4 === 0, [hashOf]);

  useEffect(() => {
    if (!allItems.length || categories.length === 0) return;
    const mains = categories.filter((c) => c.id !== 'all');
    const counts = new Array(mains.length).fill(0);
    for (const p of allItems) counts[categoryIndexOf(p.id, mains.length)]++;
    const updated = [categories[0], ...mains.map((c, i) => ({ ...c, productCount: counts[i] }))];
    setCategories(updated);
  }, [allItems, categories.length]);

  // Initialize special filters from query params (hand, free, zam)
  useEffect(() => {
    const hand = searchParams?.get('hand');
    const free = searchParams?.get('free');
    const zam = searchParams?.get('zam');
    setShowHandSoldOnly(hand === '1' || hand === 'true');
    setShowFreeOnly(free === '1' || free === 'true');
    setShowPriceIncreaseOnly(zam === '1' || zam === 'true');
  }, [searchParams]);

  // Build filtered + sorted list, then slice by offset for pagination
  const filteredAll = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    const mains = categories.filter((c) => c.id !== 'all');
    const idxOf = (id: string) => categoryIndexOf(id, mains.length);
    const selectedIdx = selectedCategory === 'all' ? null : mains.findIndex((c) => c.id === selectedCategory);
    const anySpecial = showHandSoldOnly || showFreeOnly || showPriceIncreaseOnly;
    return allItems.filter((p) => {
      const matchesSearch =
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        (p.manufacturer || '').toLowerCase().includes(needle);
      const matchesCat = selectedIdx === null || idxOf(p.id) === selectedIdx;
      const matchesManufacturer =
        selectedManufacturers.length === 0 || selectedManufacturers.includes(p.manufacturer || 'Bilinmeyen');
      const matchesSpecial =
        !anySpecial ||
        (showHandSoldOnly && isHandSold(p.id)) ||
        (showFreeOnly && isFree(p.id)) ||
        (showPriceIncreaseOnly && isPriceIncreaseSoon(p.id));
      return matchesSearch && matchesCat && matchesManufacturer && matchesSpecial;
    });
  }, [allItems, searchTerm, categories, selectedCategory, selectedManufacturers, categoryIndexOf, showHandSoldOnly, showFreeOnly, showPriceIncreaseOnly, isHandSold, isFree, isPriceIncreaseSoon]);

  const sortedAll = useMemo(() => {
    const arr = [...filteredAll];
    if (sortTab === 'unitprice') {
      return arr.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
    }
    return arr; // bestsellers: keep source order
  }, [filteredAll, sortTab]);

  // Reset pagination when filters/category/sort/search change
  useEffect(() => {
    setOffset(0);
  }, [selectedCategory, searchTerm, selectedManufacturers, sortTab, showHandSoldOnly, showFreeOnly, showPriceIncreaseOnly]);

  // Compute current page slice
  useEffect(() => {
    const page = sortedAll.slice(0, PAGE_SIZE + offset);
    setProducts(page);
  }, [sortedAll, offset]);

  const manufacturerOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of sortedAll) {
      const key = p.manufacturer || 'Bilinmeyen';
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ id: name, name, count }));
  }, [sortedAll]);

  // deterministic ilan count for display
  const ilanSayisi = (id: string) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 131 + id.charCodeAt(i)) >>> 0;
    return 5 + (h % 20); // 5..24
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleManufacturer = (manufacturerId: string) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturerId) ? prev.filter((id) => id !== manufacturerId) : [...prev, manufacturerId]
    );
  };

  const loadMore = async () => {
    try {
      setLoadingProducts(true);
      setOffset(offset + PAGE_SIZE);
    } catch (e) {
      console.error('Failed to load more products', e);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Helpers: find selected category and its metadata
  const findById = useCallback((nodes: UiCategory[], id: string): UiCategory | undefined => {
    for (const n of nodes) {
      if (n.id === id) return n;
      const found = n.subcategories ? findById(n.subcategories, id) : undefined;
      if (found) return found;
    }
    return undefined;
  }, []);

  const selectedMeta = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') return { name: 'İlaç Kategorileri', group: undefined as string | undefined };
    const found = findById(categories, selectedCategory);
    return { name: found?.name ?? 'Kategori', group: found?.groupLabel };
  }, [categories, selectedCategory, findById]);

  function renderCategoryItem(
    category: UiCategory,
    depth: number,
    ctx?: {
      selectedCategory?: string;
      setSelectedCategory?: (id: string) => void;
      expandedCategories?: string[];
      toggleCategory?: (id: string) => void;
    }
  ) {
    const localSelectedCategory = ctx?.selectedCategory ?? selectedCategory;
    const localSetSelectedCategory = ctx?.setSelectedCategory ?? setSelectedCategory;
    const localExpandedCategories = ctx?.expandedCategories ?? expandedCategories;
    const localToggleCategory = ctx?.toggleCategory ?? toggleCategory;

    return (
      <div key={category.id}>
        <div
          className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
            localSelectedCategory === category.id
              ? 'bg-blue-50 text-blue-700'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
          onClick={() => {
            // If any special filter is active, clear them and navigate to clean URL to mimic refresh
            if (showHandSoldOnly || showFreeOnly || showPriceIncreaseOnly) {
              setShowHandSoldOnly(false);
              setShowFreeOnly(false);
              setShowPriceIncreaseOnly(false);
              router.push('/medicine-categories');
            }
            localSetSelectedCategory(category.id);
            if (category.subcategories && category.subcategories.length > 0) {
              localToggleCategory(category.id);
            }
          }}
        >
          <div className="flex items-center">
            {category.subcategories && category.subcategories.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  localToggleCategory(category.id);
                }}
                className="mr-2"
              >
                {localExpandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            <span className="text-sm">{category.name}</span>
          </div>
          {typeof category.productCount === 'number' && (
            <span className="text-xs text-gray-500">• {category.productCount}</span>
          )}
        </div>

        {/* Subcategories */}
        {category.subcategories && localExpandedCategories.includes(category.id) && (
          <div className="ml-6 mt-1 space-y-1">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.id}>
                {renderCategoryItem(subcategory, depth + 1, ctx)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/home')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">İlaç Kategorileri</h1>
                <p className="text-gray-600 text-sm">
                  {loadingProducts
                    ? 'Ürünler yükleniyor…'
                    : total !== null
                      ? `${total} ürün bulundu`
                      : `${filteredAll.length} ürün bulundu`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Elden Satılan Button */}
              <button
                onClick={() => router.push('/medicine-categories?hand=1')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showHandSoldOnly ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Elden Satılan İlaçlar
              </button>

              {/* Header Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ürün adı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Categories */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Ana Sayfa &gt; İlaç Kategorileri</h3>
              </div>

              <div className="p-4">
                <div className="space-y-1">
                  {loadingCats && <div className="text-sm text-gray-500">Kategoriler yükleniyor…</div>}
                  {!loadingCats && categories.map((category) => (
                    <div key={category.id}>
                      {renderCategoryItem(category, 0)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Filtreler</h3>
              </div>

              <div className="p-4 space-y-4">
                {/* Özel Filtreler */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Özel Filtreler</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showPriceIncreaseOnly}
                        onChange={(e) => setShowPriceIncreaseOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Zamlanacak İlaçlar</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showHandSoldOnly}
                        onChange={(e) => setShowHandSoldOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Elden Satılan İlaçlar</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showFreeOnly}
                        onChange={(e) => setShowFreeOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Ücretsiz</span>
                    </label>
                  </div>
                </div>

                {/* Üretici Firmalar */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Üretici Firmalar</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {manufacturerOptions.map((m) => (
                      <label key={m.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedManufacturers.includes(m.id)}
                          onChange={() => toggleManufacturer(m.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                        />
                        <span className="text-sm text-gray-700 flex-1">
                          {m.name} ({m.count})
                        </span>
                      </label>
                    ))}
                    {manufacturerOptions.length === 0 && (
                      <div className="text-xs text-gray-500">Üretici bulunamadı</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {/* Selected Filters chip row */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-600">Seçili Filtreler</span>
                {showHandSoldOnly && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    Elden Satılan İlaçlar
                  </span>
                )}
                {showPriceIncreaseOnly && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    Zamlanacak İlaçlar
                  </span>
                )}
                {showFreeOnly && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                    Ücretsiz
                  </span>
                )}
              </div>
            </div>

            {/* Title + Tabs + Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMeta.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedMeta.group ? `${selectedMeta.group} • ` : ''}
                    {loadingProducts ? 'Ürünler yükleniyor…' : `${sortedAll.length} Ürün`}
                  </p>
                </div>
                <div className="relative w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ürünlerde ara"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setSortTab('bestsellers')}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${sortTab === 'bestsellers' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Çok Satanlar
                </button>
                <button
                  onClick={() => setSortTab('unitprice')}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${sortTab === 'unitprice' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Birim Fiyat En Düşük
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-full h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">💊</span>
                          </div>
                          <div className="text-sm font-medium text-gray-700">{product.name?.split(' ')[0] || ''}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3">{product.dosage || product.form || ''}</p>
                    <div className="mb-1">
                      <span className="text-lg font-bold text-gray-900">{product.price !== null ? `${product.price.toFixed(2)} TL` : 'Fiyat Yok'}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mb-3">'den başlayan {ilanSayisi(product.id)} ilan</div>
                    <div className="text-xs text-gray-600 mb-3">
                      <div>Stok: {(product.stock || 0)}</div>
                      <div>{product.manufacturer || 'Üretici Yok'}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{product.barcode || 'Barkod Yok'}</span>
                      <div className="pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Sepete Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!loadingProducts && products.length === 0 && (
                <div className="col-span-full text-sm text-gray-500">Bu kategori için ürün bulunamadı.</div>
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingProducts || (total !== null && products.length >= sortedAll.length)}
                className={`bg-white border px-6 py-3 rounded-lg font-medium transition-colors ${
                  loadingProducts || (total !== null && products.length >= sortedAll.length)
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {loadingProducts ? 'Yükleniyor…' : (total !== null && products.length >= sortedAll.length) ? 'Hepsi Gösterildi' : 'Daha Fazla Ürün Göster'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCategoriesPage;
