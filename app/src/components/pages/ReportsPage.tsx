'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  ArrowLeft,
  DollarSign,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';

const ReportsPage: React.FC = () => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('sales');

  const reportTypes = [
    { id: 'sales', name: 'Satış Raporu', icon: DollarSign },
    { id: 'inventory', name: 'Stok Raporu', icon: Package },
    { id: 'customers', name: 'Müşteri Raporu', icon: Users },
    { id: 'orders', name: 'Sipariş Raporu', icon: ShoppingCart },
  ];

  const periods = [
    { id: 'week', name: 'Bu Hafta' },
    { id: 'month', name: 'Bu Ay' },
    { id: 'quarter', name: 'Bu Çeyrek' },
    { id: 'year', name: 'Bu Yıl' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
              <p className="text-gray-600 mt-1">İş performansınızı analiz edin</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Raporu İndir
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rapor Türü
              </label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dönem
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {reportTypes.find(r => r.id === selectedReport)?.name}
                </h2>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
              
              {/* Mock Chart */}
              <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Grafik verisi yükleniyor...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Özet İstatistikler</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Toplam Satış</span>
                  <span className="font-semibold text-gray-900">₺125,430</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sipariş Sayısı</span>
                  <span className="font-semibold text-gray-900">342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ortalama Sipariş</span>
                  <span className="font-semibold text-gray-900">₺367</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aktif Müşteri</span>
                  <span className="font-semibold text-gray-900">89</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">En Çok Satanlar</h3>
              <div className="space-y-3">
                {[
                  { name: 'Aspirin 500mg', sales: 45 },
                  { name: 'Parol 500mg', sales: 38 },
                  { name: 'Majezik', sales: 32 },
                  { name: 'Voltaren Gel', sales: 28 },
                  { name: 'Nexium', sales: 24 },
                ].map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{product.name}</span>
                    <span className="text-sm font-medium text-gray-900">{product.sales}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
