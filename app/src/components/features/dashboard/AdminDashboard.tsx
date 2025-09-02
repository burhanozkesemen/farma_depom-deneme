'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Bell
} from 'lucide-react';
import { User, Product, Order } from '@/src/types';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalUsers: 1256,
    pendingApprovals: 23,
    totalProducts: 15670,
    totalOrders: 3245,
  };

  const pendingUsers: User[] = [
    {
      id: '1',
      email: 'yenieczane@example.com',
      role: 'pharmacy',
      companyName: 'Yeni Şifa Eczanesi',
      taxId: '1234567890',
      address: 'İstanbul, Türkiye',
      phone: '+90 555 123 4567',
      isVerified: false,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      email: 'yenidepo@example.com',
      role: 'warehouse',
      companyName: 'Yeni İlaç Deposu Ltd.',
      taxId: '0987654321',
      address: 'Ankara, Türkiye',
      phone: '+90 555 987 6543',
      isVerified: false,
      createdAt: new Date('2024-01-14'),
    },
  ];

  const pendingProducts: Product[] = [
    {
      id: '1',
      name: 'Yeni İlaç 50mg',
      barcode: '8699999999999',
      activeIngredient: 'Test Molecule',
      price: 25.00,
      stock: 100,
      warehouseId: 'w1',
      warehouseName: 'Test Depo',
      isApproved: false,
      createdAt: new Date('2024-01-15'),
    },
  ];

  const handleUserAction = (userId: string, action: 'approve' | 'reject') => {
    console.log(`${action} user ${userId}`);
    // API call would go here
  };

  const handleProductAction = (productId: string, action: 'approve' | 'reject') => {
    console.log(`${action} product ${productId}`);
    // API call would go here
  };

  const sendNotification = () => {
    console.log('Send notification to all users');
    // API call would go here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Yönetici Paneli</h1>
        <p className="text-gray-600 mt-2">Platform genelini yönetin ve denetleyin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bekleyen Onay</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
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
              { id: 'users', label: 'Kullanıcı Yönetimi' },
              { id: 'products', label: 'Ürün Onaylama' },
              { id: 'notifications', label: 'Bildirimler' },
              { id: 'settings', label: 'Ayarlar' },
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
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Yeni eczane onaylandı</p>
                    <p className="text-xs text-gray-500">2 saat önce</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">15 yeni ürün eklendi</p>
                    <p className="text-xs text-gray-500">4 saat önce</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Ürün onayı bekliyor</p>
                    <p className="text-xs text-gray-500">6 saat önce</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Platform İstatistikleri</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Eczane Sayısı</span>
                  <span className="text-lg font-semibold text-gray-900">856</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Depo Sayısı</span>
                  <span className="text-lg font-semibold text-gray-900">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aktif Ürün</span>
                  <span className="text-lg font-semibold text-gray-900">15,670</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aylık İşlem Hacmi</span>
                  <span className="text-lg font-semibold text-green-600">₺2.4M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Onay Bekleyen Kullanıcılar</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Firma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E-posta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VKN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{user.companyName}</p>
                      <p className="text-sm text-gray-600">{user.address}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'pharmacy' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'pharmacy' ? 'Eczane' : 'Depo'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.taxId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.createdAt ? user.createdAt ? new Date(user.createdAt || new Date()).toLocaleDateString('tr-TR') : 'N/A' : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'reject')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Onay Bekleyen Ürünler</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barkod
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Depo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.activeIngredient}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.barcode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.warehouseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.createdAt ? new Date(product.createdAt || new Date()).toLocaleDateString('tr-TR') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleProductAction(product.id, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleProductAction(product.id, 'reject')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
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
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Toplu Bildirim Gönder</h3>
            <button
              onClick={sendNotification}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Bell className="w-4 h-4 mr-2" />
              Gönder
            </button>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Başlık</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bildirim başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mesaj</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bildirim mesajı..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hedef Kitle</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">Tüm Kullanıcılar</option>
                  <option value="pharmacies">Sadece Eczaneler</option>
                  <option value="warehouses">Sadece Depolar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tip</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="info">Bilgi</option>
                  <option value="warning">Uyarı</option>
                  <option value="success">Başarı</option>
                  <option value="error">Hata</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Platform Ayarları</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Otomatik Onay</p>
                  <p className="text-sm text-gray-600">Yeni ürünleri otomatik onayla</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">E-posta Bildirimleri</p>
                  <p className="text-sm text-gray-600">Yönetici bildirimlerini e-posta ile gönder</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Bildirimleri</p>
                  <p className="text-sm text-gray-600">Kritik işlemler için SMS gönder</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Güvenlik</h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sistem Günlüklerini Görüntüle</p>
                    <p className="text-sm text-gray-600">Güvenlik olaylarını inceleyin</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Admin Şifresini Değiştir</p>
                    <p className="text-sm text-gray-600">Güvenlik için düzenli şifre değiştirin</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;