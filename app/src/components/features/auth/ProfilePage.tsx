'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  CreditCard,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Shield,
  ShoppingBag,
  FileText,
  Lock,
  LogOut
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: user?.companyName || '',
    email: user?.email || '',
    phone: '0212 123 45 67',
    address: 'Maslak Mahallesi, Bilim Sokak No:15, 34485 Sarıyer/İstanbul',
    taxId: '1234567890',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
      alert('Profil bilgileriniz başarıyla güncellendi!');
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { id: 'profile', name: 'Kullanıcı Bilgilerim', icon: User },
    { id: 'orders', name: 'Siparişlerim', icon: ShoppingBag },
    { id: 'invoices', name: 'Kayıtlı Kartlarım', icon: CreditCard },
    { id: 'bills', name: 'Faturalarım', icon: FileText },
    { id: 'security', name: 'Şifre Güncelle', icon: Lock },
    { id: 'logout', name: 'Güvenli Çıkış Yap', icon: LogOut },
  ];

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Sidebar Menu */}
          <div className="w-80 bg-white shadow-sm min-h-screen">
            <div className="p-6">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.companyName || 'Test Eczanesi'}</h2>
                <p className="text-gray-600 text-sm">Eczane</p>
                <p className="text-gray-500 text-sm">{user?.email || 'test@eczane.com'}</p>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.id === 'logout' ? handleLogout() : setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
              {/* Content Header */}
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'profile' && 'Kullanıcı Bilgilerim'}
                  {activeTab === 'orders' && 'Siparişlerim'}
                  {activeTab === 'invoices' && 'Kayıtlı Kartlarım'}
                  {activeTab === 'bills' && 'Faturalarım'}
                  {activeTab === 'security' && 'Şifre Güncelle'}
                </h1>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şirket Adı
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta Adresi
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vergi Numarası
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="taxId"
                            value={formData.taxId}
                            onChange={handleInputChange}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                          name="address"
                          rows={3}
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === 'orders' && (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz sipariş yok</h3>
                    <p className="text-gray-500">İlk siparişinizi vermek için ürün kataloğuna göz atın.</p>
                  </div>
                )}

                {activeTab === 'invoices' && (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Kayıtlı kart yok</h3>
                    <p className="text-gray-500">Ödeme işlemlerinizi hızlandırmak için kart bilgilerinizi kaydedin.</p>
                  </div>
                )}

                {activeTab === 'bills' && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Fatura bulunamadı</h3>
                    <p className="text-gray-500">Geçmiş faturalarınız burada görüntülenecek.</p>
                  </div>
                )}

                {activeTab === 'security' && (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-yellow-800">Güvenlik Uyarısı</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            Şifrenizi düzenli olarak değiştirmeniz hesabınızın güvenliği için önemlidir.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mevcut Şifre
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yeni Şifre
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yeni Şifre Tekrar
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? 'Kaydediliyor...' : 'Şifreyi Güncelle'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
