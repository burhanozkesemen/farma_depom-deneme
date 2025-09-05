'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Grid, List, ShoppingCart, Star, Shield } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { Product } from '@/src/types';

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    inStock: false,
    verified: false,
  });

  // API data state
  const [products, setProducts] = useState<Product[]>([] as any);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend API
  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // Support both legacy array and new paginated shape { items, total }
        const rawItems: any[] = Array.isArray(json) ? json : (json?.items ?? []);
        // Map API shape to UI Product shape with safe fallbacks
        // API fields: { id, name, dosage, form, manufacturer, barcode, stock, price }
        const mapped: Product[] = rawItems.map((p: any) => ({
          id: p.id,
          name: p.name,
          barcode: p?.barcode ?? '',
          activeIngredient: [p.dosage, p.form].filter(Boolean).join(' • '),
          price: typeof p.price === 'number' ? p.price : 0,
          stock: typeof p.stock === 'number' ? p.stock : 0,
          warehouseId: 'n/a',
          warehouseName: p?.manufacturer ?? '—',
          isApproved: true,
          image: p.imageUrl || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
          description: undefined,
          createdAt: new Date(),
        }));
        if (mounted) setProducts(mapped);
      } catch (e: any) {
        if (mounted) setError(e.message || 'Veri çekilemedi');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => { mounted = false };
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.barcode || '').includes(searchTerm) ||
                         (product.activeIngredient || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesStock = !filters.inStock || (product.stock || 0) > 0;
    return matchesSearch && matchesPrice && matchesStock;
  });

  const handleAddToCart = (product: Product) => {
    if ((product.stock || 0) > 0) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ürün Kataloğu</h1>
          <p className="mt-2 text-gray-600">
            {loading ? 'Yükleniyor…' : `${filteredProducts.length} ürün listeleniyor`}
          </p>
        </div>

        {/* Search and View Controls */}
        <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Filter className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Filtreler</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Fiyat Aralığı</label>
                <div className="mt-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [0, parseInt(e.target.value)] 
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>₺0</span>
                    <span>₺{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sadece stokta olanlar</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Onaylı depolar</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setFilters({ priceRange: [0, 1000], inStock: false, verified: false })}
              className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="flex-1">
          {error && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-4">
              Hata: {error}
            </div>
          )}

          {!error && !loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-600">
                Arama kriterlerinizi değiştirip tekrar deneyin.
              </p>
            </div>
          )}

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">#{product.barcode}</span>
                      {(product.stock || 0) > 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Stokta
                        </span>
                      )}
                      {(product.stock || 0) === 0 && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Tükendi
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.activeIngredient}</p>
                    <div className="flex items-center mb-3">
                      <Shield className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-xs text-gray-600">{product.warehouseName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">₺{product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        disabled={(product.stock || 0) === 0}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Sepete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Etken Madde: {product.activeIngredient}
                          </p>
                          <p className="text-sm text-gray-600">
                            Barkod: #{product.barcode}
                          </p>
                          <div className="flex items-center mt-2">
                            <Shield className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-sm text-gray-600">{product.warehouseName}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            ₺{product.price.toFixed(2)}
                          </div>
                          <div className="mb-3">
                            {(product.stock || 0) > 0 ? (
                              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                {(product.stock || 0)} adet stokta
                              </span>
                            ) : (
                              <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
                                Stok tükendi
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={(product.stock || 0) === 0}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Sepete Ekle</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;