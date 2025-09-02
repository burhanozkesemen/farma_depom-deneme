'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Search, ChevronDown } from 'lucide-react';

const SellerProfilePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('İlanlar');
  const [selectedFilter, setSelectedFilter] = useState('Çok Satanlar');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('Fiyata Göre Artan');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return null;
  }

  const tabs = [
    { name: 'İlanlar', count: 1 },
    { name: 'Yorumlar', count: 10 }
  ];

  const filters = [
    'Çok Satanlar',
    'En Uygunlar', 
    'Fiyata Göre Artan'
  ];

  const mockProducts = [
    {
      id: 1,
      name: 'Beebiri Accurect Akıllı Tansiyon Aleti Bluetooth',
      brand: 'Miatsız Ürün',
      stock: 1,
      price: 1450.00,
      image: '/api/placeholder/80/80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">E</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">ciko07</h1>
                <p className="text-sm text-gray-600">1 İlan</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Üyemiz FarmaDepom puanı için yeterli</p>
            <p>sipariş sayısına ulaşamamıştır.</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Anlaşmalı Kargolar</h3>
            <div className="flex items-center space-x-4">
              <img src="/api/placeholder/40/20" alt="MNG Kargo" className="h-5" />
              <img src="/api/placeholder/40/20" alt="Aras Kargo" className="h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-900 mb-4">Tüm Kategoriler</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Medikal</span>
                  <span className="ml-auto text-sm text-gray-500">1</span>
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                </div>
              </div>

              <h3 className="font-medium text-gray-900 mt-6 mb-4">Markalar</h3>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Markalarda ara"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Beebiri</span>
                  <span className="ml-auto text-sm text-gray-500">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-8 mb-6 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.name
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name} • {tab.count}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedFilter === filter
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="İlanlarda Ara"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                  />
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-lg shadow">
              {mockProducts.map((product) => (
                <div key={product.id} className="flex items-center p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600">Miat: {product.brand}</p>
                    <p className="text-xs text-gray-600">Stok: {product.stock}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {product.price.toFixed(2)} TL
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-1 rounded text-xs hover:bg-orange-600 transition-colors">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State for other tabs */}
            {activeTab === 'Yorumlar' && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">Henüz yorum bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
