'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { ShoppingBag, Clock, CheckCircle, XCircle, ThumbsUp, Package, Truck } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Siparişlerim');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const mockProducts = [
    { id: 1, name: 'Aspirin 500mg', barcode: '8690123456789', quantity: 50, price: 25.50, date: '2024-01-15' },
    { id: 2, name: 'Paracetamol 500mg', barcode: '8690987654321', quantity: 30, price: 18.75, date: '2024-01-14' },
    { id: 3, name: 'İbuprofen 400mg', barcode: '8690555666777', quantity: 25, price: 32.00, date: '2024-01-13' }
  ];

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

      <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
          <p className="mt-2 text-gray-600">Tüm siparişlerinizi görüntüleyin ve takip edin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SATTIKLARIM */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Sattıklarım</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div 
                  onClick={() => toggleSection('sattiklarim-tamamlanan')}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <ThumbsUp className="h-6 w-6 text-green-600 mr-3" />
                    <span className="font-medium text-green-800">Tamamlananlar</span>
                  </div>
                </div>
                
                {expandedSection === 'sattiklarim-tamamlanan' && (
                  <div className="bg-white border rounded-lg p-4 space-y-3">
                    {mockProducts.map(product => (
                      <div key={product.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">Barkod: {product.barcode}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{product.quantity} adet</p>
                          <p className="text-sm text-green-600">₺{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div 
                  onClick={() => toggleSection('sattiklarim-iptal')}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <XCircle className="h-6 w-6 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-800">İptal Edilenler</span>
                  </div>
                </div>
                
                {expandedSection === 'sattiklarim-iptal' && (
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-center text-gray-500 py-4">İptal edilen sipariş bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ALDIKLARIM */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Aldıklarım</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div 
                  onClick={() => toggleSection('aldiklarim-hazirlanan')}
                  className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Package className="h-6 w-6 text-yellow-600 mr-3" />
                    <span className="font-medium text-yellow-800">Hazırlananlar</span>
                  </div>
                </div>
                
                {expandedSection === 'aldiklarim-hazirlanan' && (
                  <div className="bg-white border rounded-lg p-4 space-y-3">
                    {mockProducts.slice(0, 2).map(product => (
                      <div key={product.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">Barkod: {product.barcode}</p>
                          <p className="text-xs text-yellow-600">Hazırlanıyor...</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{product.quantity} adet</p>
                          <p className="text-sm text-yellow-600">₺{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div 
                  onClick={() => toggleSection('aldiklarim-kargo')}
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Truck className="h-6 w-6 text-orange-600 mr-3" />
                    <span className="font-medium text-orange-800">Kargodakiler</span>
                  </div>
                </div>
                
                {expandedSection === 'aldiklarim-kargo' && (
                  <div className="bg-white border rounded-lg p-4 space-y-3">
                    {mockProducts.slice(1, 3).map(product => (
                      <div key={product.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">Barkod: {product.barcode}</p>
                          <p className="text-xs text-orange-600">Kargoda - Takip No: KRG{product.id}23456</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{product.quantity} adet</p>
                          <p className="text-sm text-orange-600">₺{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div 
                  onClick={() => toggleSection('aldiklarim-tamamlanan')}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <ThumbsUp className="h-6 w-6 text-green-600 mr-3" />
                    <span className="font-medium text-green-800">Tamamlananlar</span>
                  </div>
                </div>
                
                {expandedSection === 'aldiklarim-tamamlanan' && (
                  <div className="bg-white border rounded-lg p-4 space-y-3">
                    {mockProducts.map(product => (
                      <div key={product.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">Barkod: {product.barcode}</p>
                          <p className="text-xs text-green-600">Teslim edildi - {product.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{product.quantity} adet</p>
                          <p className="text-sm text-green-600">₺{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div 
                  onClick={() => toggleSection('aldiklarim-iptal')}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <XCircle className="h-6 w-6 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-800">İptal Edilenler</span>
                  </div>
                </div>
                
                {expandedSection === 'aldiklarim-iptal' && (
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-center text-gray-500 py-4">İptal edilen sipariş bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrdersPage;
