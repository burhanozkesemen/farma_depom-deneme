'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
  const router = useRouter();
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FarmaDepom</span>
            </div>
            <p className="text-gray-600 text-sm">
              Türkiye'nin en güvenilir B2B ilaç tedarik platformu. 
              Eczaneler ve depolar için dijital ticaret çözümleri.
            </p>
            <div className="text-sm text-gray-600">
              <p>Vergi No: 1234567890</p>
              <p>Mersis No: 0123456789012345</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => router.push('/products')}
                  className="text-gray-600 hover:text-green-600"
                >
                  Ürün Kataloğu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/register')}
                  className="text-gray-600 hover:text-green-600"
                >
                  Üye Ol
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Nasıl Çalışır?
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  SSS
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hukuki</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => router.push('/privacy')}
                  className="text-gray-600 hover:text-green-600"
                >
                  KVKK Politikası
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/terms')}
                  className="text-gray-600 hover:text-green-600"
                >
                  Üyelik Sözleşmesi
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Satış Koşulları
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  İade Koşulları
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">İletişim</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Adres: Maslak Mahallesi,<br />
                Bilim Sokak No:15<br />
                34485 Sarıyer/İstanbul
              </p>
              <p>Telefon: +90 212 123 45 67</p>
              <p>E-posta: info@farmadepom.com</p>
              <p>Destek: destek@farmadepom.com</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 FarmaDepom. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">ISO 27001 Sertifikalı</span>
              <span className="text-sm text-gray-500">SSL Güvenlik</span>
              <span className="text-sm text-gray-500">KVKK Uyumlu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;