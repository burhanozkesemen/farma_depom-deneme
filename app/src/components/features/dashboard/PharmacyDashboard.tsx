'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Order, Notification } from '@/src/types';

const PharmacyDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalOrders: 47,
    pendingOrders: 3,
    monthlySpend: 12450.50,
    savedAmount: 890.25,
  };

  const recentOrders: Order[] = [
    {
      id: 'ORD-001',
      pharmacyId: 'p1',
      warehouseId: 'w1',
      items: [],
      total: 245.80,
      status: 'delivered',
      createdAt: new Date('2024-01-15'),
      notes: 'Express delivery'
    },
    {
      id: 'ORD-002', 
      pharmacyId: 'p1',
      warehouseId: 'w1',
      items: [],
      total: 156.30,
      status: 'pending',
      createdAt: new Date('2024-01-14'),
    },
    {
      id: 'ORD-003',
      pharmacyId: 'p1', 
      warehouseId: 'w2',
      items: [],
      total: 378.90,
      status: 'shipped',
      createdAt: new Date('2024-01-13'),
    },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      userId: 'p1',
      title: 'Sipariş Onaylandı',
      message: 'ORD-002 numaralı siparişiniz onaylandı ve hazırlanıyor.',
      type: 'success',
      isRead: false,
      createdAt: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2', 
      userId: 'p1',
      title: 'Stok Uyarısı',
      message: 'Parol 500mg stoklarında azalma tespit edildi.',
      type: 'warning',
      isRead: false,
      createdAt: new Date('2024-01-15T09:15:00'),
    },
    {
      id: '3',
      userId: 'p1',
      title: 'Yeni Ürün Eklendi',
      message: 'Merkez İlaç Deposu yeni ürünler ekledi.',
      type: 'info',
      isRead: true,
      createdAt: new Date('2024-01-14T16:45:00'),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Package className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Eczane Paneli</h1>
        <p className="text-gray-600 mt-2">Siparişlerinizi takip edin ve stok durumunu kontrol edin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bekleyen Sipariş</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aylık Harcama</p>
              <p className="text-2xl font-bold text-gray-900">₺{stats.monthlySpend.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasarruf</p>
              <p className="text-2xl font-bold text-gray-900">₺{stats.savedAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Genel Bakış' },
              { id: 'orders', label: 'Siparişlerim' },
              { id: 'notifications', label: 'Bildirimler' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Son Siparişler</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.createdAt ? new Date(order.createdAt || new Date()).toLocaleDateString('tr-TR') : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₺{order.total.toFixed(2)}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {order.status === 'pending' && 'Bekliyor'}
                          {order.status === 'approved' && 'Onaylandı'}
                          {order.status === 'shipped' && 'Kargoda'}
                          {order.status === 'delivered' && 'Teslim Edildi'}
                          {order.status === 'rejected' && 'Reddedildi'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="w-full mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Tüm Siparişleri Görüntüle
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/products')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Yeni Sipariş Ver
                </button>
                <button
                  onClick={() => router.push('/cart')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Sepeti Görüntüle
                </button>
                <button
                  onClick={() => router.push('/reports')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Raporlarım
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Tüm Siparişler</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sipariş No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.createdAt ? new Date(order.createdAt || new Date()).toLocaleDateString('tr-TR') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {order.status === 'pending' && 'Bekliyor'}
                          {order.status === 'approved' && 'Onaylandı'}
                          {order.status === 'shipped' && 'Kargoda'}
                          {order.status === 'delivered' && 'Teslim Edildi'}
                          {order.status === 'rejected' && 'Reddedildi'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">
                        Detay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className={`px-6 py-4 ${!notification.isRead ? 'bg-blue-50' : 'bg-white'}`}>
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' :
                    notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                    {notification.type === 'info' && <Package className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {notification.createdAt ? new Date(notification.createdAt || new Date()).toLocaleDateString('tr-TR') : 'N/A'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyDashboard;