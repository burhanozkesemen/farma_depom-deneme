'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Filter, Star } from 'lucide-react';

interface OTCMedicine {
  id: string;
  name: string;
  activeIngredient: string;
  price: number;
  warehouseName: string;
  stock: number;
  rating: number;
  isPopular: boolean;
}

const OTCMedicinesPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const medicines: OTCMedicine[] = [
    {
      id: '1',
      name: 'Aspirin 500mg',
      activeIngredient: 'Asetilsalisilik Asit',
      price: 12.50,
      warehouseName: 'Merkez İlaç Deposu',
      stock: 250,
      rating: 4.6,
      isPopular: true,
    },
    {
      id: '2',
      name: 'Parol 500mg', 
      activeIngredient: 'Parasetamol',
      price: 8.75,
      warehouseName: 'Anadolu Eczacılık',
      stock: 180,
      rating: 4.8,
      isPopular: true,
    },
    {
      id: '3',
      name: 'Voltaren Gel',
      activeIngredient: 'Diklofenak',
      price: 32.80,
      warehouseName: 'Ege Sağlık Deposu',
      stock: 75,
      rating: 4.7,
      isPopular: false,
    }
  ];

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Elden Satılan İlaçlar</h1>
                <p className="text-gray-600 mt-1">Reçetesiz satılan ilaçlar ve sağlık ürünleri</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-green-600">Reçetesiz</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Arama</h3>
          </div>
          <input
            type="text"
            placeholder="İlaç adı veya etken madde..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {medicine.isPopular && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    POPÜLER
                  </span>
                </div>
              )}

              <div className="relative w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">
                      {medicine.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">İlaç Görseli</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{medicine.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{medicine.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{medicine.activeIngredient}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Stok: {medicine.stock}</span>
                  <span className="text-xs">{medicine.warehouseName}</span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ₺{medicine.price.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTCMedicinesPage;
