'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Clock, Users, Search, TrendingUp, CheckCircle, ShoppingCart, Package, DollarSign, ChevronLeft, ChevronRight, Star, Eye, Compass, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Footer from '../layout/Footer';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Mock data for logged-in users
  const stats = {
    totalOrders: 47,
    pendingOrders: 3,
    monthlySpend: 12450.50,
    savedAmount: 890.25,
  };

  // If user is not logged in, show welcome page
  if (!user) {
    return (
      <div className="min-h-screen">
        {/* Hero Section with Pharmacy Background */}
        <div className="relative min-h-[80vh] md:min-h-[92vh] overflow-hidden">
          {/* Pharmacy Background Image - single image + subtle black overlay */}
          <div className="absolute inset-0">
            <div className="w-full h-full relative">
              <div
                className="absolute inset-0 bg-[url('/images/hero-pharmacy.jpg')] bg-cover bg-center md:bg-[position:60%_center]"
                aria-hidden="true"
              ></div>
              {/* slightly darker overlay (fixed) */}
              <div className="absolute inset-0 bg-black/70 md:bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>
            </div>
          </div>
          
          {/* Header */}
          <div className="relative z-10">
            <div className="flex justify-between items-center px-6 py-6 md:px-12">
              <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm tracking-wide">
                FarmaDepom
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => router.push('/register')}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors shadow-sm border border-white/30 backdrop-blur-sm font-medium"
                >
                  Üye Ol
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md font-medium"
                >
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 flex items-center min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left side - empty for pharmacy image effect */}
              <div className="hidden lg:block">
                {/* This space represents the pharmacist in the image */}
              </div>
              
              {/* Right side - Content */}
              <div className="text-right">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
                  Eczanelerin ve İlaç Depolarının
                  <br />
                  <span className="text-green-500">Pazaryeri!</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Türkiye’deki bütün ilaç depolarıyla kolayca alışveriş yapın, karlılığınızı arttırın!
                </p>
                
                {/* Input and Button */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <input 
                    type="text"
                    placeholder="GLN Numaranızı Yazın"
                    className="px-5 py-3 rounded-full bg-white/15 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500/60 shadow-sm"
                  />
                  <button 
                    onClick={() => router.push('/register')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors whitespace-nowrap shadow-md"
                  >
                    Hemen Üye Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medicine Showcase Section removed */}

        {/* Features Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Neden FarmaDepom?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                İlaç tedarik sürecinizi dijitalleştirin, maliyetlerinizi düşürün, verimliliğinizi artırın.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Güvenli Platform</h3>
                <p className="text-gray-600">
                  SSL şifreleme ve güvenli ödeme sistemleri ile verileriniz tamamen korunur.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı Teslimat</h3>
                <p className="text-gray-600">
                  Aynı gün kargo seçeneği ile acil ihtiyaçlarınızı karşılayın.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Uygun Fiyatlar</h3>
                <p className="text-gray-600">
                  Rekabetçi fiyatlar ve özel indirimlerle maliyetlerinizi optimize edin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section removed */}

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // If user is logged in and is a pharmacy, show the dashboard
  if (user && user.role === 'pharmacy') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700">
        {/* Main Hero Banner - Reklam Tarzı */}
        <div className="relative">
          {/* Ana Banner Container */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Navigation Pills */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold">
                  Haftanın Fırsatı Depoları
                </button>
                <button className="bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Haftanın Fırsatları
                </button>
                <button className="bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                  FarmaDepom'i Tanıyın
                </button>
                <button className="bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Vade Farkısız Taksit Kampanyaları
                </button>
              </div>

              {/* Ana Reklam Banner */}
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl shadow-2xl overflow-hidden">
                {/* Sol Navigasyon */}
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all">
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                {/* Sağ Navigasyon */}
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all">
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Banner İçeriği */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
                  {/* Sol Taraf - Metin ve CTA */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-blue-100 mb-2">
                        Arel <span className="text-white">satıcısı'nın</span>
                      </h2>
                      <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Seçkin İlaç Portföyünü Şimdi İnceleyin!
                      </h1>
                      <p className="text-xl text-blue-100 mb-6">
                        Eczaneniz için özel olarak seçilmiş ilaçlar, 
                        şimdi <span className="text-yellow-300 font-semibold">FarmaDepom</span>'te!
                      </p>
                    </div>
                    <button 
                      onClick={() => router.push('/')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      Mağazaya Git
                    </button>
                  </div>

                  {/* Sağ Taraf - İlaç Görselleri */}
                  <div className="relative hidden lg:block">
                    <div className="relative">
                      {/* Ana İlaç Kutusu - Daplex */}
                      <div className="absolute top-0 right-0 bg-gray-800 text-white p-4 rounded-lg shadow-xl transform rotate-12 hover:rotate-6 transition-transform">
                        <div className="text-sm font-bold mb-1">Daplex</div>
                        <div className="text-xs text-gray-300">1000 mg/ml / 6 Ampul</div>
                      </div>

                      {/* İkinci İlaç - Budenosin */}
                      <div className="absolute top-16 left-8 bg-red-500 text-white p-4 rounded-lg shadow-xl transform -rotate-6 hover:rotate-0 transition-transform">
                        <div className="text-sm font-bold mb-1">Budenosin</div>
                        <div className="text-xs">Nebül çözeltisi</div>
                      </div>

                      {/* Üçüncü İlaç - Magnorol */}
                      <div className="absolute bottom-8 right-12 bg-pink-500 text-white p-4 rounded-lg shadow-xl transform rotate-6 hover:rotate-3 transition-transform">
                        <div className="text-sm font-bold mb-1">Magnorol</div>
                        <div className="text-xs">Mg tablet</div>
                      </div>

                      {/* Dördüncü İlaç - BRUFEN */}
                      <div className="absolute bottom-0 left-4 bg-purple-600 text-white p-4 rounded-lg shadow-xl transform -rotate-3 hover:rotate-0 transition-transform">
                        <div className="text-sm font-bold mb-1">BRUFEN</div>
                        <div className="text-xs">600 mg Film Tablet</div>
                      </div>

                      {/* Merkez Alan */}
                      <div className="w-80 h-64 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl">💊</span>
                          </div>
                          <p className="text-white text-lg font-semibold">Binlerce İlaç</p>
                          <p className="text-blue-200">En Uygun Fiyatlarla</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alt Navigasyon Noktaları */}
                <div className="flex justify-center pb-6 space-x-2">
                  <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Depolar Section */}
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Depolar</h2>
                <button 
                  onClick={() => router.push('/')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Tüm Depoları Gör →
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* STRDepo */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">STR</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-900">STRDepo</h3>
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">2500 TL üzeri kargo bedava</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">İ</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">İprasal 0,5+2,5 mg/2,5 ml Nebül Çözeltisi</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-bold text-gray-900">45,00 TL</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">%43</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => router.push('//')}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">D</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Desal 40 mg 50 Film Tablet</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-bold text-gray-900">80,69 TL</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">%49</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* İlaçsepeti */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">İS</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-900">İlaçsepeti</h3>
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">2500 TL üzeri kargo bedava</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div 
                      onClick={() => router.push('//')}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">B</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Bulopan 10 mg 20 Kapsül</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-bold text-gray-900">53,89 TL</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">%34</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => router.push('//')}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">E</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Etna Combo 100 mg/8 mg 14 Film Tablet</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-bold text-gray-900">85,65 TL</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">%32</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FarmaTrend */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">FT</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-900">FarmaTrend</h3>
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">2500 TL üzeri kargo bedava</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div 
                      onClick={() => router.push('//')}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-sm">V</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Vigrande 100 mg 4 Film Tablet</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-bold text-gray-900">105,02 TL</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">%31</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => router.push('//')}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-600 font-bold text-sm">D</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Degra 100 mg 4 Film Tablet</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-bold text-gray-900">137,92 TL</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">%42</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Son 7 Günde Çok Satanlar */}
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Son 7 Günde Çok Satanlar</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Tümünü Gör →
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Bestseller 1 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold mr-2">#1</span>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Parol 500 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">20 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">24,50 ₺</span>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-yellow-700">1,247 satış</div>
                </div>

                {/* Bestseller 2 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold mr-2">#2</span>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Aspirin 100 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">28 Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">18,75 ₺</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-blue-700">982 satış</div>
                </div>

                {/* Bestseller 3 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold mr-2">#3</span>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Voltaren Gel</h3>
                  <p className="text-xs text-gray-600 mb-2">50 gr Jel</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">42,30 ₺</span>
                    <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-green-700">756 satış</div>
                </div>

                {/* Bestseller 4 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold mr-2">#4</span>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Favipiravir</h3>
                  <p className="text-xs text-gray-600 mb-2">200 mg 40 Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">156,80 ₺</span>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-purple-700">634 satış</div>
                </div>
              </div>
            </div>
          </div>

          {/* Son Gezdikleriniz */}
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-6 h-6 text-blue-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Son Gezdikleriniz</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Geçmişi Temizle
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Recently Viewed 1 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="text-xs text-gray-500">2 saat önce</div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Majezik 100 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">15 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">87,01 ₺</span>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Recently Viewed 2 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">D</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="text-xs text-gray-500">5 saat önce</div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Desal 40 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">50 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">80,69 ₺</span>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Recently Viewed 3 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="text-xs text-gray-500">1 gün önce</div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Bulopan 10 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">20 Kapsül</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">53,89 ₺</span>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Recently Viewed 4 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="text-xs text-gray-500">2 gün önce</div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Etna Combo 100/8 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">14 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">85,65 ₺</span>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Recently Viewed 5 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="text-xs text-gray-500">3 gün önce</div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Vigrande 100 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">4 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">105,02 ₺</span>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keşfet Bölümü */}
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Compass className="w-6 h-6 text-green-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Keşfet</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Daha Fazla →
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Keşfet 1 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">O</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">YENİ</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">ORS İçecek Tozu</h3>
                  <p className="text-xs text-gray-600 mb-2">Portakal Aromalı 21 Saşe</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">15,25 ₺</span>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Keşfet 2 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">TREND</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Nexium 20 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">14 Gastro-Rezistant Kapsül</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">68,45 ₺</span>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Keşfet 3 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Z</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">İNDİRİM</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Zinnat 250 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">10 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">94,20 ₺</span>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Keşfet 4 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">HOT</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Calpol 120 mg</h3>
                  <p className="text-xs text-gray-600 mb-2">Şurup 100 ml</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">28,75 ₺</span>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Keşfet 5 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">ÖZEL</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Lacidofil</h3>
                  <p className="text-xs text-gray-600 mb-2">10 Kapsül</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">45,60 ₺</span>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Keşfet 6 */}
                <div 
                  onClick={() => router.push('//')}
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div className="ml-2 flex-1">
                      <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">LİMİT</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Supradyn</h3>
                  <p className="text-xs text-gray-600 mb-2">30 Film Tablet</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">72,80 ₺</span>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white p-1.5 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bekleyen Sipariş</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aylık Harcama</p>
                  <p className="text-2xl font-bold text-gray-900">₺{stats.monthlySpend.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasarruf</p>
                  <p className="text-2xl font-bold text-gray-900">₺{stats.savedAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Yeni Sipariş Ver
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex items-center justify-center px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Package className="w-5 h-5 mr-2" />
                Sepeti Görüntüle
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex items-center justify-center px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Panel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in or not a pharmacy, show the original home page
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Türkiye'nin En Güvenilir
              <span className="block text-blue-200">B2B İlaç Platformu</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Eczaneler ve ilaç depolarını bir araya getiren dijital tedarik çözümü. 
              Güvenli, hızlı ve şeffaf ticaret için tasarlandı.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Hemen Başla
              </button>
              <button
                onClick={() => router.push('/')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden FarmaDepom?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İlaç sektöründe dijital dönüşümün öncüsü olan platformumuzla 
              işinizi büyütün ve operasyonlarınızı optimize edin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Güvenli İşlemler</h3>
              <p className="text-gray-600">
                SSL sertifikalı, KVKK uyumlu altyapı ile verileriniz güvende. 
                Her işlem kayıt altına alınır.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">
                Anlık stok takibi ve otomatik sipariş yönetimi ile 
                tedarik süreçlerinizi hızlandırın.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Geniş Ağ</h3>
              <p className="text-gray-600">
                Türkiye genelinde 1000+ eczane ve 50+ yetkili depo 
                ile geniş tedarik ağımıza katılın.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Akıllı Arama</h3>
              <p className="text-gray-600">
                Barkod, etken madde veya ürün adı ile gelişmiş arama. 
                Fiyat karşılaştırması ve stok takibi.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analitik Raporlar</h3>
              <p className="text-gray-600">
                Detaylı satış raporları, stok analizi ve pazar trendleri 
                ile işinizi daha iyi yönetin.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Onaylı Üyelik</h3>
              <p className="text-gray-600">
                Tüm eczane ve depolar kimlik doğrulamasından geçer. 
                Sahte üyeliğe karşı tam koruma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rakamlarla FarmaDepom
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-lg text-gray-600">Aktif Eczane</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-lg text-gray-600">Yetkili Depo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">25K+</div>
              <div className="text-lg text-gray-600">Aylık Sipariş</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">99.8%</div>
              <div className="text-lg text-gray-600">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Dijital Dönüşümde Geride Kalmayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hemen üye olun ve ilaç tedarik süreçlerinizi dijitalleştirin. 
            İlk siparişinizde %5 indirim fırsatını kaçırmayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Eczane Olarak Katıl
            </button>
            <button
              onClick={() => router.push('/')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Depo Olarak Katıl
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
