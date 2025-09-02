'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Search, Star, Package } from 'lucide-react';

interface WarehouseDetailPageProps {
  warehouseId?: string;
}

const WarehouseDetailPage: React.FC<WarehouseDetailPageProps> = ({ warehouseId = 'depofarma' }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Çok Satanlar');
  const [_selectedCategory] = useState('Çok Satanlar');

  // Mock warehouse data
  const warehouseData = {
    depofarma: {
      name: 'symbicort',
      logo: 'symbicort',
      color: 'blue',
      totalProducts: 52,
      description: 'Botanik eczanesyonu vardır! Korkakçık otomacık olacaktır.',
      shippingInfo: '2500 TL ve üzeri kargo bedava!',
      location: 'İstanbul',
      rating: 4.8,
      deliveryTime: '1-2 gün'
    },
    strdepo: {
      name: 'STRDepo',
      logo: 'STR',
      color: 'blue',
      totalProducts: 157,
      description: 'FarmaDepom üzerinden sizinle paylaştırı.',
      shippingInfo: '2500 TL ve üzeri kargo bedava!',
      location: 'İstanbul',
      rating: 4.7,
      deliveryTime: '1-2 gün'
    }
  };

  const categories = ['Çok Satanlar', 'En Uygunlar', 'Eldeki Satılan', 'Adını Zyye'];
  const _filters = ['En Ucuzlar', 'Birim Fiyat'];

  // Mock products data with realistic Turkish medications
  const products = [
    {
      id: 1,
      name: 'Muskaron 250 mg/300 mg 20 Tablet',
      brand: 'Diğer ilanları gör (9)',
      price: 47.69,
      originalPrice: null,
      discount: '%31',
      discountBadge: 'Şubat 2027',
      category: 'Çok Satanlar',
      inStock: true,
      image: '/api/placeholder/60/60',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      name: 'Nurofen Cold & Flu 200 mg/30 mg 24 Film Kaplı Tablet',
      brand: '',
      price: 80.59,
      originalPrice: null,
      discount: '%21',
      discountBadge: 'Eylül 2026',
      category: 'Çok Satanlar',
      inStock: true,
      image: '/api/placeholder/60/60',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 3,
      name: 'Majezik 100 mg 15 Tablet',
      brand: '',
      price: 89.19,
      originalPrice: null,
      discount: '%17',
      discountBadge: 'Aralık 2029',
      category: 'Çok Satanlar',
      inStock: true,
      image: '/api/placeholder/60/60',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 4,
      name: 'Algopet 100 mg 15 Film Kaplı Tablet',
      brand: '',
      price: 40.30,
      originalPrice: null,
      discount: '%39',
      discountBadge: 'Ekim 2027',
      category: 'Çok Satanlar',
      inStock: true,
      image: '/api/placeholder/60/60',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 5,
      name: 'Thermo Fuze %1 + %0,025 Jel 50 g',
      brand: '',
      price: 144.80,
      originalPrice: null,
      discount: '%4',
      discountBadge: 'Haziran 2026',
      category: 'Çok Satanlar',
      inStock: true,
      image: '/api/placeholder/60/60',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    }
  ];

  const warehouse = warehouseData[warehouseId as keyof typeof warehouseData] || warehouseData.depofarma;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'Çok Satanlar' || product.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Uygun Fiyat</span>
              <span className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Yakın Miat</span>
              <span className="text-sm text-blue-600 font-medium">Tüm Depolar</span>
              <span className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Elden Satılan İlaçlar</span>
              <span className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">İlaç Kategorileri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button 
              onClick={() => router.push('/home')}
              className="hover:text-blue-600"
            >
              Ana Sayfa
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">{warehouse.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0">
            {/* Warehouse Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-sm">{warehouse.logo}</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{warehouse.name}</h2>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <p>{warehouse.description}</p>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-medium">{warehouse.shippingInfo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Bu işletme Sağlık Bakanlığı tarafından ruhsatlandırılmış ve GLN'si 
                  bulunan bir eczane deposudur.
                </p>
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-gray-900 font-medium">{warehouse.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4">
                <div className="flex space-x-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === category
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="İlaçlarda ara"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="text-blue-600 font-medium text-sm">Birim Fiyat</button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => router.push(`/product/${`product-${product.id}`}`)}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                      {/* Product Image */}
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
                          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">IMG</span>
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                          {product.brand && (
                            <p className="text-sm text-blue-600 hover:underline cursor-pointer">{product.brand}</p>
                          )}
                        </div>
                      </div>

                      {/* Price and Date */}
                      <div className="text-right mr-6">
                        <div className="text-sm text-red-600 mb-1">{product.discountBadge}</div>
                        <div className="font-bold text-gray-900 text-lg">{product.price.toFixed(2)} TL</div>
                        {product.discount && (
                          <div className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mt-1">
                            {product.discount}
                          </div>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetailPage;
