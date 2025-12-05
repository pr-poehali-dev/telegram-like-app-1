import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    avatar: '',
    lastMessage: 'Привет! Как дела? 👋',
    time: '14:23',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Команда разработки',
    avatar: '',
    lastMessage: 'Созвон через 15 минут',
    time: '13:45',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Дмитрий Иванов',
    avatar: '',
    lastMessage: 'Отправил файлы',
    time: '12:10',
    unread: 5,
    online: true,
  },
  {
    id: 4,
    name: 'Елена Петрова',
    avatar: '',
    lastMessage: 'Спасибо за помощь!',
    time: 'Вчера',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'Проект Альфа',
    avatar: '',
    lastMessage: 'Новый дизайн готов ✨',
    time: 'Вчера',
    unread: 1,
    online: false,
  },
];

interface ChatListProps {
  onChatSelect: (chat: Chat) => void;
  selectedChatId: number | null;
}

export default function ChatList({ onChatSelect, selectedChatId }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-none rounded-xl"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={cn(
                'w-full p-3 rounded-xl flex items-start gap-3 transition-all hover:bg-muted/50',
                selectedChatId === chat.id && 'bg-accent hover:bg-accent'
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-gradient-purple to-gradient-blue text-white font-medium">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
