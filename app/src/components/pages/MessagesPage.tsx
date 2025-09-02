'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { Search, Send, MoreVertical } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState('Nimolai');
  const [messageText, setMessageText] = useState('');

  if (!user) {
    return null;
  }

  const conversations = [
    {
      id: 1,
      name: 'Nimolai',
      lastMessage: 'DUN GECE NÖNETÇIYIK 5 ADET VAR. UYGUN OLUR MU SIZIN...',
      time: '25 Ağu - 15:33',
      unread: true
    },
    {
      id: 2,
      name: 'mugemedikal',
      lastMessage: '?',
      time: '23 Ağu - 15:24',
      unread: false
    },
    {
      id: 3,
      name: 'YASAMECZ',
      lastMessage: 'merhaba geçleme için özür dileriz kargonuz bugün çıkar yola',
      time: '2 Ağu - 10:50',
      unread: false
    },
    {
      id: 4,
      name: 'gozdeecza',
      lastMessage: 'SİPARİŞİMİZİ ACİL KARGOYA VEREBİLİR MİSİNİZ? HASTAMIZ BEKLİYOR.',
      time: '11 Ağu - 12:38',
      unread: false
    }
  ];

  const currentChat = conversations.find(conv => conv.name === selectedChat);

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span>Anasayfa</span>
            <span className="mx-2">›</span>
            <span>Profil</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Mesajlarım</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200" style={{ height: '600px' }}>
        {/* Left Sidebar - Conversations */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Mesajlarım</h1>
            
            {/* Search */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Kullanıcı ara"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.name)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === conversation.name ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className={`text-sm mt-1 truncate ${conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full ml-2 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                {selectedChat.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-medium text-gray-900">{selectedChat}</h2>
                <p className="text-sm text-gray-500">Aktif</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="flex justify-center mb-4">
              <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border">
                26 Ağustos 2025
              </span>
            </div>

            {/* Received Message */}
            <div className="mb-6">
              <div className="bg-white rounded-lg p-4 max-w-md shadow-sm">
                <p className="text-gray-900">DUN GECE NÖNETÇIYIK 5 ADET VAR. UYGUN OLUR MU SIZIN IÇIN ?</p>
                <div className="text-xs text-gray-500 mt-2">
                  Okundu | 26.08.2025 | 15:33
                </div>
              </div>
            </div>

            {/* Info Message */}
            <div className="text-center text-sm text-gray-500 mb-6">
              Nimolai ile aktif siparişiniz bulunmuyor.
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Mesajınızı yazınız"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={() => {
                  if (messageText.trim()) {
                    setMessageText('');
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
