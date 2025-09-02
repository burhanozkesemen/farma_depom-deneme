'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Activity, TrendingUp, TrendingDown, Calendar, Download, ChevronDown } from 'lucide-react';

const AccountMovementsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Hesap Hareketlerim');
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Raporlarım');
  const [selectedDateRange, setSelectedDateRange] = useState('Son 7 Gün');
  const [selectedReportTab, setSelectedReportTab] = useState('Tarih Aralığı Seçin');

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
            <h1 className="text-3xl font-bold text-gray-900">Hesap Hareketlerim</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4">
                  <nav className="space-y-2">
                    {['Satış Hareketlerim', 'Alış Hareketlerim', 'Onay Bekleyen İşlemlerim', 'Raporlarım', 'Faturalarım'].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedSidebarItem(item);
                          if (item === 'Faturalarım') {
                            router.push('/invoices');
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedSidebarItem === item
                            ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedSidebarItem === 'Raporlarım' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Raporlarım</h2>
                    <p className="text-gray-600 mb-6">Alış ve satış raporlarınızı seçeceğiniz tarih aralığında veya aylık olarak indirebilirsiniz.</p>

                    {/* Report Tabs */}
                    <div className="flex space-x-1 mb-6">
                      {['Tarih Aralığı Seçin', 'Aylık Raporlarım'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setSelectedReportTab(tab)}
                          className={`px-4 py-2 text-sm font-medium rounded-md ${
                            selectedReportTab === tab
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {selectedReportTab === 'Tarih Aralığı Seçin' && (
                      <div>
                        {/* Date Range Selector */}
                        <div className="mb-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div className="relative">
                              <select 
                                value={selectedDateRange}
                                onChange={(e) => setSelectedDateRange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white appearance-none pr-8 text-gray-900"
                              >
                                <option value="Son 7 Gün" className="text-gray-900">Son 7 Gün</option>
                                <option value="Son 30 Gün" className="text-gray-900">Son 30 Gün</option>
                                <option value="Son 3 Ay" className="text-gray-900">Son 3 Ay</option>
                                <option value="Son 6 Ay" className="text-gray-900">Son 6 Ay</option>
                                <option value="Son 1 Yıl" className="text-gray-900">Son 1 Yıl</option>
                              </select>
                              <ChevronDown className="h-4 w-4 absolute right-2 top-3 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Reports Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Sales Report */}
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Satış Raporlarım</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              26 Ağustos 2025 - 02 Eylül 2025 tarihleri arasında Farmazon'da satışınız bulunmamaktadır.
                            </p>
                            <button 
                              onClick={() => {
                                // Simulate download
                                const link = document.createElement('a');
                                link.href = 'data:text/plain;charset=utf-8,Satış Raporu - ' + selectedDateRange;
                                link.download = `satis-raporu-${selectedDateRange.toLowerCase().replace(' ', '-')}.xlsx`;
                                link.click();
                              }}
                              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              <span>Sipariş Raporu İndir</span>
                            </button>
                          </div>

                          {/* Purchase Report */}
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Alış Raporlarım</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              26 Ağustos 2025 - 02 Eylül 2025 tarihleri arasında Farmazon'daki alımlarınızı sipariş veya ürün kırılımlarına göre Excel formatında raporlayabilirsiniz.
                            </p>
                            <div className="space-y-2">
                              <button 
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = 'data:text/plain;charset=utf-8,Alış Sipariş Raporu - ' + selectedDateRange;
                                  link.download = `alis-siparis-raporu-${selectedDateRange.toLowerCase().replace(' ', '-')}.xlsx`;
                                  link.click();
                                }}
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium w-full hover:bg-purple-200 transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                <span>Sipariş Raporu İndir</span>
                              </button>
                              <button 
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = 'data:text/plain;charset=utf-8,Alış Ürün Raporu - ' + selectedDateRange;
                                  link.download = `alis-urun-raporu-${selectedDateRange.toLowerCase().replace(' ', '-')}.xlsx`;
                                  link.click();
                                }}
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium w-full hover:bg-purple-200 transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                <span>Ürün Raporu İndir</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Tax Report */}
                        <div className="mt-6 border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-4">Stopaj Vergi Kesintisi Raporları</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Stopaj Vergi Kesintileri</label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option>Mart 2025</option>
                                <option>Şubat 2025</option>
                                <option>Ocak 2025</option>
                              </select>
                            </div>
                            <div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">Devlete Ödenen Vergi Tutarı</p>
                                <p className="text-xl font-bold text-gray-900">20,58 TL</p>
                              </div>
                            </div>
                            <div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">Ödeme Tarihi</p>
                                <p className="text-lg font-semibold text-gray-900">28 Nisan 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">
                              Mart ayı içinde hesabınıza yatan hakedişler için azınızı ödenen stopaj vergi kesintilerinin toplamını görebilirsiniz.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Other sidebar items content */}
              {selectedSidebarItem !== 'Raporlarım' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedSidebarItem}</h2>
                    <div className="text-center py-12">
                      <Activity className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz veri yok</h3>
                      <p className="mt-1 text-sm text-gray-500">Bu bölümdeki veriler yakında eklenecek.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMovementsPage;
