'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Tag, Clock, Building2, Shield } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

const CategoryNavbar: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user || user.role !== 'pharmacy') {
    return null;
  }

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => router.push('/affordable-prices')}
            className="flex items-center text-green-700 hover:text-green-800 transition-all text-sm font-medium"
          >
            <Tag className="w-4 h-4 mr-1.5" />
            <span>Uygun Fiyat</span>
          </button>
          
          <button
            onClick={() => router.push('/near-expiry')}
            className="flex items-center text-orange-700 hover:text-orange-800 transition-all text-sm font-medium"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            <span>Yakın Miat</span>
          </button>
          
          <button
            onClick={() => router.push('/all-warehouses')}
            className="flex items-center text-blue-700 hover:text-blue-800 transition-all text-sm font-medium"
          >
            <Building2 className="w-4 h-4 mr-1.5" />
            <span>Tüm Depolar</span>
          </button>
          
          <button
            onClick={() => router.push('/otc-medicines')}
            className="flex items-center text-purple-700 hover:text-purple-800 transition-all text-sm font-medium"
          >
            <Shield className="w-4 h-4 mr-1.5" />
            <span>Elden Satılan</span>
          </button>
          
          <button
            onClick={() => router.push('/medicine-categories')}
            className="flex items-center text-indigo-700 hover:text-indigo-800 transition-all text-sm font-medium"
          >
            <span>Kategoriler</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
