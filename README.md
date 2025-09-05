# FarmaDepom - B2B İlaç Tedarik Platformu

## 🚀 Proje Özeti

FarmaDepom, eczaneler ve ilaç depolarının dijital ticaretini kolaylaştıran modern bir B2B platform. Next.js 14 App Router ile geliştirilmiş, tam TypeScript desteği ile güvenli ve ölçeklenebilir.

## ✨ Özellikler

### 🏥 Kullanıcı Rolleri
- **Eczane**: Ürün arama, sipariş verme, stok takibi
- **Depo**: Ürün yönetimi, sipariş alma, envanter kontrolü  
- **Admin**: Sistem yönetimi, kullanıcı onaylama, raporlama

### 🛒 Temel Fonksiyonlar
- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Ürün kataloğu ve arama
- ✅ Sepet yönetimi
- ✅ Sipariş takibi
- ✅ Stok yönetimi
- ✅ Raporlama sistemi

### 🎯 Özel Özellikler
- 🏷️ Uygun fiyat ürünleri
- ⏰ Yakın miat tarihli ürünler
- 🏪 Depo bazlı arama
- 💊 OTC (Reçetesiz) ilaçlar
- 📊 Detaylı raporlama

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 14** - App Router ile
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern styling
- **React Hooks** - State management
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database

### Development
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **TypeScript** - Static typing

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn
- PostgreSQL database

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env.local
# DATABASE_URL'i düzenle

# Database setup
npm run prisma:generate
npm run prisma:migrate
npm run db:seed

# Development server
npm run dev
```

### Build ve Deploy
```bash
# Production build
npm run build

# Production server
npm run start
```

## 📱 Sayfa Yapısı

### Public Pages
- `/` - Ana sayfa
- `/login` - Giriş sayfası
- `/register` - Kayıt sayfası
- `/forgot-password` - Şifre sıfırlama

### Authenticated Pages
- `/dashboard` - Kullanıcı paneli
- `/products` - Ürün kataloğu
- `/cart` - Sepet
- `/profile` - Profil ayarları
- `/reports` - Raporlar

### Special Pages
- `/affordable-prices` - Uygun fiyat ürünleri
- `/near-expiry` - Yakın miat ürünleri
- `/all-warehouses` - Tüm depolar
- `/otc-medicines` - Reçetesiz ilaçlar
- `/medicine-categories` - İlaç kategorileri

### Dynamic Pages
- `/product/[id]` - Ürün detayı
- `/warehouse/[id]` - Depo detayı

## 🔧 API Endpoints

### Products
- `GET /api/products` - Ürün listesi
- `GET /api/products/[id]` - Ürün detayı
- `GET /api/products/near-expiry` - Yakın miat ürünleri

### Categories
- `GET /api/categories` - Kategori listesi
- `GET /api/categories/[id]/products` - Kategoriye göre ürünler

### Warehouses
- `GET /api/warehouses/[id]/inventory` - Depo envanteri

## 🎨 UI/UX Özellikleri

- 📱 **Responsive Design** - Tüm cihazlarda uyumlu
- 🎨 **Modern Interface** - Tailwind CSS ile şık tasarım
- ⚡ **Fast Loading** - Next.js optimizasyonları
- 🔍 **Smart Search** - Gelişmiş arama filtreleri
- 📊 **Data Visualization** - İnteraktif grafikler

## 🔒 Güvenlik

- ✅ TypeScript tip güvenliği
- ✅ Client-side form validation
- ✅ Secure authentication flow
- ✅ Protected routes
- ✅ Input sanitization

## 📈 Performance

- ⚡ Static page generation
- 🗜️ Automatic code splitting
- 🖼️ Image optimization
- 📦 Bundle optimization
- 🚀 Fast refresh development

## 🧪 Test Kullanıcısı

Development modunda otomatik test kullanıcısı:
- **Email**: test@eczane.com
- **Role**: Pharmacy
- **Company**: Test Eczanesi

## 📞 Destek

Herhangi bir sorun için GitHub Issues kullanın veya development team ile iletişime geçin.

---

**© 2024 FarmaDepom - Tüm hakları saklıdır.**
