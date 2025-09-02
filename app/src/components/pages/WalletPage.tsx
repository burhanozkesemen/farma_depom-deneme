'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, ChevronDown, ToggleLeft, Receipt, HelpCircle } from 'lucide-react';

const WalletPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Cüzdanım');
  const [showTransactions, setShowTransactions] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [isEarningsTransferEnabled, setIsEarningsTransferEnabled] = useState(false);

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

  const mockTransactions = [
    {
      date: '10.04.2025',
      time: '17:43',
      type: 'Cüzdan Harcaması',
      code: 'B765884C',
      detail: '2 farklı satıcı',
      amount: '- 24,99 TL',
      balance: '0,00 TL',
      isNegative: true
    },
    {
      date: '09.04.2025',
      time: '18:03',
      type: 'Cüzdan Harcaması',
      code: '1CBFFFB0',
      detail: 'eczhazar',
      amount: '- 269,99 TL',
      balance: '+ 24,99 TL',
      isNegative: true
    },
    {
      date: '09.04.2025',
      time: '18:02',
      type: 'Cüzdana İade',
      code: 'A124CBAE',
      detail: 'ecza.onur',
      amount: '+ 294,99 TL',
      balance: '+ 294,98 TL',
      isNegative: false
    },
    {
      date: '28.01.2025',
      time: '17:41',
      type: 'Cüzdan Harcaması',
      code: '871B1519',
      detail: 'eczgizemecz',
      amount: '- 199,99 TL',
      balance: '-0,01 TL',
      isNegative: true
    }
  ];

  const faqData = [
    {
      question: "Cüzdan nedir?",
      answer: "Cüzdan, FarmaDepom platformunda kazanclarınızı saklayabileceğiniz ve alışverişlerinizde kullanabileceğiniz dijital bir ödeme aracıdır."
    },
    {
      question: "Cüzdan nasıl oluşur?",
      answer: "Satış yaptığınızda kazanclarınızı otomatik olarak cüzdanınıza aktarılır. Ayrıca banka hesabınızdan da para yükleyebilirsiniz."
    },
    {
      question: "Cüzdanımı kullanmaya nasıl başlayabilirim?",
      answer: "Satış yapmaya başladığınızda kazanclarınızı cüzdanınıza yansır. 'Kazancım Cüzdanıma Aktarılsın' seçeneğini aktifleştirerek otomatik transfer sağlayabilirsiniz."
    },
    {
      question: "Cüzdanımdaki bakiyeyi nasıl kullanabilirim?",
      answer: "Cüzdan bakiyenizi FarmaDepom'dan alışveriş yaparken ödeme yöntemi olarak seçebilir ve anında kullanabilirsiniz."
    },
    {
      question: "Cüzdanımdaki bakiyeyi hesabıma aktarabilir miyim?",
      answer: "Evet, cüzdan bakiyenizi 'Hesabına Aktar' bölümünden banka hesabınıza transfer edebilirsiniz. Transfer işlemi 1-2 iş günü içinde gerçekleşir."
    },
    {
      question: "Cüzdanımızdaki bakiyenin ne kadarını hesabıma aktarabilirim?",
      answer: "Minimum 10 TL olmak üzere cüzdan bakiyenizin tamamını banka hesabınıza aktarabilirsiniz. Transfer ücreti yoktur."
    },
    {
      question: "Cüzdanımdaki bakiye daha sonra kartıma aktarılabilir mi?",
      answer: "Hayır, cüzdan bakiyesi sadece banka hesabınıza aktarılabilir. Kredi kartına doğrudan transfer yapılamaz."
    },
    {
      question: "Cüzdanıma banka hesabımdan para yükleyebilir miyim?",
      answer: "Şu anda bu özellik aktif değildir. Cüzdan bakiyesi sadece satış kazanclarınızı oluşmaktadır."
    },
    {
      question: "Cüzdanımla yaptığım bir ödemenin iadesini kartıma gönderebilir miyim?",
      answer: "Cüzdanla yapılan ödemelerin iadesi yine cüzdanınıza yapılır. İade tutarını daha sonra banka hesabınıza aktarabilirsiniz."
    }
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

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Cüzdanım</h1>
          </div>

          {/* Main Wallet Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              {/* Character Illustration */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="text-2xl">👨‍⚕️</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Wallet className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Cüzdan Bakiyem</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">0,00 TL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            {/* Earnings Transfer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ToggleLeft className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Kazancım Cüzdanıma Aktarılsın</h3>
                    <p className="text-sm text-gray-500">kazanclarını cüzdanınıza aktarıp FarmaDepom alışverişlerinizde anında kullanmaya başlayabilirsiniz.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEarningsTransferEnabled(!isEarningsTransferEnabled)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                    isEarningsTransferEnabled ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${
                    isEarningsTransferEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowTransactions(!showTransactions)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Receipt className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Cüzdan Hareketlerini Gör</h3>
                    <p className="text-sm text-gray-500">Yaptığınız işlemlerin detaylarına bu alandan ulaşabilirsiniz.</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showTransactions ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Expandable Transactions Table */}
              {showTransactions && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem Detayı</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem Tutarı</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem Sonrası Bakiye</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockTransactions.map((transaction, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{transaction.date}</div>
                              <div className="text-sm text-gray-500">{transaction.time}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{transaction.type}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-600 font-medium">{transaction.code}</div>
                              <div className="text-sm text-gray-500">{transaction.detail}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${transaction.isNegative ? 'text-red-600' : 'text-green-600'}`}>
                                {transaction.amount}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{transaction.balance}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bank Transfer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowBankTransfer(!showBankTransfer)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <ArrowDownLeft className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Hesabına Aktar</h3>
                    <p className="text-sm text-gray-500">Satışlarınızdan elde ettiğiniz kazancların banka hesabınıza aktarabilirsiniz.</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showBankTransfer ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Expandable Bank Transfer Form */}
              {showBankTransfer && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-4">
                    {/* Available Balance */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Hesabınıza Aktarabileceğiniz Tutar</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-purple-600">0,00 TL</span>
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">?</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Holder */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Adınız Soyadınız</h4>
                      <p className="text-gray-900 font-medium">Hikmet Düşme</p>
                    </div>

                    {/* Bank Account */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Banka Hesabınız</h4>
                      <p className="text-gray-900 font-bold">TR87 0001 0002 8547 9152 8650 02</p>
                    </div>

                    {/* Transfer Amount */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Aktarmak İstediğiniz Tutar</h4>
                      <input
                        type="text"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="Örn : 500"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Transfer Button */}
                    <div className="pt-2">
                      <button 
                        className="bg-gray-300 text-gray-500 px-6 py-2 rounded-md font-medium cursor-not-allowed"
                        disabled
                      >
                        Hesabına Aktar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowFAQ(!showFAQ)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Sıkça Sorulan Sorular</h3>
                    <p className="text-sm text-gray-500">Bu alanda Cüzdan'a dair tüm sorularınızın cevaplarını bulabilirsiniz.</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showFAQ ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Expandable FAQ Content */}
              {showFAQ && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-4">
                    {faqData.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between py-3 cursor-pointer">
                          <h4 className="font-medium text-gray-900">{faq.question}</h4>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Why Use Wallet Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Neden Cüzdan Kullanmalısınız ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Orange Card */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Satış kazancınızı anında nakde çevirin!</h3>
                <p className="text-sm opacity-90">Eczane satışlarınızdan elde ettiğiniz geliri beklemeden hemen cüzdanınızda kullanmaya başlayın.</p>
              </div>

              {/* Teal Card */}
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Finansal özgürlüğünüzü keşfedin!</h3>
                <p className="text-sm opacity-90">Banka kartı limitleri ve onay süreçleri olmadan özgürce alışveriş yapın.</p>
              </div>

              {/* Indigo Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Özel fırsatlar ve cashback kazanın!</h3>
                <p className="text-sm opacity-90">Cüzdan kullanıcılarına özel indirimler, erken erişim ve geri ödeme kampanyalarından yararlanın.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
