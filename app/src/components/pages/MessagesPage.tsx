'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Search, Send, MoreVertical, Trash2, Archive, Flag } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState('Nimolai');
  const [messageText, setMessageText] = useState('');
  const [allMessages, setAllMessages] = useState<Record<string, Array<{
    id: number;
    sender: string;
    text: string;
    time: string;
    isRead: boolean;
  }>>>({
    'Nimolai': [
      {
        id: 1,
        sender: 'Nimolai',
        text: 'DUN GECE NÖNETÇIYIK 5 ADET VAR. UYGUN OLUR MU SIZIN IÇIN ?',
        time: '26.08.2025 | 15:33',
        isRead: true
      }
    ],
    'mugemedikal': [
      {
        id: 2,
        sender: 'mugemedikal',
        text: '?',
        time: '23.08.2025 | 15:24',
        isRead: true
      }
    ],
    'YASAMECZ': [
      {
        id: 3,
        sender: 'YASAMECZ',
        text: 'merhaba geçleme için özür dileriz kargonuz bugün çıkar yola',
        time: '02.08.2025 | 10:50',
        isRead: true
      }
    ],
    'gozdeecza': [
      {
        id: 4,
        sender: 'gozdeecza',
        text: 'SİPARİŞİMİZİ ACİL KARGOYA VEREBİLİR MİSİNİZ? HASTAMIZ BEKLİYOR.',
        time: '11.08.2025 | 12:38',
        isRead: true
      }
    ]
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [conversations, setConversations] = useState([
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
  ]);

  if (!user) {
    return null;
  }

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
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button 
                    onClick={() => {
                      setShowDropdown(false);
                      router.push(`/complaint?user=${encodeURIComponent(selectedChat)}`);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Şikayet Et</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`${selectedChat} ile olan tüm konuşmayı silmek istediğinizden emin misiniz?`)) {
                        // Remove messages
                        setAllMessages(prev => {
                          const newMessages = { ...prev };
                          delete newMessages[selectedChat];
                          return newMessages;
                        });
                        // Remove from conversations list and select next conversation
                        setConversations(prev => {
                          const remainingConversations = prev.filter(conv => conv.name !== selectedChat);
                          if (remainingConversations.length > 0) {
                            setSelectedChat(remainingConversations[0].name);
                          } else {
                            setSelectedChat('');
                          }
                          return remainingConversations;
                        });
                        alert('Konuşma tamamen silindi!');
                        setShowDropdown(false);
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Konuşmayı Sil</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Bu konuşmayı arşivlemek istediğinizden emin misiniz?')) {
                        alert('Konuşma arşivlendi!');
                        setShowDropdown(false);
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Arşivle</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="flex justify-center mb-4">
              <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border">
                26 Ağustos 2025
              </span>
            </div>

            {/* Messages */}
            {(allMessages[selectedChat] || []).map((message) => (
              <div 
                key={message.id} 
                className="mb-6 cursor-pointer"
                onClick={() => alert(`Mesaj detayı:\n\nGönderen: ${message.sender}\nTarih: ${message.time}\nMesaj: ${message.text}`)}
              >
                <div className="bg-white rounded-lg p-4 max-w-md shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-900">{message.text}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {message.isRead ? 'Okundu' : 'Okunmadı'} | {message.time}
                  </div>
                </div>
              </div>
            ))}

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
                    const newMessage = {
                      id: Date.now(),
                      sender: 'Ben',
                      text: messageText,
                      time: new Date().toLocaleDateString('tr-TR') + ' | ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                      isRead: false
                    };
                    setAllMessages(prev => ({
                      ...prev,
                      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
                    }));
                    setMessageText('');
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!messageText.trim()}
              >
                <Send className="w-4 h-4" />
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
