'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { AlertTriangle, Clock, CheckCircle, HelpCircle } from 'lucide-react';

const SupportPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Aksiyon Gerekenler');

  if (!user) {
    return null;
  }

  const categories = [
    {
      name: 'Aksiyon Gerekenler',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Süreci Devam Edenler',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Sonuçlananlar',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
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
            <span>Destek Talepleri</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Aksiyon Gerekenler</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Destek Talepleri</h2>
              </div>
              <div className="p-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors mb-2 ${
                        activeCategory === category.name
                          ? `${category.bgColor} ${category.color} ${category.borderColor} border`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 mr-3 ${
                        activeCategory === category.name ? category.color : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">{activeCategory}</h1>
              </div>

              {/* Content based on active category */}
              <div className="p-6">
                {activeCategory === 'Aksiyon Gerekenler' && (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      <img 
                        src="/api/placeholder/200/150" 
                        alt="Destek İllüstrasyonu" 
                        className="mx-auto w-48 h-36 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aksiyon gereken destek talebi bulunmamaktadır.
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Yeni talepleriniz burada görünecektir.
                    </p>
                  </div>
                )}

                {activeCategory === 'Süreci Devam Edenler' && (
                  <div className="text-center py-16">
                    <Clock className="mx-auto h-16 w-16 text-blue-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Devam eden destek talebi bulunmamaktadır.
                    </h3>
                    <p className="text-gray-600 text-sm">
                      İşleme alınan talepleriniz burada görünecektir.
                    </p>
                  </div>
                )}

                {activeCategory === 'Sonuçlananlar' && (
                  <div className="text-center py-16">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Sonuçlanan destek talebi bulunmamaktadır.
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Tamamlanan talepleriniz burada görünecektir.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
