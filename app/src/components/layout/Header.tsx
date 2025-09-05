'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, ShoppingCart, Bell, User, Menu, X, Tag, Clock, Building2, Shield, Grid3X3 } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { useCart } from '@/src/context/CartContext';

const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handActive = (searchParams?.get('hand') === '1' || searchParams?.get('hand') === 'true');
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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FD</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FarmaDepom</span>
          </div>

          {/* Search Bar */}
          {user && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

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
                {getNavItems().map(item => (
                  <button
                    key={item.id}
                    onClick={() => router.push(`/${item.id === 'home' ? '' : item.id}`)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Cart */}
                {user.role === 'pharmacy' && (
                  <button
                    onClick={() => router.push('/cart')}
                    className="relative p-2 text-gray-600 hover:text-gray-900"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {getItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getItemCount()}
                      </span>
                    )}
                  </button>
                )}

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm">{user.companyName}</span>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.companyName}</p>
                        <p className="text-sm text-gray-500">{getRoleDisplayName(user.role)}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            router.push('/profile');
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Profil Ayarları
                        </button>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Special Categories for Pharmacy Users */}
        {user && user.role === 'pharmacy' && (
          <div className="border-t border-gray-200 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => router.push('/affordable-prices')}
                className="flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm"
              >
                <Tag className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Uygun Fiyat</span>
              </button>
              
              <button
                onClick={() => router.push('/near-expiry')}
                className="flex items-center px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-all text-sm"
              >
                <Clock className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Yakın Miat</span>
              </button>
              
              <button
                onClick={() => router.push('/all-warehouses')}
                className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
              >
                <Building2 className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Tüm Depolar</span>
              </button>
              
              <button
                onClick={() => router.push('/medicine-categories?hand=1')}
                className="flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all text-sm"
              >
                <Shield className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Elden Satılan</span>
              </button>
              
              <button
                onClick={() => {
                  // Always go to clean categories without any special filters
                  router.push('/medicine-categories');
                }}
                className="flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all text-sm"
              >
                <Grid3X3 className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Kategoriler</span>
              </button>
            </div>
          </div>
        )}

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