'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Info } from 'lucide-react';

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId = 'orcafil-5mg' }) => {
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState('1+2');

  // Mock product data
  const productData = {
    'orcafil-5mg': {
      name: 'Orcafil 5 mg 28 Film Tablet',
      image: '/orcafil-image.jpg',
      company: 'World Medicine',
      barcode: '8680199090086',
      recipeType: 'Beyaz Reçete',
      activeIngredient: 'Tadalafil - 5 mg',
      dsf: '2488.27 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '2889.37 TL',
      breadcrumb: ['Ana Sayfa', 'Cinsel Sağlık', 'Ürolojik', 'Orcafil 5 mg 28 Film Tablet']
    },
    'parol-500mg': {
      name: 'Parol 500 mg 20 Film Tablet',
      image: '/parol-image.jpg',
      company: 'Atabay İlaç',
      barcode: '8699593024157',
      recipeType: 'Yeşil Reçete',
      activeIngredient: 'Parasetamol - 500 mg',
      dsf: '145.50 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '165.75 TL',
      breadcrumb: ['Ana Sayfa', 'Ağrı Kesici', 'Analjezik', 'Parol 500 mg 20 Film Tablet']
    },
    'aspirin-100mg': {
      name: 'Aspirin 100 mg 28 Tablet',
      image: '/aspirin-image.jpg',
      company: 'Bayer Türk',
      barcode: '8699546001234',
      recipeType: 'Yeşil Reçete',
      activeIngredient: 'Asetilsalisilik Asit - 100 mg',
      dsf: '89.25 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '105.40 TL',
      breadcrumb: ['Ana Sayfa', 'Kardiyovasküler', 'Antitrombotik', 'Aspirin 100 mg 28 Tablet']
    },
    'voltaren-gel': {
      name: 'Voltaren Gel 50 gr',
      image: '/voltaren-image.jpg',
      company: 'Novartis',
      barcode: '8699874523156',
      recipeType: 'Yeşil Reçete',
      activeIngredient: 'Diklofenak Sodyum - 11.6 mg/g',
      dsf: '245.80 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '285.90 TL',
      breadcrumb: ['Ana Sayfa', 'Kas-İskelet', 'Topikal Antiinflamatuar', 'Voltaren Gel 50 gr']
    },
    'desal-40mg': {
      name: 'Desal 40 mg 50 Film Tablet',
      image: '/desal-image.jpg',
      company: 'Deva Holding',
      barcode: '8699546789012',
      recipeType: 'Kırmızı Reçete',
      activeIngredient: 'Telmisartan - 40 mg',
      dsf: '480.69 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '520.75 TL',
      breadcrumb: ['Ana Sayfa', 'Kardiyovasküler', 'ACE İnhibitörleri', 'Desal 40 mg 50 Film Tablet']
    },
    'bulopan-10mg': {
      name: 'Bulopan 10 mg 20 Kapsül',
      image: '/bulopan-image.jpg',
      company: 'Abdi İbrahim',
      barcode: '8699593456789',
      recipeType: 'Kırmızı Reçete',
      activeIngredient: 'Pantoprazol Sodyum - 10 mg',
      dsf: '253.89 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '289.47 TL',
      breadcrumb: ['Ana Sayfa', 'Gastroenteroloji', 'Proton Pompa İnhibitörleri', 'Bulopan 10 mg 20 Kapsül']
    },
    'etna-combo-100mg': {
      name: 'Etna Combo 100 mg/8 mg 14 Film Tablet',
      image: '/etna-combo-image.jpg',
      company: 'Sanofi Türkiye',
      barcode: '8699874567890',
      recipeType: 'Kırmızı Reçete',
      activeIngredient: 'Losartan Potasyum + Amlodipine - 100mg/8mg',
      dsf: '485.65 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '525.20 TL',
      breadcrumb: ['Ana Sayfa', 'Kardiyovasküler', 'Kombinasyon İlaçları', 'Etna Combo 100 mg/8 mg 14 Film Tablet']
    },
    'vigrande-100mg': {
      name: 'Vigrande 100 mg 4 Film Tablet',
      image: '/vigrande-image.jpg',
      company: 'Zentiva',
      barcode: '8699123456789',
      recipeType: 'Beyaz Reçete',
      activeIngredient: 'Sildenafil Sitrat - 100 mg',
      dsf: '605.02 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '695.58 TL',
      breadcrumb: ['Ana Sayfa', 'Cinsel Sağlık', 'Ürolojik', 'Vigrande 100 mg 4 Film Tablet']
    },
    'degra-100mg': {
      name: 'Degra 100 mg 4 Film Tablet',
      image: '/degra-image.jpg',
      company: 'Koçak Farma',
      barcode: '8699987654321',
      recipeType: 'Beyaz Reçete',
      activeIngredient: 'Sildenafil Sitrat - 100 mg',
      dsf: '737.92 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '825.40 TL',
      breadcrumb: ['Ana Sayfa', 'Cinsel Sağlık', 'Ürolojik', 'Degra 100 mg 4 Film Tablet']
    },
    'majezik-100mg': {
      name: 'Majezik 100 mg 15 Film Tablet',
      image: '/majezik-image.jpg',
      company: 'Sanofi Türkiye',
      barcode: '8699456123789',
      recipeType: 'Yeşil Reçete',
      activeIngredient: 'Deksketoprofen Trometamol - 100 mg',
      dsf: '487.01 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '540.85 TL',
      breadcrumb: ['Ana Sayfa', 'Ağrı Kesici', 'NSAİİ', 'Majezik 100 mg 15 Film Tablet']
    },
    'ors-icecek': {
      name: 'ORS İçecek Tozu Portakal Aromalı 21 Saşe',
      image: '/ors-image.jpg',
      company: 'Biofarma',
      barcode: '8699321654987',
      recipeType: 'Reçetesiz',
      activeIngredient: 'Sodyum Klorür + Potasyum Klorür + Glukoz',
      dsf: '75.25 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '85.40 TL',
      breadcrumb: ['Ana Sayfa', 'Beslenme', 'Elektrolit Dengesi', 'ORS İçecek Tozu Portakal Aromalı 21 Saşe']
    },
    'nexium-20mg': {
      name: 'Nexium 20 mg 14 Gastro-Rezistant Kapsül',
      image: '/nexium-image.jpg',
      company: 'AstraZeneca',
      barcode: '8699654789123',
      recipeType: 'Kırmızı Reçete',
      activeIngredient: 'Esomeprazol Magnezyum - 20 mg',
      dsf: '368.45 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '410.20 TL',
      breadcrumb: ['Ana Sayfa', 'Gastroenteroloji', 'Proton Pompa İnhibitörleri', 'Nexium 20 mg 14 Gastro-Rezistant Kapsül']
    },
    'zinnat-250mg': {
      name: 'Zinnat 250 mg 10 Film Tablet',
      image: '/zinnat-image.jpg',
      company: 'GlaxoSmithKline',
      barcode: '8699789456123',
      recipeType: 'Kırmızı Reçete',
      activeIngredient: 'Sefuroksim Aksetil - 250 mg',
      dsf: '494.20 TL',
      publicOrdering: 'Ödenir',
      psfPrice: '550.65 TL',
      breadcrumb: ['Ana Sayfa', 'Antibiyotik', 'Sefalosporinler', 'Zinnat 250 mg 10 Film Tablet']
    },
    'calpol-120mg': {
      name: 'Calpol 120 mg Şurup 100 ml',
      image: '/calpol-image.jpg',
      company: 'Johnson & Johnson',
      barcode: '8699147258369',
      recipeType: 'Reçetesiz',
      activeIngredient: 'Parasetamol - 120 mg/5ml',
      dsf: '128.75 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '145.20 TL',
      breadcrumb: ['Ana Sayfa', 'Pediatri', 'Ağrı Kesici', 'Calpol 120 mg Şurup 100 ml']
    },
    'lacidofil-10kapsul': {
      name: 'Lacidofil 10 Kapsül',
      image: '/lacidofil-image.jpg',
      company: 'Biocodex',
      barcode: '8699852741963',
      recipeType: 'Reçetesiz',
      activeIngredient: 'Lactobacillus Rhamnosus - 10^9 CFU',
      dsf: '245.60 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '275.85 TL',
      breadcrumb: ['Ana Sayfa', 'Gastroenteroloji', 'Probiyotikler', 'Lacidofil 10 Kapsül']
    },
    'supradyn-30tablet': {
      name: 'Supradyn 30 Film Tablet',
      image: '/supradyn-image.jpg',
      company: 'Bayer Türk',
      barcode: '8699963852741',
      recipeType: 'Reçetesiz',
      activeIngredient: 'Multivitamin + Mineral Kompleksi',
      dsf: '372.80 TL',
      publicOrdering: 'Ödenmez',
      psfPrice: '420.15 TL',
      breadcrumb: ['Ana Sayfa', 'Beslenme', 'Vitamin-Mineral', 'Supradyn 30 Film Tablet']
    }
  };

  // Mock warehouse pricing data
  const warehousePricing = [
    {
      id: 'ulusaldepo',
      name: 'Ulusal Depo',
      logo: 'UD',
      color: 'blue',
      quantities: [
        { amount: '1+2', price: 329.42 },
        { amount: '2+5', price: 710.83 },
        { amount: '3+12', price: 497.65 }
      ]
    },
    {
      id: 'farmatrend',
      name: 'FarmaTrend',
      logo: 'FT',
      color: 'purple',
      ilanCount: 554,
      expiry: 'Ağustos 2027',
      price: 326.70,
      discount: '%61',
      isEskiFiyat: true
    },
    {
      id: 'vitalmed',
      name: 'vitalmed',
      logo: 'VM',
      color: 'green',
      ilanCount: 416,
      expiry: 'Ağustos 2027',
      price: 326.70,
      discount: '%61',
      isEskiFiyat: true
    },
    {
      id: 'hamzapharma1',
      name: 'hamzapharma',
      logo: 'HP',
      color: 'indigo',
      ilanCount: 434,
      expiry: 'Şubat 2028',
      price: 327.99,
      discount: '%60'
    },
    {
      id: 'hamzapharma2',
      name: 'hamzapharma',
      logo: 'HP',
      color: 'indigo',
      ilanCount: 434,
      expiry: 'Şubat 2029',
      price: 328.00,
      discount: '%60'
    },
    {
      id: 'vitalmed2',
      name: 'vitalmed',
      logo: 'VM',
      color: 'green',
      ilanCount: 416,
      expiry: 'Şubat 2029',
      price: 328.90,
      discount: '%60'
    },
    {
      id: 'symbicort',
      name: 'symbicort',
      logo: 'SB',
      color: 'cyan',
      ilanCount: 140,
      expiry: 'Şubat 2029',
      price: 329.57,
      discount: '%60',
      hasSpecialNote: true,
      specialNote: 'Botanik entegrasyonu vardı! Karteksdan otomatik alışverış.'
    },
    {
      id: 'iris',
      name: 'İris',
      logo: 'İ',
      color: 'gray',
      ilanCount: 845,
      expiry: 'Temmuz 2027',
      price: 330.01,
      discount: '%60',
      hasShipping: true,
      shippingNote: '2500 TL ve üzeri kargo bedava!'
    },
    {
      id: 'bizimdepo1',
      name: 'bizimdepo',
      logo: 'BD',
      color: 'orange',
      ilanCount: 298,
      expiry: 'Temmuz 2027',
      price: 331.77,
      discount: '%60'
    },
    {
      id: 'bizimdepo2',
      name: 'bizimdepo',
      logo: 'BD',
      color: 'orange',
      ilanCount: 298,
      expiry: 'Ocak 2028',
      price: 350.46,
      discount: '%58'
    },
    {
      id: 'kuzey',
      name: 'Kuzey',
      logo: 'K',
      color: 'slate',
      ilanCount: 298,
      expiry: 'Şubat 2029',
      price: 355.47,
      discount: '%57'
    }
  ];

  const product = productData[productId as keyof typeof productData] || productData['orcafil-5mg'];

  const quantityOptions = ['1+2', '2+5', '3+12'];

  const getCurrentPrice = (warehouse: any) => {
    if (warehouse.quantities) {
      const selected = warehouse.quantities.find((q: any) => q.amount === selectedQuantity);
      return selected ? selected.price : warehouse.quantities[0].price;
    }
    return warehouse.price;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            {product.breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <button 
                    onClick={() => router.push('/home')}
                    className="hover:text-blue-600"
                  >
                    {item}
                  </button>
                ) : (
                  <span className={index === product.breadcrumb.length - 1 ? 'text-gray-900 font-medium' : ''}>
                    {item}
                  </span>
                )}
                {index < product.breadcrumb.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Product Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{product.name}</h1>
              
              {/* Product Image */}
              <div className="mb-6">
                <div className="w-full h-64 bg-gradient-to-br from-purple-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <div className="bg-purple-700 px-4 py-2 rounded mb-2">
                      <span className="text-sm font-medium">28 Film Tablet</span>
                    </div>
                    <div className="text-3xl font-bold mb-2">ORCAFIL</div>
                    <div className="text-lg">5 mg Film Tablet</div>
                    <div className="mt-4 bg-white/20 px-3 py-1 rounded text-sm">
                      World Medicine
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">İlaç Şirketi:</span>
                    <div className="text-gray-900">{product.company}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Barkod:</span>
                    <div className="text-gray-900 flex items-center">
                      {product.barcode}
                      <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Reçete Tipi:</span>
                    <div className="text-gray-900">{product.recipeType}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Etken Madde:</span>
                    <div className="text-gray-900">{product.activeIngredient}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">DSF:</span>
                    <div className="text-gray-900 flex items-center">
                      {product.dsf}
                      <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Kamu Ödenen:</span>
                    <div className="text-red-600 font-medium">{product.publicOrdering}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="font-medium text-gray-700">Fiyat Farkı:</span>
                  <div className="text-gray-900">{product.psfPrice}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Warehouse Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Tüm İlanlar</h2>
                  <div className="flex items-center space-x-4">
                    {quantityOptions.map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setSelectedQuantity(qty)}
                        className={`px-3 py-1 rounded text-sm font-medium border ${
                          selectedQuantity === qty
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {warehousePricing.map((warehouse) => (
                    <div 
                      key={warehouse.id} 
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-${warehouse.color}-600 rounded-lg flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{warehouse.logo}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900">{warehouse.name}</h3>
                            {warehouse.ilanCount && (
                              <span className="text-sm text-gray-500">{warehouse.ilanCount} İlan</span>
                            )}
                          </div>
                          {warehouse.expiry && (
                            <div className="text-sm text-red-600">{warehouse.expiry}</div>
                          )}
                          {warehouse.hasSpecialNote && (
                            <div className="flex items-center text-sm text-blue-600 mt-1">
                              <Info className="w-4 h-4 mr-1" />
                              {warehouse.specialNote}
                            </div>
                          )}
                          {warehouse.hasShipping && (
                            <div className="text-sm text-blue-600 mt-1">{warehouse.shippingNote}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {getCurrentPrice(warehouse).toFixed(2)} TL
                          </div>
                          {warehouse.discount && (
                            <div className="flex items-center space-x-2">
                              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                                {warehouse.discount}
                              </span>
                              {warehouse.isEskiFiyat && (
                                <span className="text-green-600 text-xs font-medium">Eski Fiyat!</span>
                              )}
                            </div>
                          )}
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                          Sepete Ekle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
