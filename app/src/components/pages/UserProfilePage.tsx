'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { User, Building, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Kullanıcı Bilgilerim');

  if (!user) {
    return null;
  }

  const tabs = [
    { name: 'Kullanıcı Bilgilerim', route: '/user-profile' },
    { name: 'Satış Panelim', route: '/sales-panel' },
    { name: 'İlanlarım', route: '/ads' },
    { name: 'Siparişlerim', route: '/orders' },
    { name: 'Beğendiklerim', route: '/likes' },
    { name: 'Cüzdanım', route: '/wallet' },
    { name: 'Hesap Hareketlerim', route: '/account-movements' },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Kullanıcı Bilgilerim</h1>
          </div>

          <div className="p-6">
            {/* Firma Bilgileri */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Firma Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı:</label>
                  <p className="text-gray-900">ciko07</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GLN Numarası:</label>
                  <p className="text-gray-900">8680001449996</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eczane Adı:</label>
                  <p className="text-gray-900">Hürriyet Eczanesi</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eczacı Adı & Soyadı:</label>
                  <p className="text-gray-900">Hikmet Düşme</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eczane Adresi:</label>
                  <p className="text-gray-900">Azadi Mah. Paşa Konağı Cad. 128/B Viranşehir/Şanlıurfa</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vergi Dairesi:</label>
                  <p className="text-gray-900">viranşehir</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vergi Numarası:</label>
                  <p className="text-gray-900">47905833548</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Otomasyon Programı:</label>
                  <p className="text-gray-900">Botanik</p>
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                İletişim Bilgilerim
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi:</label>
                  <p className="text-gray-900">hykmet_07@hotmail.com</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şirket Telefonu:</label>
                  <p className="text-gray-900">0 (554) 262 72 39</p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={() => router.push('/settings')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bilgileri Düzenle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
