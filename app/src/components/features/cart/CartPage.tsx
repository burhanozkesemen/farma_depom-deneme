'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { useAuth } from '@/src/context/AuthContext';

const CartPage: React.FC = () => {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Simulate order creation
    alert('Sipariş başarıyla oluşturuldu! Onay için depo tarafından incelenecek.');
    clearCart();
    router.push('/dashboard');
  };

  if (!user || user.role !== 'pharmacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Erişim Engellendi</h2>
          <p className="text-gray-600 mt-2">Bu sayfaya sadece eczaneler erişebilir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.push('/products')}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Alışverişe Devam Et
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Sepetim</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sepetiniz boş</h3>
          <p className="text-gray-600 mb-6">Ürün kataloğuna göz atın ve ihtiyacınız olan ilaçları sepete ekleyin.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Ürünleri Keşfet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sepet ({items.length} ürün)
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="px-6 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image || 'https://images.pexels.com/photos/163944/pharmaceuticals-medicine-bottle-health-163944.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Etken Madde: {item.activeIngredient}
                        </p>
                        <p className="text-sm text-gray-600">
                          Barkod: #{item.barcode}
                        </p>
                        <p className="text-sm text-gray-600">
                          Satıcı: {item.warehouseName}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-12 text-center text-gray-900 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity >= (item.stock || 0)}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-0">
                          <p className="text-lg font-semibold text-gray-900">
                            ₺{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₺{item.price.toFixed(2)} / adet
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {item.quantity >= (item.stock || 0) && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                        <strong>Uyarı:</strong> Stok miktarına ulaştınız. Maksimum {item.stock} adet.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Sipariş Özeti</h3>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ürün Tutarı:</span>
                  <span className="text-gray-900">₺{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">KDV (%18):</span>
                  <span className="text-gray-900">₺{(getTotal() * 0.18).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Toplam:</span>
                  <span className="text-gray-900">₺{(getTotal() * 1.18).toFixed(2)}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sipariş Notları</h4>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Özel talepleriniz varsa buraya yazabilirsiniz..."
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Bilgi:</strong> Siparişiniz onaylanmak üzere ilgili depoya gönderilecek. 
                    Onaylandıktan sonra kargo süreci başlayacaktır.
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Siparişi Tamamla
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Siparişinizi tamamlayarak satış koşullarını kabul etmiş olursunuz.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;