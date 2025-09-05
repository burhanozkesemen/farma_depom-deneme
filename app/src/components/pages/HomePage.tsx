'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [activeHeroTab, setActiveHeroTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider content (initial mock). Will be overridden with CSV data when available.
  const [slides, setSlides] = useState<any[]>([
    {
      id: 1,
      title: 'Brus',
      subtitle: '100 mg/5 ml Pediatrik Süspansiyon 100 ml',
      price: 19.9,
      leftImage: '/api/placeholder/180/260',
      rightImage: '/api/placeholder/420/240',
      cta: { label: 'Ürünlere Git', href: '/products' },
      cornerColor: '#6B4CF6',
    },
    {
      id: 2,
      title: 'Abalevo',
      subtitle: '1,5 mg 1 Tablet',
      price: 138.81,
      leftImage: '/api/placeholder/180/260',
      rightImage: '/api/placeholder/420/240',
      cta: { label: 'Fırsatları Gör', href: '/products?tag=firsat' },
      cornerColor: '#1E69FF',
    },
    {
      id: 3,
      title: 'Minoxil Forte',
      subtitle: '%5 Deri Spreyi 60 ml',
      price: 393.8,
      leftImage: '/api/placeholder/180/260',
      rightImage: '/api/placeholder/420/240',
      cta: { label: "FarmazonRx'i Tanıyın", href: '/about' },
      cornerColor: '#7B3FF2',
    },
    {
      id: 4,
      title: 'Libalaks',
      subtitle: '%53,1 + %3,7 Rektal Jel 10 g',
      price: 36.33,
      leftImage: '/api/placeholder/180/260',
      rightImage: '/api/placeholder/420/240',
      cta: { label: 'Kampanyalara Bak', href: '/campaigns' },
      cornerColor: '#FF7A00',
    },
  ]);

  const goPrev = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((s) => (s + 1) % slides.length);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('/api/csv-products?limit=60', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore && Array.isArray(data.items)) {
          const safeItems = data.items.map((it: any) => ({
            ...it,
            price: typeof it?.price === 'number' ? it.price : 0,
            imageUrl: it?.imageUrl || '/api/placeholder/280/280',
            name: it?.name || 'Ürün',
          }));
          setTopProducts(safeItems);

          // Build slides from first 4 CSV items with images
          const first = safeItems.filter((it: any) => it.imageUrl && it.name).slice(0, 4);
          if (first.length) {
            const colors = ['#6B4CF6', '#1E69FF', '#7B3FF2', '#FF7A00'];
            const csvSlides = first.map((it: any, idx: number) => ({
              id: idx + 1,
              title: it.name?.split(',')[0] || it.name,
              subtitle: it.ingredient || it.prescriptionType || '',
              price: it.price ?? 0,
              leftImage: it.imageUrl,
              rightImage: it.imageUrl,
              cta: { label: 'Ürünlere Git', href: '/products' },
              cornerColor: colors[idx % colors.length],
            }));
            setSlides(csvSlides);
            setCurrentSlide(0);
          }
        }
      } catch (e) {
        // noop
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  const featuredProducts = topProducts.length > 0 ? topProducts.slice(0, 16).map((p) => ({
    ...p,
    price: typeof p.price === 'number' ? p.price : 0,
    imageUrl: p.imageUrl || '/api/placeholder/280/280',
    name: p.name || 'Ürün',
  })) : [
    { id: '1', name: 'Nurofen Cold & Flu 200mg/30mg 24 Film Tablet', price: 73.50, imageUrl: '/api/placeholder/280/280' },
    { id: '2', name: 'Aspirin 100mg 28 Tablet', price: 18.75, imageUrl: '/api/placeholder/280/280' },
    { id: '3', name: 'Voltaren Gel 50gr', price: 42.30, imageUrl: '/api/placeholder/280/280' },
    { id: '4', name: 'Parol 500mg 20 Film Tablet', price: 87.01, imageUrl: '/api/placeholder/280/280' },
    { id: '5', name: 'Majezik 100mg 15 Film Tablet', price: 80.69, imageUrl: '/api/placeholder/280/280' },
    { id: '6', name: 'Desal 40mg 50 Film Tablet', price: 156.80, imageUrl: '/api/placeholder/280/280' },
    { id: '7', name: 'Brufen 600mg Film Tablet', price: 78.10, imageUrl: '/api/placeholder/280/280' },
    { id: '8', name: 'Combo 100mg 4 Film Tablet', price: 95.70, imageUrl: '/api/placeholder/280/280' },
    { id: '9', name: 'Minoxil Forte %5 60 ml', price: 393.80, imageUrl: '/api/placeholder/280/280' },
    { id: '10', name: 'Libalaks %53,1 + %3,7', price: 36.33, imageUrl: '/api/placeholder/280/280' },
    { id: '11', name: 'Degra 100 mg 4 Film Tablet', price: 130.19, imageUrl: '/api/placeholder/280/280' },
    { id: '12', name: 'İprasal 0,5-2,5 MG/2,5 ML', price: 49.22, imageUrl: '/api/placeholder/280/280' },
    { id: '13', name: 'Abalevo 1,5 mg 1 Tablet', price: 138.81, imageUrl: '/api/placeholder/280/280' },
    { id: '14', name: 'Vigaroo 100 mg 4 Film Tablet', price: 40.30, imageUrl: '/api/placeholder/280/280' },
    { id: '15', name: 'Butopan 10 mg 20 Kaplı Tablet', price: 50.00, imageUrl: '/api/placeholder/280/280' },
    { id: '16', name: 'Flynta 5 mg 28 Film Tablet', price: 441.10, imageUrl: '/api/placeholder/280/280' },
  ];

  const depots = [
    {
      name: 'Land',
      badge: '2500 TL üzeri kargo bedava',
      products: featuredProducts.slice(0, 5),
    },
    {
      name: 'hamzapharma',
      badge: '2500 TL üzeri kargo bedava',
      products: featuredProducts.slice(5, 10),
    },
    {
      name: 'vitalmed',
      badge: '2500 TL üzeri kargo bedava',
      products: featuredProducts.slice(10, 15),
    },
  ];

  const bestSellers = featuredProducts.slice(0, 8);
  const recentViewed = featuredProducts.slice(8, 16);

  const formatTL = (value: number) => `${value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

  return (
    <div className="min-h-screen">
      {/* Hero with tabs & slider */}
      <section className="bg-gradient-to-r from-[#1bb56b] via-[#22a0d7] to-[#1e69ff] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {['Haftanın Fırsat Depoları', 'Haftanın Fırsatları', "FarmazonRx'i Tanıyın", 'Vade Farksız Taksit Kampanyaları'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setActiveHeroTab(i); setCurrentSlide(0); }}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition ${activeHeroTab === i ? 'bg-white text-[#1e2a3a]' : 'bg-white/15 hover:bg-white/25 text-white'}`}
              >
                {tab}
                {activeHeroTab === i && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-white rounded-t-sm" />
                )}
              </button>
            ))}
          </div>

          {/* Slider card */}
          <div className="relative">
            <button aria-label="Geri" onClick={goPrev} className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-[#1e2a3a] shadow rounded-full p-2 hover:bg-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button aria-label="İleri" onClick={goNext} className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-[#1e2a3a] shadow rounded-full p-2 hover:bg-white">
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="bg-white text-[#1b2a3a] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 overflow-hidden">
              {/* Corner notch */}
              <div className="absolute -top-2 left-6 w-0 h-0 border-l-[18px] border-l-transparent border-b-[18px]" style={{ borderBottomColor: slides[currentSlide]?.cornerColor || '#6B4CF6' }} />

              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Left: product image + text */}
                <div className="flex items-center gap-6">
                  <div className="w-36 h-52 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Image src={slides[currentSlide]?.leftImage || '/api/placeholder/180/260'} alt={slides[currentSlide]?.title || 'ürün'} width={180} height={260} className="object-contain" unoptimized />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#2C2576]">{slides[currentSlide]?.title}</h3>
                    <p className="text-[#2C3E50] text-sm md:text-base mt-1">{slides[currentSlide]?.subtitle}</p>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#2C2576] mt-3">{(slides[currentSlide]?.price ?? 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</div>
                  </div>
                </div>
                {/* Right: lifestyle image + shapes */}
                <div className="relative">
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rotate-45 rounded-lg" style={{ backgroundColor: '#4B3BAE' }} />
                  <div className="absolute right-8 top-4 w-20 h-8 rotate-45 rounded-lg border-4 border-[#4B3BAE]" />
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <Image src={slides[currentSlide]?.rightImage || '/api/placeholder/420/240'} alt="kampanya" width={640} height={360} className="w-full h-full object-cover" unoptimized />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link href={slides[currentSlide]?.cta?.href || '/products'} className="inline-flex items-center bg-[#1E69FF] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1557d6]">
                  {slides[currentSlide]?.cta?.label || 'Ürünlere Git'} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button onClick={goPrev} className="w-8 h-8 rounded-md bg-white/90 text-[#1e2a3a] flex items-center justify-center shadow hover:bg-white">{'<'}
            </button>
            {slides.map((s, i) => (
              <button key={s.id ?? i} onClick={() => setCurrentSlide(i)} className={`h-10 rounded-md border ${i === currentSlide ? 'border-[#1E69FF] ring-2 ring-[#1E69FF]/20' : 'border-gray-200'} bg-white flex items-center px-2 gap-2`}>
                <span className="w-6 h-6 rounded-full bg-[#1E69FF]/20" />
                <span className="text-xs font-medium text-[#1b2a3a] line-clamp-1">{s.title}</span>
              </button>
            ))}
            <button onClick={goNext} className="w-8 h-8 rounded-md bg-white/90 text-[#1e2a3a] flex items-center justify-center shadow hover:bg-white">{'>'}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Depolar */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Depolar</h2>
            <Link href="/all-warehouses" className="text-[#1E69FF] hover:underline">Tüm Depoları Gör</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {depots.map((d) => (
              <div key={d.name} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-800">{d.name}</div>
                  <div className="text-xs text-[#1E69FF]">{d.badge}</div>
                </div>
                <ul className="divide-y divide-gray-100">
                  {d.products.slice(0,5).map((p) => (
                    <li key={p.id} className="py-2 flex items-center">
                      <div className="w-12 h-12 mr-3 bg-gray-50 rounded flex items-center justify-center">
                        <Image src={p.imageUrl} alt={p.name} width={48} height={48} className="object-contain" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-800 truncate">{p.name}</div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 ml-3 whitespace-nowrap">{formatTL(p.price)}</div>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <Link href="/products" className="text-[#1E69FF] hover:underline text-sm">Tüm Ürünleri Gör</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Son 7 Günde Çok Satanlar */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Son 7 Günde Çok Satanlar</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="grid grid-flow-col auto-cols-[220px] gap-4">
                {bestSellers.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition">
                    <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                      <Image src={p.imageUrl} alt={p.name} width={160} height={160} className="object-contain group-hover:scale-105 transition" unoptimized />
                    </div>
                    <div className="text-sm text-gray-800 line-clamp-2 mb-2">{p.name}</div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">{formatTL(p.price)}</div>
                      <button className="bg-[#1E69FF] hover:bg-[#1557d6] text-white p-2 rounded-lg">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Son Gezdiğiniz */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Son Gezdiğiniz</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="grid grid-flow-col auto-cols-[220px] gap-4">
              {recentViewed.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition">
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                    <Image src={p.imageUrl} alt={p.name} width={160} height={160} className="object-contain group-hover:scale-105 transition" unoptimized />
                  </div>
                  <div className="text-sm text-gray-800 line-clamp-2 mb-2">{p.name}</div>
                  <div className="font-semibold text-gray-900">{formatTL(p.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Keşfet */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Keşfet</h2>
            <Link href="/products" className="text-[#1E69FF] hover:underline inline-flex items-center">İlanları Gör <ChevronRight className="w-4 h-4 ml-1" /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredProducts.slice(0, 15).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition">
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                  <Image src={p.imageUrl} alt={p.name} width={200} height={200} className="object-contain group-hover:scale-105 transition" unoptimized />
                </div>
                <div className="text-sm text-gray-800 line-clamp-2 mb-2">{p.name}</div>
                <div className="font-semibold text-gray-900">{formatTL(p.price)}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
