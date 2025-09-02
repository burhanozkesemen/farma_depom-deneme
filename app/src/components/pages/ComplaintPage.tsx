'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Flag, Send } from 'lucide-react';

const ComplaintPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [complaintData, setComplaintData] = useState({
    reason: '',
    description: '',
    reportedUser: ''
  });

  // Get reported user from URL params
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    if (userParam) {
      setComplaintData(prev => ({ ...prev, reportedUser: userParam }));
    }
  }, []);

  if (!user) {
    return null;
  }

  const complaintReasons = [
    'Uygunsuz İçerik',
    'Spam/Reklam',
    'Dolandırıcılık',
    'Hakaret/Küfür',
    'Sahte Profil',
    'Telif Hakkı İhlali',
    'Diğer'
  ];

  const handleSubmit = () => {
    if (!complaintData.reason || !complaintData.description) {
      alert('Lütfen şikayet sebebini ve açıklamayı doldurun!');
      return;
    }
    
    alert('Şikayetiniz başarıyla gönderildi. En kısa sürede değerlendirilecektir.');
    router.push('/messages');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-red-500" />
              <h1 className="text-xl font-semibold text-gray-900">Şikayet Et</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Kullanıcı Şikayeti</h2>
            <p className="text-gray-600">Lütfen şikayetinizin detaylarını belirtin. Tüm şikayetler incelenir ve gerekli işlemler yapılır.</p>
          </div>

          <div className="space-y-6">
            {/* Reported User */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şikayet Edilen Kullanıcı
              </label>
              <input
                type="text"
                value={complaintData.reportedUser}
                onChange={(e) => setComplaintData(prev => ({ ...prev, reportedUser: e.target.value }))}
                placeholder="Kullanıcı adını girin"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Complaint Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şikayet Sebebi <span className="text-red-500">*</span>
              </label>
              <select
                value={complaintData.reason}
                onChange={(e) => setComplaintData(prev => ({ ...prev, reason: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700"
              >
                <option value="">Şikayet sebebini seçin</option>
                {complaintReasons.map((reason) => (
                  <option key={reason} value={reason} className="text-gray-900">
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama <span className="text-red-500">*</span>
              </label>
              <textarea
                value={complaintData.description}
                onChange={(e) => setComplaintData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Şikayetinizin detaylarını açıklayın..."
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <Flag className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Önemli Uyarı</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Yanlış veya asılsız şikayetler hesabınıza kısıtlama getirebilir. 
                    Lütfen şikayetinizin geçerli olduğundan emin olun.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Şikayeti Gönder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
