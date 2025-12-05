import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import ProfilePanel from '@/components/ProfilePanel';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleChatSelect = (chat: any) => {
    setSelectedChat({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar,
      online: chat.online,
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileClick={() => setShowProfile(!showProfile)}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'chats' && (
          <>
            <div className="w-96">
              <ChatList
                onChatSelect={handleChatSelect}
                selectedChatId={selectedChat?.id || null}
              />
            </div>
            <div className="flex-1">
              <ChatWindow chat={selectedChat} />
            </div>
          </>
        )}

        {activeTab === 'contacts' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gradient-purple to-gradient-blue rounded-full flex items-center justify-center">
                <span className="text-4xl">👥</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Контакты</h2>
              <p className="text-muted-foreground">Ваши контакты появятся здесь</p>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gradient-purple to-gradient-blue rounded-full flex items-center justify-center">
                <span className="text-4xl">🔔</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Уведомления</h2>
              <p className="text-muted-foreground">У вас нет новых уведомлений</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gradient-purple to-gradient-blue rounded-full flex items-center justify-center">
                <span className="text-4xl">⚙️</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Настройки</h2>
              <p className="text-muted-foreground">Настройте приложение под себя</p>
            </div>
          </div>
        )}
      </div>

      {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
    </div>
  );
}
