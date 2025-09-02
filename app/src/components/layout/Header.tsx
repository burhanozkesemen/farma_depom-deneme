'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Bell, User, Menu, X, Tag, Clock, Building2, Shield, CreditCard, MessageSquare, AlertTriangle, Wallet } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { useCart } from '@/src/context/CartContext';

const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'pharmacy': return 'Eczane';
      case 'warehouse': return 'Depo';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  const getNavItems = () => {
    if (!user) return [];
    
    const baseItems = [
      { id: 'products', label: 'Ürünler', roles: ['pharmacy', 'warehouse'] },
      { id: 'dashboard', label: 'Panel', roles: ['pharmacy', 'warehouse', 'admin'] },
    ];

    if (user.role === 'admin') {
      baseItems.push({ id: 'admin', label: 'Yönetim', roles: ['admin'] });
    }

    return baseItems.filter(item => item.roles.includes(user.role));
  };

  return (
    <header className="bg-purple-600 shadow-sm border-b border-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <span className="text-xl font-bold text-white">FarmaDepom</span>
            </div>

            {/* Search Bar */}
            {user && (
              <div className="hidden md:flex max-w-sm ml-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Ürün adı, barkod, marka veya üye ara"
                  className="w-full pl-10 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">
                  Ara
                </button>
              </div>
            </div>
          )}

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <button
                  onClick={() => router.push('/login')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Üye Ol
                </button>
              </>
            ) : (
              <>

                {/* Ücretsiz İlan Ekle Button */}
                <button 
                  onClick={() => router.push('/ads')}
                  className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600"
                >
                  Ücretsiz İlan Ekle
                </button>

                {/* User Profile Section */}
                <div className="flex items-center space-x-2">
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-white hover:text-gray-200"
                    >
                      <span className="text-sm font-medium">Ecz. Hikmet Düşme</span>
                      <User className="w-5 h-5" />
                    </button>
                    
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-700">E</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">nick</span>
                          </div>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/user-profile');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            👤 Kullanıcı Bilgilerim
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/sales-panel');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            📊 Satış Panelim
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/ads');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            📢 İlanlarım
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/orders');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            📦 Siparişlerim
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/invoices');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            🧾 Faturalarım
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/wallet');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            💰 Cüzdanım
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/account-movements');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            📈 Hesap Hareketlerim
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              router.push('/settings');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            ⚙️ Ayarlarım
                          </button>
                          <div className="border-t border-gray-200 mt-2 pt-2">
                            <button
                              onClick={logout}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Güvenli Çıkış Yap
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Icons */}
                  <div className="flex items-center space-x-3">

                  <button 
                    onClick={() => router.push('/wallet')}
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                      <Wallet className="w-5 h-5" />
                    </button>

                    <button 
                      onClick={() => router.push('/messages')}
                      className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                 
                    <button 
                      onClick={() => router.push('/notifications')}
                      className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => router.push('/support')}
                      className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                      <AlertTriangle className="w-5 h-5" />
                    </button>
                    {/* Cart */}
                    {user.role === 'pharmacy' && (
                      <button
                        onClick={() => router.push('/cart')}
                        className="relative w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {getItemCount() > 0 && (
                          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {getItemCount()}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-gray-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {!user ? (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    router.push('/login');
                    setIsMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => {
                    router.push('/register');
                    setIsMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-3"
                >
                  Üye Ol
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                {getNavItems().map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(`/${item.id === 'home' ? '' : item.id}`);
                      setIsMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 rounded-md text-gray-600 hover:text-gray-900"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;