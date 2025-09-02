# FarmaDepom - B2B İlaç Tedarik Platformu

## 🚀 Proje Özeti

FarmaDepom, eczaneler ve ilaç depolarının dijital ticaretini kolaylaştıran modern bir B2B platform. Next.js 14 App Router ile geliştirilmiş, tam TypeScript desteği ile güvenli ve ölçeklenebilir bir e-ticaret çözümü.

## ✨ Özellikler

### 🏥 Kullanıcı Rolleri
- **Eczane**: Ürün arama, sipariş verme, stok takibi
- **Depo**: Ürün yönetimi, sipariş alma, envanter kontrolü  
- **Admin**: Sistem yönetimi, kullanıcı onaylama, raporlama

### 🛒 Mevcut Fonksiyonlar
- ✅ Modern responsive UI/UX tasarımı
- ✅ Ürün kataloğu ve kategori sistemi
- ✅ Sepet yönetimi (Context API ile)
- ✅ Kullanıcı authentication sistemi
- ✅ Prisma ORM ile PostgreSQL entegrasyonu
- ✅ Detaylı database schema (RBAC, envanter, sipariş sistemi)

### 🎯 Özel Sayfalar
- 🏷️ **Uygun Fiyat Ürünleri** - Ekonomik seçenekler
- ⏰ **Yakın Miat Ürünleri** - Son kullanma tarihi yaklaşan ürünler
- 🏪 **Tüm Depolar** - Depo listesi ve bilgileri
- 💊 **OTC İlaçlar** - Reçetesiz satılan ilaçlar
- 🏥 **İlaç Kategorileri** - Hiyerarşik kategori yapısı

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
- **CSV Parse** - Data import functionality

### Development
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **TypeScript** - Static typing
- **ES Modules** - Modern module system

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
# .env.local dosyası oluşturun ve DATABASE_URL'i ayarlayın
# DATABASE_URL="postgresql://username:password@localhost:5432/farmadepom"

# Database setup
npm run prisma:generate
npm run prisma:migrate
npm run db:seed

# Development server
npm run dev
```

### Ek Komutlar
```bash
# Production build
npm run build

# Production server
npm run start

# Prisma Studio (Database GUI)
npm run prisma:studio

# Linting
npm run lint
```

## 📱 Sayfa Yapısı

### Ana Sayfalar
- `/` - Ana sayfa ve ürün vitrin
- `/login` - Kullanıcı giriş sayfası
- `/register` - Yeni kullanıcı kaydı
- `/contact` - İletişim sayfası

### Ürün ve Kategori Sayfaları
- `/products` - Ürün kataloğu
- `/medicine-categories` - İlaç kategorileri
- `/cart` - Sepet yönetimi

### Özel Ürün Sayfaları
- `/affordable-prices` - Uygun fiyatlı ürünler
- `/near-expiry` - Yakın miat tarihli ürünler
- `/otc-medicines` - Reçetesiz ilaçlar
- `/all-warehouses` - Depo listesi

### Kullanıcı Sayfaları
- `/dashboard` - Kullanıcı paneli
- `/profile` - Profil ayarları

### Yasal Sayfalar
- `/privacy` - Gizlilik politikası
- `/terms` - Kullanım şartları

## 🔧 API Endpoints

### Products
- `GET /api/products` - Ürün listesi
- `GET /api/products/[id]` - Ürün detayı
- `GET /api/products/near-expiry` - Yakın miat ürünleri

### Categories
- `GET /api/categories` - Kategori listesi
- `GET /api/categories/[id]/products` - Kategoriye göre ürünler

### Health Check
- `GET /api/health` - Sistem durumu kontrolü

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

## 📊 Database Schema

### Ana Tablolar
- **User & Role** - RBAC tabanlı kullanıcı yönetimi
- **Pharmacy & Warehouse** - Eczane ve depo bilgileri
- **Product & Category** - Hiyerarşik ürün kategorileri
- **Manufacturer** - Üretici firmaları
- **Batch & Inventory** - Lot takibi ve envanter yönetimi
- **Order & OrderItem** - Sipariş sistemi
- **Price** - Dinamik fiyatlandırma
- **Shipment & Payment** - Kargo ve ödeme takibi

## 🧪 Development

### Seed Data
Proje `prisma/seed.js` ile örnek verilerle başlatılabilir:
```bash
npm run db:seed
```

## 🚧 Proje Durumu

**Mevcut Durum**: Development aşamasında
- ✅ Temel sayfa yapısı tamamlandı
- ✅ Database schema tasarlandı
- ✅ Component yapısı oluşturuldu
- ⏳ API endpoints geliştiriliyor
- ⏳ Authentication sistemi entegrasyonu
- ⏳ Sipariş ve ödeme sistemi

## 📞 Destek

Herhangi bir sorun için GitHub Issues kullanın veya development team ile iletişime geçin.

---

**© 2024 FarmaDepom - Tüm hakları saklıdır.**
