'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const AdsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('İlanlarım');
  const [formData, setFormData] = useState({
    productName: '',
    barcode: '',
    expiryDate: '',
    stock: '',
    price: '',
    searchQuery: ''
  });
  const [sortBy, setSortBy] = useState('Güncellenme Tarihi');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Yayında Olanlar');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.productName || !formData.barcode || !formData.expiryDate || !formData.stock || !formData.price) {
      alert('Lütfen tüm zorunlu alanları doldurun!');
      return;
    }
    alert('İlan başarıyla eklendi!');
    setFormData({
      productName: '',
      barcode: '',
      expiryDate: '',
      stock: '',
      price: '',
      searchQuery: ''
    });
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedProducts(selectAll ? [] : [1]);
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
            <button 
              onClick={() => router.push('/seller-profile')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
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
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
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
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
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
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
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
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
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
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
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
              <button 
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                İlan Ekle
              </button>
            </div>
          </div>
        </div>


        {/* Product Listing Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            {/* Filter Tabs */}
            <div className="flex space-x-6 mb-6">
              {[
                { name: 'Yayında Olanlar', count: 1 },
                { name: 'Yayında Olmayanlar', count: 4 },
                { name: 'Onay Bekleyenler', count: 0 }
              ].map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setActiveFilter(filter.name)}
                  className={`text-sm font-medium ${
                    activeFilter === filter.name
                      ? 'text-orange-600 border-b-2 border-orange-500 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter.name} • {filter.count}
                </button>
              ))}
            </div>

            {/* Sort and Search */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sırala:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700"
                >
                  <option value="Güncellenme Tarihi">Güncellenme Tarihi</option>
                  <option value="Fiyat (Düşükten Yükseğe)">Fiyat (Düşükten Yükseğe)</option>
                  <option value="Fiyat (Yüksekten Düşüğe)">Fiyat (Yüksekten Düşüğe)</option>
                  <option value="Stok Miktarı">Stok Miktarı</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="searchQuery"
                  value={formData.searchQuery}
                  onChange={handleInputChange}
                  placeholder="Yayında alanlarda ara"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
                />
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300" 
                />
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
                <input 
                  type="checkbox" 
                  checked={selectedProducts.includes(1)}
                  onChange={() => handleProductSelect(1)}
                  className="rounded border-gray-300" 
                />
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
                <button 
                  onClick={() => alert('Ürün detayları: Beebiri Accurect Akıllı Tansiyon Aleti Bluetooth\nFiyat: 1450,00 TL\nStok: 1 adet\nDurum: Yayında')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Tüm Bilgiler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
