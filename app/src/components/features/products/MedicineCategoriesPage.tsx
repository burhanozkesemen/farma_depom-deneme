'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  const [categories, setCategories] = useState<UiCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [showHandSoldOnly, setShowHandSoldOnly] = useState(false); // placeholder, no API flag yet

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const PAGE_SIZE = 50;
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState<number | null>(null);

  // Fetch categories
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingCats(true);
        const res = await fetch(`${API_BASE}/api/categories`);
        const data: ApiCategory[] = await res.json();
        if (cancelled) return;
        // Treat any node whose name contains 'grubu' (case-insensitive) as a group bucket
        const isGroupNode = (name: string) => /grubu/i.test(name);
        // Turkish-safe normalization (no Unicode property escapes)
        const foldTr = (s: string) => s
          .replace(/[çÇ]/g, 'c')
          .replace(/[ğĞ]/g, 'g')
          .replace(/[ıİ]/g, 'i')
          .replace(/[öÖ]/g, 'o')
          .replace(/[şŞ]/g, 's')
          .replace(/[üÜ]/g, 'u');
        const normalizeLabel = (s: string) => foldTr(s)
          .toLowerCase()
          .replace(/&/g, 've')
          .replace(/\s+/g, ' ')
          .trim();
        // Plural-insensitive canonicalization for Turkish (basic -lar/-ler stripping on word ends)
        const canonicalLabel = (s: string) => normalizeLabel(s).replace(/\b(\w+?)(lar|ler)\b/g, '$1');
        const normalize = (node: ApiCategory, currentGroup: string | undefined): UiCategory[] => {
          const nodeIsGroup = isGroupNode(node.name);
          const nextGroup = nodeIsGroup ? node.name.replace(/\s+/g, ' ').trim() : currentGroup;
          const children = node.children ?? [];
          if (nodeIsGroup) {
            // Do not include the group node itself; hoist its children with group label
            return children.flatMap((child) => normalize(child, nextGroup));
          }
          const uiChildren = children.flatMap((child) => normalize(child, nextGroup));
          return [{ id: node.id, name: node.name, groupLabel: nextGroup, subcategories: uiChildren }];
        };

        // Build UI categories, removing group nodes from top-level
        const uiRoots: UiCategory[] = data.flatMap((root) => normalize(root, undefined));
        // Flatten entire tree so we can match nodes at any depth
        const allNodes: UiCategory[] = [];
        const stackFlat: UiCategory[] = [...uiRoots];
        while (stackFlat.length) {
          const node = stackFlat.pop()!;
          allNodes.push(node);
          if (node.subcategories && node.subcategories.length) stackFlat.push(...node.subcategories);
        }

        // Keep only the main categories at top level and preserve the specified order (robust name matching)
        let ui = MAIN_CATEGORIES
          .map((name) => {
            const key = normalizeLabel(name);
            const keyCanon = canonicalLabel(name);
            // exact or canonical (plural-insensitive) matches
            const exactCandidates = allNodes.filter((c) => {
              const n = normalizeLabel(c.name);
              const cn = canonicalLabel(c.name);
              return n === key || cn === keyCanon;
            });
            if (exactCandidates.length === 1) return exactCandidates[0];
            if (exactCandidates.length > 1) {
              return exactCandidates.sort((a, b) => countDescendants(b) - countDescendants(a))[0];
            }
            // fallback 1: startsWith using a shorter prefix on canonicalized label
            const prefix = keyCanon.slice(0, Math.min(8, keyCanon.length));
            const startsWithCandidates = allNodes.filter((c) => canonicalLabel(c.name).startsWith(prefix));
            if (startsWithCandidates.length) {
              return startsWithCandidates.sort((a, b) => countDescendants(b) - countDescendants(a))[0];
            }
            // fallback 2: substring contains
            const containsCandidates = allNodes.filter((c) => canonicalLabel(c.name).includes(keyCanon));
            if (containsCandidates.length) {
              return containsCandidates.sort((a, b) => countDescendants(b) - countDescendants(a))[0];
            }
            return undefined;
          })
          .filter((c): c is UiCategory => !!c);

        // Targeted fallback: ensure 'Hematolojik Ajan' exists
        const want = 'Hematolojik Ajan';
        const haveHema = ui.some((c) => canonicalLabel(c.name) === canonicalLabel(want));
        if (!haveHema) {
          // First try: build a synthetic node from items hoisted out of a group node like 'Hematolojik Ajan Grubu'
          const groupMatchesRaw = allNodes.filter((c) => {
            if (!c.groupLabel) return false;
            const gl = canonicalLabel(c.groupLabel);
            return gl.includes('hematolojik') && gl.includes('ajan');
          });
          // De-duplicate by id
          const seen = new Set<string>();
          const groupMatches = groupMatchesRaw.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));
          if (groupMatches.length) {
            const synthetic: UiCategory = {
              id: 'synthetic:hematolojik-ajan',
              name: want,
              subcategories: groupMatches,
            };
            const targetIndex = (MAIN_CATEGORIES as readonly string[]).indexOf(want);
            if (targetIndex >= 0) {
              const before = ui.slice(0, targetIndex);
              const after = ui.slice(targetIndex);
              ui = [...before, synthetic, ...after];
            } else {
              ui.push(synthetic);
            }
          } else {
            // Fallback 2: pick the richest matching node by descendants
            const hemaCandidates = allNodes.filter((c) => {
              const label = canonicalLabel(c.name);
              return label.includes('hematolojik') && label.includes('ajan');
            });
            if (hemaCandidates.length) {
              const best = hemaCandidates.sort((a, b) => countDescendants(b) - countDescendants(a))[0];
              // Insert in correct position according to MAIN_CATEGORIES order
              const targetIndex = (MAIN_CATEGORIES as readonly string[]).indexOf(want);
              if (targetIndex >= 0) {
                const before = ui.slice(0, targetIndex);
                const after = ui.slice(targetIndex);
                // Avoid duplicates by id
                if (!ui.find((x) => x.id === best.id)) ui = [...before, best, ...after];
              } else if (!ui.find((x) => x.id === best.id)) {
                ui.push(best);
              }
            }
          }
        }

        // Add synthetic "all" entry at the top
        const allEntry: UiCategory = { id: 'all', name: 'Tüm Kategoriler' };
        setCategories([allEntry, ...ui]);
        // Default select first main category if available
        if (selectedCategory === 'all' && ui.length > 0) {
          setSelectedCategory(ui[0].id);
        }
      } catch (e) {
        console.error('Failed to load categories', e);
      } finally {
        setLoadingCats(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-expand 'Hematolojik Ajan' in the sidebar if it has subcategories
  useEffect(() => {
    const hema = categories.find((c) => c.name.trim().toLowerCase() === 'hematolojik ajan');
    if (hema && hema.subcategories && hema.subcategories.length > 0) {
      setExpandedCategories((prev) => (prev.includes(hema.id) ? prev : [...prev, hema.id]));
    }
  }, [categories]);

  // Helper: fetch a page of products
  const fetchProductsPage = async (currentOffset: number) => {
    // Handle synthetic categories by aggregating their real descendant category ids
    const realIds = getRealCategoryIds(selectedCategory);

    // If multiple real ids, fetch each and merge; apply pagination slicing on merged list
    if (realIds.length > 1) {
      const perCatLimit = PAGE_SIZE; // fetch generously, slice after merge
      const promises = realIds.map(async (rid) => {
        const url = `${API_BASE}/api/categories/${encodeURIComponent(rid)}/products?limit=${perCatLimit}&offset=0`;
        const res = await fetch(url);
        const json = await res.json();
        const items: ApiProduct[] = Array.isArray(json) ? (json as ApiProduct[]) : ((json.items ?? []) as ApiProduct[]);
        const total = Array.isArray(json) ? items.length : Number(json.total ?? items.length);
        return { items, total };
      });

      const results = await Promise.all(promises);
      // Merge and de-duplicate by product id
      const mergedMap = new Map<string, ApiProduct>();
      let totalSum = 0;
      for (const r of results) {
        totalSum += r.total || 0;
        for (const it of r.items) {
          if (!mergedMap.has(it.id)) mergedMap.set(it.id, it);
        }
      }
      const merged = Array.from(mergedMap.values());
      const paged = merged.slice(currentOffset, currentOffset + PAGE_SIZE);
      return { items: paged, total: totalSum || merged.length };
    }

    // Single category or 'all'
    let url = `${API_BASE}/api/products?limit=${PAGE_SIZE}&offset=${currentOffset}`;
    if (realIds.length === 1) {
      url = `${API_BASE}/api/categories/${encodeURIComponent(realIds[0])}/products?limit=${PAGE_SIZE}&offset=${currentOffset}`;
    }
    const res = await fetch(url);
    const json = await res.json();
    if (Array.isArray(json)) {
      return { items: json as ApiProduct[], total: currentOffset + (json as ApiProduct[]).length };
    }
    return { items: (json.items ?? []) as ApiProduct[], total: Number(json.total ?? 0) };
  };

  // Collect real category ids for a selected category.
  // If selected is a synthetic node (e.g., 'synthetic:hematolojik-ajan'), aggregate all descendant real ids.
  const getRealCategoryIds = (id: string): string[] => {
    if (!id || id === 'all') return [];
    const out = new Set<string>();
    if (id.startsWith('synthetic:')) {
      const root = findById(categories, id);
      const stack: UiCategory[] = root?.subcategories ? [...(root!.subcategories!)] : [];
      while (stack.length) {
        const n = stack.pop()!;
        if (!n.id.startsWith('synthetic:')) out.add(n.id);
        if (n.subcategories && n.subcategories.length) stack.push(...n.subcategories);
      }
      return Array.from(out);
    }
    out.add(id);
    return Array.from(out);
  };

  // Fetch first page when category changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingProducts(true);
        setOffset(0);
        setTotal(null);
        const { items, total } = await fetchProductsPage(0);
        if (cancelled) return;
        setProducts(items);
        setTotal(Number.isFinite(total) ? total : null);
      } catch (e) {
        console.error('Failed to load products', e);
        setProducts([]);
        setTotal(0);
      } finally {
        setLoadingProducts(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const loadMore = async () => {
    try {
      setLoadingProducts(true);
      const nextOffset = offset + PAGE_SIZE;
      const { items } = await fetchProductsPage(nextOffset);
      setProducts((prev) => [...prev, ...items]);
      setOffset(nextOffset);
    } catch (e) {
      console.error('Failed to load more products', e);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Derive manufacturer filter options from loaded products
  const manufacturerOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const key = p.manufacturer || 'Bilinmeyen';
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ id: name, name, count }));
  }, [products]);

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

  const filteredProducts = products.filter((product) => {
    const needle = searchTerm.trim().toLowerCase();
    const matchesSearch =
      needle.length === 0 ||
      product.name.toLowerCase().includes(needle) ||
      (product.dosage || '').toLowerCase().includes(needle) ||
      (product.form || '').toLowerCase().includes(needle);

    const matchesManufacturer =
      selectedManufacturers.length === 0 ||
      selectedManufacturers.includes(product.manufacturer || 'Bilinmeyen');

    // showHandSoldOnly has no backend flag; keep all for now
    return matchesSearch && matchesManufacturer;
  });

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
    if (!selectedCategory || selectedCategory === 'all') return { name: 'Tüm Kategoriler', group: undefined as string | undefined };
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
                      : `${filteredProducts.length} ürün bulundu`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Elden Satılan Button (placeholder) */}
              <button
                onClick={() => setShowHandSoldOnly(!showHandSoldOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showHandSoldOnly ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Elden Satılan
              </button>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ürün adı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
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

          {/* Right Content - Products Grid */}
          <div className="flex-1">
            {/* Selected Category Title + meta */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedMeta.name}</h2>
              <p className="text-gray-600 text-sm mt-1">
                {selectedMeta.group ? `${selectedMeta.group} • ` : ''}
                {loadingProducts ? 'Ürünler yükleniyor…' : total !== null ? `${total} Ürün` : `${filteredProducts.length} Ürün`}
              </p>
            </div>

            {/* Sort Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">
                    {loadingProducts
                      ? 'Ürünler yükleniyor…'
                      : total !== null
                        ? `${total} ürün bulundu`
                        : `${filteredProducts.length} ürün bulundu`}
                  </span>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Seçili Filtreler</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                  <option>İsim: A-Z</option>
                  <option>İsim: Z-A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
                >
                  {/* Product Image */}
                  <div className="w-full h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
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
                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">{product.dosage || product.form || ''}</p>

                    {/* Price */}
                    <div className="mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price !== null ? `${product.price.toFixed(2)} TL` : 'Fiyat Yok'}
                      </span>
                    </div>

                    {/* Warehouse and Stock */}
                    <div className="text-xs text-gray-600 mb-3">
                      <div>Stok: {(product.stock || 0)}</div>
                      <div>{product.manufacturer || 'Üretici Yok'}</div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{product.barcode || 'Barkod Yok'}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Add to cart
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!loadingProducts && filteredProducts.length === 0 && (
                <div className="col-span-full text-sm text-gray-500">Bu kategori için ürün bulunamadı.</div>
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingProducts || (total !== null && filteredProducts.length >= total)}
                className={`bg-white border px-6 py-3 rounded-lg font-medium transition-colors ${
                  loadingProducts || (total !== null && filteredProducts.length >= total)
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {loadingProducts ? 'Yükleniyor…' : (total !== null && filteredProducts.length >= total) ? 'Hepsi Gösterildi' : 'Daha Fazla Ürün Göster'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCategoriesPage;
