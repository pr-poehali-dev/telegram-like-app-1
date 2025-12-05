import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

interface ChatWindowProps {
  chat: Chat | null;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:20', isMine: false, status: 'read' },
  { id: 2, text: 'Привет! Всё отлично, спасибо 😊', time: '14:21', isMine: true, status: 'read' },
  { id: 3, text: 'Можем обсудить проект?', time: '14:22', isMine: false, status: 'read' },
  { id: 4, text: 'Конечно! Давай созвонимся в 15:00?', time: '14:23', isMine: true, status: 'delivered' },
];

export default function ChatWindow({ chat }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-muted/30 to-accent/20">
        <div className="text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gradient-purple to-gradient-blue rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={64} className="text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Выберите чат</h2>
          <p className="text-muted-foreground">Начните общение с друзьями и коллегами</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-gradient-purple to-gradient-blue text-white font-medium">
              {chat.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">{chat.name}</h3>
            <p className="text-xs text-muted-foreground">
              {chat.online ? '🟢 В сети' : 'Не в сети'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={cn(
                'flex animate-fade-in',
                msg.isMine ? 'justify-end' : 'justify-start'
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={cn(
                  'max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm',
                  msg.isMine
                    ? 'bg-gradient-to-br from-gradient-purple to-gradient-blue text-white rounded-br-md'
                    : 'bg-card border border-border rounded-bl-md'
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={cn(
                  'flex items-center gap-1 mt-1 text-xs',
                  msg.isMine ? 'text-white/70 justify-end' : 'text-muted-foreground'
                )}>
                  <span>{msg.time}</span>
                  {msg.isMine && msg.status === 'read' && (
                    <Icon name="CheckCheck" size={14} className="text-green-300" />
                  )}
                  {msg.isMine && msg.status === 'delivered' && (
                    <Icon name="CheckCheck" size={14} />
                  )}
                  {msg.isMine && msg.status === 'sent' && (
                    <Icon name="Check" size={14} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent shrink-0">
            <Icon name="Paperclip" size={20} />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Написать сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="pr-20 rounded-xl bg-muted/50 border-none resize-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-accent/50">
                <Icon name="Smile" size={18} />
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleSend}
            size="icon"
            className="rounded-full bg-gradient-to-br from-gradient-purple to-gradient-blue hover:opacity-90 shrink-0"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
