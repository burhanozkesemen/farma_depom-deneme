'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  DollarSign, 
  ShoppingCart, 
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  growth: number;
}

const mockSalesData: SalesData[] = [
  { period: 'Bugün', revenue: 15420, orders: 89, customers: 67, growth: 12.5 },
  { period: 'Bu Hafta', revenue: 87350, orders: 456, customers: 234, growth: 8.3 },
  { period: 'Bu Ay', revenue: 342800, orders: 1789, customers: 892, growth: 15.7 },
  { period: 'Bu Yıl', revenue: 2847500, orders: 15234, customers: 4567, growth: 22.1 }
];

const topProducts = [
  { name: 'Parol 500mg', sales: 234, revenue: 4680 },
  { name: 'Aspirin 100mg', sales: 189, revenue: 3780 },
  { name: 'Vitamin D3', sales: 156, revenue: 4680 },
  { name: 'Omega 3', sales: 134, revenue: 4020 },
  { name: 'Magnezyum', sales: 98, revenue: 2940 }
];

export default function SalesPanelPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('Bu Ay');
  const [activeTab, setActiveTab] = useState('Satış Panelim');
  const currentData = mockSalesData.find(data => data.period === selectedPeriod) || mockSalesData[2];

  const tabs = [
    { name: 'Kullanıcı Bilgilerim', route: '/user-profile' },
    { name: 'Satış Panelim', route: '/sales-panel' },
    { name: 'İlanlarım', route: '/ads' },
    { name: 'Siparişlerim', route: '/orders' },
    { name: 'Faturalarım', route: '/invoices' },
    { name: 'Cüzdanım', route: '/wallet' },
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

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Satış Paneli</h1>
            <p className="text-gray-600">Satış performansınızı takip edin ve analiz edin</p>
          </div>

        {/* Period Selector */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {mockSalesData.map((data) => (
              <button
                key={data.period}
                onClick={() => setSelectedPeriod(data.period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === data.period
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {data.period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₺{currentData.revenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{currentData.growth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">önceki döneme göre</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData.orders.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{Math.round(currentData.growth * 0.8)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">önceki döneme göre</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Müşteri Sayısı</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData.customers.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{Math.round(currentData.growth * 0.6)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">önceki döneme göre</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₺{Math.round(currentData.revenue / currentData.orders)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{Math.round(currentData.growth * 0.4)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">önceki döneme göre</span>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">En Çok Satan Ürünler</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} adet satıldı</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₺{product.revenue}</p>
                    <p className="text-sm text-gray-500">gelir</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Yeni sipariş alındı</p>
                  <p className="text-sm text-gray-500">Sipariş #12345 - ₺245</p>
                  <p className="text-xs text-gray-400">5 dakika önce</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Yeni müşteri kaydı</p>
                  <p className="text-sm text-gray-500">Eczane Sağlık Merkezi</p>
                  <p className="text-xs text-gray-400">15 dakika önce</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Günlük hedef tamamlandı</p>
                  <p className="text-sm text-gray-500">₺15,000 hedefine ulaşıldı</p>
                  <p className="text-xs text-gray-400">2 saat önce</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Stok uyarısı</p>
                  <p className="text-sm text-gray-500">Parol 500mg stoku azalıyor</p>
                  <p className="text-xs text-gray-400">3 saat önce</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
