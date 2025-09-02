'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Download, Calendar, FileText, ChevronDown } from 'lucide-react';

const InvoicesPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Faturalarım');
  const [selectedMonth, setSelectedMonth] = useState('Temmuz 2025');

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

  const months = [
    'Ocak 2025', 'Şubat 2025', 'Mart 2025', 'Nisan 2025', 'Mayıs 2025', 
    'Haziran 2025', 'Temmuz 2025', 'Ağustos 2025', 'Eylül 2025', 'Ekim 2025', 
    'Kasım 2025', 'Aralık 2025'
  ];

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Faturalarım</h1>
          </div>

          {/* Cargo Invoices Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kargo Faturaları</h2>
            <p className="text-gray-600 mb-6">
              Ödemiş olduğunuz kargo ücretleri için kesilen aylık e-faturaları aşağıdan indirebilirsiniz.
            </p>

            {/* Month Selector */}
            <div className="mb-6">
              <div className="relative inline-block">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Kargo Faturası İndir
            </button>
          </div>

          {/* Additional Info Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Fatura Bilgileri</h3>
                <p className="text-sm text-gray-600">
                  E-faturalar her ayın ilk haftası içerisinde hazırlanır ve sisteme yüklenir. 
                  Faturalarınızı PDF formatında indirebilir ve muhasebe kayıtlarınızda kullanabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Invoice History Table */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fatura Geçmişi</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dönem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fatura Tarihi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlem
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Temmuz 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01.08.2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺245.50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Hazır
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        İndir
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Haziran 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01.07.2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺189.25
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Hazır
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        İndir
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Mayıs 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01.06.2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺312.75
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Hazır
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        İndir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
