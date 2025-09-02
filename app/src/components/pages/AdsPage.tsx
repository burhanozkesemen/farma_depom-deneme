'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';

const AdsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('İlanlarım');

  if (!user) {
    return null;
  }

  const tabs = [
    { name: 'Kullanıcı Bilgilerim', route: '/user-profile' },
    { name: 'Satış Panelim', route: '/sales-panel' },
    { name: 'İlanlarım', route: '/ads' },
    { name: 'Siparişlerim', route: '/orders' },
    { name: 'Faturalarım', route: '/invoices' },
    { name: 'Cüzdanım', route: '/wallet' },
    { name: 'Hesap Hareketlerim', route: '/account-movements' },
    { name: 'Ayarlarım', route: '/settings' }
  ];

  const handleTabClick = (tab: { name: string; route: string }) => {
    setActiveTab(tab.name);
    router.push(tab.route);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.name
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">İlan Ekle</h1>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Satış Profilimi Gör
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Ürün Adı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ürün adı veya barkodunu yazınız"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Barkod */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Barkod <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Barkod yazınız"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Miat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Miat <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  placeholder="Miat seçiniz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Stok */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Stok yazınız"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Fiyat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Fiyat yazınız"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Additional Options */}
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-blue-600">PSF, Maks. Satış Adedi veya İlan Açıklaması Ekle</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors">
                İlan Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 bg-indigo-900 rounded-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Yeni Kargo Payı Sistemi</h2>
              <p className="text-indigo-200 mb-1">9 Nisan itibariyle tüm satışlarınızda desi başına sabit bir tutar, hak edişlerinizden düşülecek.</p>
              <p className="text-indigo-200">Ürün bazında maliyetlerinizi hesaplayabilmek için sizin özel hazırladığımız sayfayı inceleyebilirsiniz.</p>
            </div>
            <button className="bg-white text-indigo-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Nasıl Hesaplanır?
            </button>
          </div>
        </div>

        {/* Product Listing Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            {/* Filter Tabs */}
            <div className="flex space-x-6 mb-6">
              <span className="text-sm text-gray-600">Yayında Olanlar • 1</span>
              <span className="text-sm text-gray-600">Yayında Olmayanlar • 4</span>
              <span className="text-sm text-gray-600">Onay Bekleyenler • 0</span>
            </div>

            {/* Sort and Search */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sırala:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Güncellenme Tarihi</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Yayında alanlarda ara"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
                />
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="ml-2">Ürün Adı</span>
              </div>
              <div>KDV</div>
              <div>Miat</div>
              <div>Stok</div>
              <div>Fiyat</div>
              <div></div>
            </div>

            {/* Product Row */}
            <div className="grid grid-cols-6 gap-4 py-4 border-b border-gray-200 items-center">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <img src="/api/placeholder/40/40" alt="Product" className="w-10 h-10 rounded" />
                <div>
                  <p className="text-sm font-medium">Beebiri Accurect Akıllı Tansiyon Aleti Bluetooth</p>
                </div>
              </div>
              <div className="text-sm">%10</div>
              <div className="text-sm">Hata Bildir</div>
              <div className="text-sm">Miatsız Ürün</div>
              <div className="text-sm">1</div>
              <div className="text-sm">1450,00</div>
              <div className="text-right">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Tüm Bilgiler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
