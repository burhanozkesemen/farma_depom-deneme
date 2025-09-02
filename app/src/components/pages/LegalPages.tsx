'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, FileText, Phone, Mail, MapPin } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'contact';
}

const LegalPages: React.FC<LegalPageProps> = ({ type }) => {
  const router = useRouter();
  const renderPrivacyPolicy = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">KVKK Aydınlatma Metni</h1>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>1. Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, FarmaDepom olarak 
            kişisel verilerinizin güvenliği konusunda siz değerli kullanıcılarımızı bilgilendirmek 
            isteriz.
          </p>

          <h2>2. Kişisel Verilerin Toplanma Amacı</h2>
          <p>Kişisel verileriniz aşağıdaki amaçlarla toplanmaktadır:</p>
          <ul>
            <li>Platform üyelik işlemlerinin gerçekleştirilmesi</li>
            <li>Sipariş ve teslimat süreçlerinin yönetilmesi</li>
            <li>Müşteri hizmetleri ve destek faaliyetleri</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>İstatistiksel analiz ve raporlama</li>
          </ul>

          <h2>3. Toplanan Kişisel Veri Türleri</h2>
          <ul>
            <li>Kimlik bilgileri (ad, soyad, T.C. kimlik numarası)</li>
            <li>İletişim bilgileri (telefon, e-posta, adres)</li>
            <li>Finansal bilgiler (vergi numarası, banka bilgileri)</li>
            <li>Müşteri işlem bilgileri</li>
          </ul>

          <h2>4. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, yasal zorunluluklar ve hizmet kalitesini artırmak amacıyla 
            yetkili kamu kurumları ve iş ortaklarımız ile paylaşılabilir.
          </p>

          <h2>5. Haklarınız</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Kişisel verileriniz hakkında bilgi talep etme</li>
            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
          </ul>

          <h2>6. İletişim</h2>
          <p>
            KVKK kapsamındaki taleplerinizi, <a href="mailto:kvkk@farmadepom.com" className="text-blue-600">kvkk@farmadepom.com</a> 
            e-posta adresine gönderebilir veya aşağıdaki adrese yazılı olarak başvurabilirsiniz:
          </p>
          <address className="not-italic bg-gray-50 p-4 rounded-lg mt-4">
            FarmaDepom Bilgi İşlem A.Ş.<br />
            Maslak Mahallesi, Bilim Sokak No:15<br />
            34485 Sarıyer/İstanbul
          </address>

          <p className="text-sm text-gray-600 mt-8">
            Son güncelleme: 15 Ocak 2024
          </p>
        </div>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-8">
          <FileText className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Üyelik Sözleşmesi</h1>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>1. Taraflar</h2>
          <p>
            Bu sözleşme, FarmaDepom Bilgi İşlem A.Ş. ("FarmaDepom") ile platform üyesi 
            ("Üye") arasında akdedilmiştir.
          </p>

          <h2>2. Sözleşmenin Konusu</h2>
          <p>
            Bu sözleşme, FarmaDepom B2B e-ticaret platformunun kullanım koşullarını ve 
            tarafların hak ve yükümlülüklerini düzenlemektedir.
          </p>

          <h2>3. Tanımlar</h2>
          <ul>
            <li><strong>Platform:</strong> www.farmadepom.com web sitesi ve mobil uygulamaları</li>
            <li><strong>Eczane:</strong> İlaç satın alma yetkisine sahip eczane işletmeleri</li>
            <li><strong>Depo:</strong> İlaç tedariki yapan yetkili ilaç depoları</li>
            <li><strong>Ürün:</strong> Platform üzerinden satışa sunulan ilaç ve tıbbi ürünler</li>
          </ul>

          <h2>4. Üyelik Koşulları</h2>
          <ul>
            <li>Üye, gerçek ve güncel bilgiler sağlayacağını beyan eder</li>
            <li>Eczane üyeleri için eczane ruhsatı zorunludur</li>
            <li>Depo üyeleri için GDF (Güvenli Dağıtım Firması) lisansı gereklidir</li>
            <li>Tüm üyelikler onay sürecinden geçer</li>
          </ul>

          <h2>5. Platform Kullanım Kuralları</h2>
          <ul>
            <li>Platform sadece ilaç ve tıbbi ürün ticareti için kullanılabilir</li>
            <li>Hileli, yanıltıcı veya yasa dışı faaliyetler kesinlikle yasaktır</li>
            <li>Ürün fiyatları güncel ve doğru olmalıdır</li>
            <li>Stok bilgileri gerçek zamanlı güncellenmelidir</li>
          </ul>

          <h2>6. Sipariş ve Teslimat</h2>
          <ul>
            <li>Siparişler depo onayına tabidir</li>
            <li>Teslimat süreleri ve koşulları depo tarafından belirlenir</li>
            <li>İade ve değişim koşulları yasal düzenlemelere uygun olmalıdır</li>
          </ul>

          <h2>7. Ödeme ve Faturalandırma</h2>
          <ul>
            <li>Ödemeler güvenli ödeme sistemleri üzerinden yapılır</li>
            <li>Faturalama işlemleri yasal mevzuata uygun gerçekleştirilir</li>
            <li>KDV ve diğer yasal yükümlülükler taraflarca karşılanır</li>
          </ul>

          <h2>8. Gizlilik ve Güvenlik</h2>
          <ul>
            <li>Tüm veriler SSL şifrelemesi ile korunur</li>
            <li>Ticari sırlar ve müşteri bilgileri gizli tutulur</li>
            <li>Veri güvenliği önlemleri sürekli güncellenır</li>
          </ul>

          <h2>9. Sorumluluklar</h2>
          <ul>
            <li>FarmaDepom platform hizmeti sağlar, ticaret taraflar arasında gerçekleşir</li>
            <li>Ürün kalitesi ve yasal uygunluğundan satıcı sorumludur</li>
            <li>Ödeme güvenliği platform tarafından sağlanır</li>
          </ul>

          <h2>10. Sözleşmenin Değiştirilmesi ve Sona Ermesi</h2>
          <p>
            FarmaDepom bu sözleşmeyi değiştirme hakkını saklı tutar. Değişiklikler 
            platform üzerinden duyurulur. Üyeler istediği zaman üyeliklerini sonlandırabilir.
          </p>

          <h2>11. Uygulanacak Hukuk ve Yetki</h2>
          <p>
            Bu sözleşme Türk Hukuku'na tabidir. Uyuşmazlıklar İstanbul mahkemelerinde 
            çözümlenir.
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Son güncelleme: 15 Ocak 2024
          </p>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-lg text-gray-600">
            Size nasıl yardımcı olabiliriz? Bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Adres</h3>
                <p className="text-gray-600">
                  Maslak Mahallesi,<br />
                  Bilim Sokak No:15<br />
                  34485 Sarıyer/İstanbul
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                <p className="text-gray-600">
                  Genel: +90 212 123 45 67<br />
                  Destek: +90 212 123 45 68<br />
                  Acil: +90 555 123 45 67
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta</h3>
                <p className="text-gray-600">
                  Genel: info@farmadepom.com<br />
                  Destek: destek@farmadepom.com<br />
                  Satış: satis@farmadepom.com<br />
                  KVKK: kvkk@farmadepom.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mesaj Gönder</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E-posta adresiniz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konu
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Genel Bilgi</option>
                  <option>Teknik Destek</option>
                  <option>Sipariş Sorunu</option>
                  <option>Ürün Sorunu</option>
                  <option>Fatura/Ödeme</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Çalışma Saatleri</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-medium text-gray-900">Müşteri Hizmetleri</p>
                <p className="text-gray-600">Pazartesi - Cuma: 08:00 - 18:00</p>
                <p className="text-gray-600">Cumartesi: 09:00 - 14:00</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Teknik Destek</p>
                <p className="text-gray-600">7/24 Online Destek</p>
                <p className="text-gray-600">Acil Durumlarda Telefon</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Sipariş Destek</p>
                <p className="text-gray-600">Pazartesi - Cuma: 08:00 - 20:00</p>
                <p className="text-gray-600">Cumartesi: 09:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'privacy':
      return renderPrivacyPolicy();
    case 'terms':
      return renderTerms();
    case 'contact':
      return renderContact();
    default:
      return null;
  }
};

export default LegalPages;