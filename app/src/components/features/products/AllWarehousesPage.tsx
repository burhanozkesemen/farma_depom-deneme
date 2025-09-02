'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, MapPin, Star, Clock, Package, Phone, Mail, Filter, Search } from 'lucide-react';

interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  rating: number;
  totalProducts: number;
  activeOrders: number;
  deliveryTime: string;
  isVerified: boolean;
  specialties: string[];
  workingHours: string;
  distance: number;
  lastOrderDate?: string;
  logo?: string;
}

const AllWarehousesPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const warehouses: Warehouse[] = [
    {
      id: '1',
      name: 'Merkez İlaç Deposu',
      address: 'Merkez Mah. Sanayi Cad. No:45',
      city: 'İstanbul',
      phone: '+90 212 555 0101',
      email: 'info@merkezilac.com',
      rating: 4.8,
      totalProducts: 1250,
      activeOrders: 23,
      deliveryTime: '2-4 saat',
      isVerified: true,
      specialties: ['Antibiyotik', 'Analjezik', 'Vitamin'],
      workingHours: '08:00 - 18:00',
      distance: 2.5,
      lastOrderDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Anadolu Eczacılık Deposu',
      address: 'Çankaya Mah. İstanbul Cad. No:127',
      city: 'Ankara',
      phone: '+90 312 555 0202',
      email: 'siparis@anadolueczacilik.com',
      rating: 4.6,
      totalProducts: 980,
      activeOrders: 18,
      deliveryTime: '4-6 saat',
      isVerified: true,
      specialties: ['Kardiyoloji', 'Diyabet', 'Hipertansiyon'],
      workingHours: '09:00 - 17:00',
      distance: 12.8,
    },
    {
      id: '3',
      name: 'Ege Sağlık Deposu',
      address: 'Alsancak Mah. Kordon Cad. No:89',
      city: 'İzmir',
      phone: '+90 232 555 0303',
      email: 'destek@egesaglik.com',
      rating: 4.7,
      totalProducts: 1150,
      activeOrders: 31,
      deliveryTime: '3-5 saat',
      isVerified: true,
      specialties: ['Onkoloji', 'Nöroloji', 'Gastroenteroloji'],
      workingHours: '08:30 - 17:30',
      distance: 7.2,
      lastOrderDate: '2024-01-12',
    },
    {
      id: '4',
      name: 'Marmara İlaç Merkezi',
      address: 'Osmangazi Mah. Atatürk Cad. No:234',
      city: 'Bursa',
      phone: '+90 224 555 0404',
      email: 'info@marmarailac.com',
      rating: 4.4,
      totalProducts: 850,
      activeOrders: 15,
      deliveryTime: '5-7 saat',
      isVerified: true,
      specialties: ['Pediatri', 'Jinekoloji', 'Ortopedi'],
      workingHours: '08:00 - 16:00',
      distance: 18.5,
    },
    {
      id: '5',
      name: 'Karadeniz İlaç Deposu',
      address: 'Merkez Mah. Sahil Yolu No:67',
      city: 'Trabzon',
      phone: '+90 462 555 0505',
      email: 'satis@karadenizilac.com',
      rating: 4.5,
      totalProducts: 720,
      activeOrders: 12,
      deliveryTime: '6-8 saat',
      isVerified: false,
      specialties: ['Dermatoloji', 'Göz Hastalıkları', 'KBB'],
      workingHours: '09:00 - 18:00',
      distance: 25.3,
      lastOrderDate: '2024-01-10',
    },
    {
      id: '6',
      name: 'Doğu Anadolu Eczacılık',
      address: 'Yakutiye Mah. Cumhuriyet Cad. No:156',
      city: 'Erzurum',
      phone: '+90 442 555 0606',
      email: 'info@doguanadoluec.com',
      rating: 4.3,
      totalProducts: 650,
      activeOrders: 8,
      deliveryTime: '8-12 saat',
      isVerified: true,
      specialties: ['Psikiyatri', 'Endokrinoloji', 'Üroloji'],
      workingHours: '08:00 - 17:00',
      distance: 45.7,
    },
  ];

  const cities = Array.from(new Set(warehouses.map(w => w.city))).sort();
  const specialties = Array.from(new Set(warehouses.flatMap(w => w.specialties))).sort();

  const filteredWarehouses = warehouses
    .filter(warehouse => {
      const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          warehouse.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === 'all' || warehouse.city === selectedCity;
      const matchesSpecialty = selectedSpecialty === 'all' || warehouse.specialties.includes(selectedSpecialty);
      
      return matchesSearch && matchesCity && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        case 'products':
          return b.totalProducts - a.totalProducts;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tüm Depolar</h1>
                <p className="text-gray-600 mt-1">Anlaşmalı depolarımızı keşfedin ve sipariş verin</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">{warehouses.length} Depo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtreler</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arama
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Depo adı veya şehir..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şehir
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tüm Şehirler</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uzmanlık
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tüm Uzmanlıklar</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıralama
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="rating">Değerlendirme</option>
                <option value="distance">Mesafe</option>
                <option value="products">Ürün Sayısı</option>
                <option value="name">Alfabetik</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {filteredWarehouses.length} depo bulundu
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWarehouses.map((warehouse) => (
            <div 
              key={warehouse.id} 
              onClick={() => router.push(`/warehouse/${warehouse.id}`)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                        {warehouse.isVerified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Onaylı
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{warehouse.rating}</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-sm text-gray-600">{warehouse.distance} km</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start mb-4">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-900">{warehouse.address}</p>
                    <p className="text-sm text-gray-600">{warehouse.city}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{warehouse.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{warehouse.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{warehouse.totalProducts}</div>
                    <div className="text-xs text-gray-600">Ürün</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{warehouse.activeOrders}</div>
                    <div className="text-xs text-gray-600">Aktif Sipariş</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{warehouse.deliveryTime}</div>
                    <div className="text-xs text-gray-600">Teslimat</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanları:</p>
                  <div className="flex flex-wrap gap-2">
                    {warehouse.specialties.slice(0, 3).map((specialty) => (
                      <span key={specialty} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                    {warehouse.specialties.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{warehouse.specialties.length - 3} daha
                      </span>
                    )}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-center mb-4">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Çalışma Saatleri: {warehouse.workingHours}</span>
                </div>

                {/* Last Order */}
                {warehouse.lastOrderDate && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">
                      Son sipariş: {new Date(warehouse.lastOrderDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <div className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-center">
                    Ürünleri Görüntüle
                  </div>
                  <div className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg">
                    İletişim
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
            Daha Fazla Göster
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllWarehousesPage;
