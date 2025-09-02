'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Bell, Filter, Search } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('İşlem Bekleyenler');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  if (!user) {
    return null;
  }

  const filters = [
    'İşlem Bekleyenler',
    'Uyarılar', 
    'Güncellemeler',
    'Hızlı Filtreler',
    'Yeni sipariş',
    'Sipariş onayı',
    'Sipariş değişikliği',
    'Kampanya',
    'Fatura',
    'Acil sipariş',
    'Farmazon Plus'
  ];

  const notifications = [
    {
      id: 1,
      type: 'Sipariş değişikliği',
      message: 'Satıcı stok yetersizliği sebebiyle siparişinizdeki bazı ürünlerin adedlerini değiştirdi. Değişikliği onaylamak için tıklayın.',
      time: '15 Eki - 15:28',
      unread: true
    },
    {
      id: 2,
      type: 'Sipariş değişikliği', 
      message: 'Satıcı stok yetersizliği sebebiyle siparişinizdeki bazı ürünlerin adedlerini değiştirdi. Değişikliği onaylamak için tıklayın.',
      time: '13 Eki - 09:38',
      unread: true
    },
    {
      id: 3,
      type: 'Sipariş değişikliği',
      message: 'Satıcı stok yetersizliği sebebiyle siparişinizdeki bazı ürünlerin adedlerini değiştirdi. Değişikliği onaylamak için tıklayın.',
      time: '7 Eki - 14:47',
      unread: false
    },
    {
      id: 4,
      type: 'Sipariş değişikliği',
      message: 'Satıcı stok yetersizliği sebebiyle siparişinizdeki bazı ürünlerin adedlerini değiştirdi. Değişikliği onaylamak için tıklayın.',
      time: '5 Tem - 12:01',
      unread: false
    },
    {
      id: 5,
      type: 'Sipariş değişikliği',
      message: 'Satıcı stok yetersizliği sebebiyle siparişinizdeki bazı ürünlerin adedlerini değiştirdi.',
      time: '04 Mar - 09:11',
      unread: false
    },
    {
      id: 6,
      type: 'Sipariş değişikliği',
      message: 'Satıcı stok yetersizliği sebebiyle siparişinizdeki bazı ürünlerin adedlerini değiştirdi.',
      time: '02 Mar - 17:27',
      unread: false
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span>Anasayfa</span>
            <span className="mx-2">›</span>
            <span>Profil</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Bildirimlerim</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Bildirimlerim</h1>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    checked={showOnlyUnread}
                    onChange={(e) => setShowOnlyUnread(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" 
                  />
                  Sadece okunmayanlar
                </label>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Hızlı Filtreler:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {notification.type}
                      </span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-sm ${notification.unread ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if no notifications) */}
          {notifications.length === 0 && (
            <div className="p-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz bildirim yok</h3>
              <p className="mt-1 text-sm text-gray-500">Yeni bildirimler burada görünecek.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
