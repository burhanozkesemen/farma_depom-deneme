'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Building, Mail, Phone, MapPin, CreditCard, User } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { UserRole } from '@/src/types';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'pharmacy' as UserRole,
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    taxId: '',
    address: '',
    phone: '',
    kvkkConsent: false,
    termsConsent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (!formData.kvkkConsent || !formData.termsConsent) {
      setError('Lütfen tüm sözleşmeleri onaylayın');
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        companyName: formData.companyName,
        taxId: formData.taxId,
        address: formData.address,
        phone: formData.phone,
      });
      router.push('/dashboard');
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.role || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Lütfen tüm alanları doldurun');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Şifreler eşleşmiyor');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FR</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FarmazonRx</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Yeni hesap oluşturun
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <button
            onClick={() => router.push('/login')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Giriş yapın
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`flex-1 h-2 rounded-full ml-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`flex-1 h-2 rounded-full ml-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Hesap Bilgileri</span>
              <span>Şirket Bilgileri</span>
              <span>Onay</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Üyelik Türü
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="role"
                        value="pharmacy"
                        checked={formData.role === 'pharmacy'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors ${
                        formData.role === 'pharmacy' 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <User className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">Eczane</div>
                        <div className="text-sm text-gray-500">Alıcı</div>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="role"
                        value="warehouse"
                        checked={formData.role === 'warehouse'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors ${
                        formData.role === 'warehouse' 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <Building className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">Depo</div>
                        <div className="text-sm text-gray-500">Satıcı</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-posta Adresi
                  </label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ornek@firma.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Şifre
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pr-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="En az 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Şifre Tekrar
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Şifrenizi tekrar girin"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    {formData.role === 'pharmacy' ? 'Eczane Adı' : 'Firma Adı'}
                  </label>
                  <div className="mt-1 relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={formData.role === 'pharmacy' ? 'Şifa Eczanesi' : 'ABC İlaç Deposu'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                    Vergi Kimlik Numarası
                  </label>
                  <div className="mt-1 relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="taxId"
                      name="taxId"
                      type="text"
                      required
                      value={formData.taxId}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <div className="mt-1 relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+90 555 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Adres
                  </label>
                  <div className="mt-1 relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tam adres bilgileri..."
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Özet</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Üyelik Türü:</dt>
                      <dd className="text-gray-900">{formData.role === 'pharmacy' ? 'Eczane' : 'Depo'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">E-posta:</dt>
                      <dd className="text-gray-900">{formData.email}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Firma:</dt>
                      <dd className="text-gray-900">{formData.companyName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">VKN:</dt>
                      <dd className="text-gray-900">{formData.taxId}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      id="kvkkConsent"
                      name="kvkkConsent"
                      type="checkbox"
                      checked={formData.kvkkConsent}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="kvkkConsent" className="ml-3 text-sm text-gray-700">
                      <button
                        type="button"
                        onClick={() => router.push('/privacy')}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        KVKK Aydınlatma Metnini
                      </button>
                      {' '}okudum ve kabul ediyorum.
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="termsConsent"
                      name="termsConsent"
                      type="checkbox"
                      checked={formData.termsConsent}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="termsConsent" className="ml-3 text-sm text-gray-700">
                      <button
                        type="button"
                        onClick={() => router.push('/terms')}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Üyelik Sözleşmesini
                      </button>
                      {' '}okudum ve kabul ediyorum.
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Geri
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 ${
                    step === 1 ? 'w-full' : 'ml-auto'
                  }`}
                >
                  İleri
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Oluşturuluyor...' : 'Hesabı Oluştur'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;