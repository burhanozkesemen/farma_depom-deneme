'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Product, Order } from '@/src/types';

const WarehouseDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Mock data
  const stats = {
    totalProducts: 1250,
    totalOrders: 89,
    monthlyRevenue: 45670.25,
    activeCustomers: 156,
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Parol 500 mg 20 Tablet',
      barcode: '8699546543210',
      activeIngredient: 'Paracetamol',
      price: 12.50,
      stock: 150,
      warehouseId: 'w1',
      warehouseName: 'Merkez İlaç Deposu',
      isApproved: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Aspirin 100 mg 30 Tablet',
      barcode: '8699546543211', 
      activeIngredient: 'Acetylsalicylic Acid',
      price: 8.75,
      stock: 200,
      warehouseId: 'w1',
      warehouseName: 'Merkez İlaç Deposu',
      isApproved: false,
      createdAt: new Date(),
    },
  ];

  const orders: Order[] = [
    {
      id: 'ORD-001',
      pharmacyId: 'p1',
      warehouseId: 'w1',
      items: [],
      total: 245.80,
      status: 'pending',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'ORD-002',
      pharmacyId: 'p2',
      warehouseId: 'w1', 
      items: [],
      total: 156.30,
      status: 'approved',
      createdAt: new Date('2024-01-14'),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOrderAction = (orderId: string, action: 'approve' | 'reject') => {
    console.log(`${action} order ${orderId}`);
    // API call would go here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Depo Paneli</h1>
        <p className="text-gray-600 mt-2">Ürünlerinizi yönetin ve siparişleri takip edin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aylık Ciro</p>
              <p className="text-2xl font-bold text-gray-900">₺{stats.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktif Müşteri</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCustomers}</p>
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
              { id: 'products', label: 'Ürün Yönetimi' },
              { id: 'orders', label: 'Sipariş Yönetimi' },
              { id: 'reports', label: 'Raporlar' },
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
                {orders.slice(0, 3).map((order) => (
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
                        {order.status === 'pending' && 'Bekliyor'}
                        {order.status === 'approved' && 'Onaylandı'}
                        {order.status === 'rejected' && 'Reddedildi'}
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
                  onClick={() => setShowAddProduct(true)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Yeni Ürün Ekle
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Ürünleri Yönet
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Satış Raporları
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Ürün Yönetimi</h3>
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Ürün
            </button>
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
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
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
                {products.map((product) => (
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
                      ₺{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(product.stock || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.isApproved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.isApproved ? 'Onaylı' : 'Bekliyor'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
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

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sipariş Yönetimi</h3>
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
                {orders.map((order) => (
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
                        <Clock className="w-3 h-3 mr-1" />
                        {order.status === 'pending' && 'Bekliyor'}
                        {order.status === 'approved' && 'Onaylandı'}
                        {order.status === 'rejected' && 'Reddedildi'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.status === 'pending' && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOrderAction(order.id, 'approve')}
                            className="flex items-center text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Onayla
                          </button>
                          <button
                            onClick={() => handleOrderAction(order.id, 'reject')}
                            className="flex items-center text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reddet
                          </button>
                        </div>
                      )}
                      {order.status !== 'pending' && (
                        <button className="text-blue-600 hover:text-blue-900">
                          Detay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Satış Analizi</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bu Ay Satış</span>
                <span className="text-lg font-semibold text-gray-900">₺45,670.25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Önceki Ay</span>
                <span className="text-lg font-semibold text-gray-600">₺38,520.10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Artış Oranı</span>
                <span className="text-lg font-semibold text-green-600">+18.6%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">En Çok Satan Ürünler</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Parol 500mg</span>
                <span className="text-sm text-gray-600">156 adet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Aspirin 100mg</span>
                <span className="text-sm text-gray-600">134 adet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Voltaren Emulgel</span>
                <span className="text-sm text-gray-600">89 adet</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Yeni Ürün Ekle</h3>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ürün Adı</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ürün adını girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Barkod</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Barkod numarası"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Etken Madde</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Etken madde adı"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fiyat (₺)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stok</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddProduct(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  // Handle product creation
                  setShowAddProduct(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ürünü Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseDashboard;