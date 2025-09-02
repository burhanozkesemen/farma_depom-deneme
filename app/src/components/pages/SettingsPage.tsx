'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Settings, User, Bell, Shield, Globe, Phone, MapPin, Building, CreditCard } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Ayarlarım');
  const [formData, setFormData] = useState({
    // Kullanıcı Bilgileri
    kullaniciAdi: '',
    glnNumarasi: '',
    eczaneAdi: '',
    eczaciAdiSoyadi: '',
    eczaneAdresi: '',
    vergiDairesi: '',
    vergiNumarasi: '',
    otomasyonProgrami: '',
    // İletişim Bilgileri
    epostaAdresi: '',
    sirketTelefonu: '',
    // Şifre Değiştirme
    mevcutSifre: '',
    yeniSifre: '',
    yeniSifreTekrar: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return null;
  }

  const tabs = [
    { name: 'Kullanıcı Bilgilerim', route: '/user-profile' },
    { name: 'Satış Panelim', route: '/sales-panel' },
    { name: 'İlanlarım', route: '/ads' },
    { name: 'Siparişlerim', route: '/orders' },
    { name: 'Faturalarım', route: '/invoices' },
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

      <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ayarlarım</h1>
          <p className="mt-2 text-gray-600">Hesap ayarlarınızı yönetin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Kolon - Kullanıcı Bilgileri ve İletişim */}
          <div className="space-y-6">
            {/* Kullanıcı Bilgileri */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Kullanıcı Bilgileri</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı *</label>
                  <input
                    type="text"
                    name="kullaniciAdi"
                    value={formData.kullaniciAdi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kullanıcı adınızı girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GLN Numarası</label>
                  <input
                    type="text"
                    name="glnNumarasi"
                    value={formData.glnNumarasi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="GLN numaranızı girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eczane Adı</label>
                  <input
                    type="text"
                    name="eczaneAdi"
                    value={formData.eczaneAdi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Eczane adı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eczacı Adı & Soyadı</label>
                  <input
                    type="text"
                    name="eczaciAdiSoyadi"
                    value={formData.eczaciAdiSoyadi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Eczacı adı ve soyadı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eczane Adresi</label>
                  <input
                    type="text"
                    name="eczaneAdresi"
                    value={formData.eczaneAdresi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Eczane adresi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vergi Dairesi</label>
                  <input
                    type="text"
                    name="vergiDairesi"
                    value={formData.vergiDairesi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Vergi dairesi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vergi Numarası</label>
                  <input
                    type="text"
                    name="vergiNumarasi"
                    value={formData.vergiNumarasi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Vergi numarası"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Otomasyon Programı</label>
                  <input
                    type="text"
                    name="otomasyonProgrami"
                    value={formData.otomasyonProgrami}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Otomasyon programı"
                  />
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">İletişim Bilgileri</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
                  <input
                    type="email"
                    name="epostaAdresi"
                    value={formData.epostaAdresi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E-posta adresiniz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şirket Telefonu</label>
                  <input
                    type="tel"
                    name="sirketTelefonu"
                    value={formData.sirketTelefonu}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Şirket telefonu"
                  />
                </div>
              </div>
            </div>

            {/* Kullanıcı Bilgileri Güncelle Butonu */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 font-medium">
                  Bilgileri Güncelle
                </button>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Şifre Değiştir */}
          <div className="space-y-6">
            {/* Şifre Değiştir */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Şifre Değiştir</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label>
                  <input
                    type="password"
                    name="mevcutSifre"
                    value={formData.mevcutSifre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mevcut şifrenizi girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                  <input
                    type="password"
                    name="yeniSifre"
                    value={formData.yeniSifre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Yeni şifrenizi girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre Tekrar</label>
                  <input
                    type="password"
                    name="yeniSifreTekrar"
                    value={formData.yeniSifreTekrar}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Yeni şifrenizi tekrar girin"
                  />
                </div>
              </div>
            </div>

            {/* Şifre Değiştir Butonu */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <button className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 font-medium">
                  Şifreyi Değiştir
                </button>
              </div>
            </div>

            {/* Bilgi Mesajı */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Değiştirebileceğiniz kullanıcı bilgilerini güncellemek için lütfen 
                bizimle iletişime geçiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
