'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const WalletPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Cüzdanım');

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

      <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cüzdanım</h1>
          <p className="mt-2 text-gray-600">Bakiyenizi görüntüleyin ve finansal işlemlerinizi yönetin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium">Mevcut Bakiye</h2>
                  <p className="text-3xl font-bold mt-2">₺2,450.75</p>
                </div>
                <Wallet className="h-12 w-12 opacity-80" />
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 text-center transition-all">
                  <ArrowUpRight className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Para Yükle</span>
                </button>
                <button className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 text-center transition-all">
                  <ArrowDownLeft className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Para Çek</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bu Ay Kazanç</p>
                  <p className="text-2xl font-bold text-gray-900">₺1,250</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ArrowDownLeft className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bu Ay Harcama</p>
                  <p className="text-2xl font-bold text-gray-900">₺850</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Son İşlemler</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <Wallet className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz işlem yok</h3>
              <p className="mt-1 text-sm text-gray-500">İlk işleminizi gerçekleştirin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WalletPage;
