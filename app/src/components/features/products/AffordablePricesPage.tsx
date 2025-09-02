'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingDown, Clock, MapPin, Star, Filter } from 'lucide-react';

interface AffordableProduct {
  id: string;
  name: string;
  activeIngredient: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  warehouseName: string;
  location: string;
  expiryDate: string;
  stock: number;
  rating: number;
  image?: string;
}

const AffordablePricesPage: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  const affordableProducts: AffordableProduct[] = [
    {
      id: '1',
      name: 'Parol 500mg',
      activeIngredient: 'Parasetamol',
      originalPrice: 25.50,
      discountedPrice: 18.75,
      discountPercentage: 26,
      warehouseName: 'Merkez İlaç Deposu',
      location: 'İstanbul',
      expiryDate: '2025-08-15',
      stock: 150,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Aspirin 100mg',
      activeIngredient: 'Asetilsalisilik Asit',
      originalPrice: 32.80,
      discountedPrice: 21.30,
      discountPercentage: 35,
      warehouseName: 'Anadolu Eczacılık',
      location: 'Ankara',
      expiryDate: '2025-12-20',
      stock: 89,
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Nurofen 400mg',
      activeIngredient: 'İbuprofen',
      originalPrice: 45.90,
      discountedPrice: 32.15,
      discountPercentage: 30,
      warehouseName: 'Ege Sağlık Deposu',
      location: 'İzmir',
      expiryDate: '2025-09-10',
      stock: 76,
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Voltaren Gel 50g',
      activeIngredient: 'Diklofenak',
      originalPrice: 68.40,
      discountedPrice: 44.50,
      discountPercentage: 35,
      warehouseName: 'Marmara İlaç',
      location: 'Bursa',
      expiryDate: '2025-11-05',
      stock: 45,
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Supradyn Tablet',
      activeIngredient: 'Multivitamin',
      originalPrice: 95.60,
      discountedPrice: 67.20,
      discountPercentage: 30,
      warehouseName: 'Doğu Anadolu Eczacılık',
      location: 'Erzurum',
      expiryDate: '2026-01-30',
      stock: 120,
      rating: 4.5,
    },
    {
      id: '6',
      name: 'Coraspin 100mg',
      activeIngredient: 'Asetilsalisilik Asit',
      originalPrice: 28.90,
      discountedPrice: 19.45,
      discountPercentage: 33,
      warehouseName: 'Karadeniz İlaç Deposu',
      location: 'Trabzon',
      expiryDate: '2025-10-15',
      stock: 98,
      rating: 4.4,
    },
  ];

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler' },
    { id: 'analgesic', name: 'Ağrı Kesici' },
    { id: 'vitamin', name: 'Vitamin' },
    { id: 'topical', name: 'Dış Kullanım' },
    { id: 'antiinflammatory', name: 'Antiinflamatuar' },
  ];

  const filteredProducts = affordableProducts
    .filter(product => {
      if (selectedCategory === 'all') return true;
      // Kategori filtreleme mantığı burada olabilir
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'price':
          return a.discountedPrice - b.discountedPrice;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Uygun Fiyat Fırsatları</h1>
                <p className="text-gray-600 mt-1">En uygun fiyatlı ilaçları keşfedin</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-green-600">%35'e varan indirimler</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtreler
            </h3>
            <span className="text-sm text-gray-600">
              {filteredProducts.length} ürün bulundu
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıralama
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="discount">İndirim Oranına Göre</option>
                <option value="price">Fiyata Göre (Artan)</option>
                <option value="rating">Değerlendirmeye Göre</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fiyat Aralığı
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Discount Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    %{product.discountPercentage} İNDİRİM
                  </span>
                </div>
                <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">İlaç Görseli</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{product.activeIngredient}</p>
                
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ₺{product.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ₺{product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Warehouse Info */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{product.warehouseName} - {product.location}</span>
                </div>

                {/* Expiry Date */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>SKT: {new Date(product.expiryDate).toLocaleDateString('tr-TR')}</span>
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stok:</span>
                    <span className={`font-medium ${(product.stock || 0) > 50 ? 'text-green-600' : (product.stock || 0) > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {(product.stock || 0)} adet
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
            Daha Fazla Göster
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffordablePricesPage;
