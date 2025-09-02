'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

interface NearExpiryProduct {
  id: string;
  name: string;
  dosage: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  warehouseName: string;
  expiryDate: string;
  stock: number;
  image: string;
}

const NearExpiryPage: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const nearExpiryProducts: NearExpiryProduct[] = [
    {
      id: 'selvita-d3-300000',
      name: 'Selvita-D3 IM 300.000',
      dosage: 'IU/ml 1 Oral Ampul',
      originalPrice: 18.50,
      discountedPrice: 11.84,
      discountPercentage: 36,
      warehouseName: 'Merkez Depo',
      expiryDate: '2024-04-15',
      stock: 45,
      image: '/selvita-d3-image.jpg'
    },
    {
      id: 'avaxim-25-pediatrik',
      name: 'Avaxim 25 µg/0.5ml Pediatrik',
      dosage: 'Enjeksiyonluk Süspansiyon',
      originalPrice: 89.50,
      discountedPrice: 60.23,
      discountPercentage: 33,
      warehouseName: 'Sanofi Depo',
      expiryDate: '2024-05-20',
      stock: 28,
      image: '/avaxim-image.jpg'
    },
    {
      id: 'gimox-1mg-tablet',
      name: 'Gimox 1 mg 30 Tablet',
      dosage: '30 Film Tablet',
      originalPrice: 45.80,
      discountedPrice: 30.26,
      discountPercentage: 34,
      warehouseName: 'Abdi İbrahim',
      expiryDate: '2024-03-28',
      stock: 67,
      image: '/gimox-image.jpg'
    },
    {
      id: 'zefir-500mg-tablet',
      name: 'Zefir 500 mg Film Tablet',
      dosage: '10 Film Tablet',
      originalPrice: 32.40,
      discountedPrice: 21.36,
      discountPercentage: 34,
      warehouseName: 'Deva Holding',
      expiryDate: '2024-04-10',
      stock: 89,
      image: '/zefir-image.jpg'
    },
    {
      id: 'cortef-10mg-tablet',
      name: 'Cortef 10 mg Tablet',
      dosage: '30 Tablet',
      originalPrice: 52.70,
      discountedPrice: 34.28,
      discountPercentage: 35,
      warehouseName: 'Pfizer Türkiye',
      expiryDate: '2024-05-05',
      stock: 34,
      image: '/cortef-image.jpg'
    },
    {
      id: 'terbix-krem-1-tup',
      name: 'Terbix Krem %1 15 gr',
      dosage: '1 Tüp',
      originalPrice: 28.90,
      discountedPrice: 18.79,
      discountPercentage: 35,
      warehouseName: 'Biofarma',
      expiryDate: '2024-06-12',
      stock: 156,
      image: '/terbix-image.jpg'
    },
    {
      id: 'lamictal-25mg-tablet',
      name: 'Lamictal 25 mg Film Tablet',
      dosage: '56 Film Tablet',
      originalPrice: 78.60,
      discountedPrice: 51.09,
      discountPercentage: 35,
      warehouseName: 'GlaxoSmithKline',
      expiryDate: '2024-07-18',
      stock: 23,
      image: '/lamictal-image.jpg'
    },
    {
      id: 'lamictal-100mg-tablet',
      name: 'Lamictal 100 mg Film Tablet',
      dosage: '30 Film Tablet',
      originalPrice: 95.40,
      discountedPrice: 62.01,
      discountPercentage: 35,
      warehouseName: 'GlaxoSmithKline',
      expiryDate: '2024-08-25',
      stock: 41,
      image: '/lamictal-100-image.jpg'
    }
  ];

  const categories = ['Tümü', 'Tablet', 'Kapsül', 'Şurup', 'Ampul', 'Krem'];

  const filteredProducts = nearExpiryProducts.filter(product => {
    if (selectedCategory === 'Tümü') return true;
    return product.dosage.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Purple Background */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/home')}
                className="mr-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-yellow-400 text-purple-800 px-3 py-1 rounded-full text-sm font-bold mr-3">
                    📦 Yakın Miat
                  </div>
                </div>
                <h1 className="text-2xl font-bold">Yakın miat ürünleri büyük indirimlerle sizi bekliyor!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Green Badge */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Yakın miat ürünü
                  </span>
                </div>
                
                {/* Product Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">💊</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{product.name.split(' ')[0]}</div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Product Name */}
                <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3">{product.dosage}</p>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{product.discountedPrice.toFixed(2)} TL</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      %{product.discountPercentage}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 line-through">
                    Piyasa: {product.originalPrice.toFixed(2)} TL
                  </div>
                </div>

                {/* Warehouse Info */}
                <div className="text-xs text-gray-600 mb-3">
                  <div>SKT: {new Date(product.expiryDate).toLocaleDateString('tr-TR')}</div>
                  <div>{product.warehouseName}</div>
                </div>

                {/* Stock and Add Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{(product.stock || 0)} adet stokta</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            Daha Fazla Ürün Göster
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearExpiryPage;
