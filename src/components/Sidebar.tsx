import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
}

const menuItems = [
  { id: 'chats', icon: 'MessageCircle', label: 'Чаты', badge: 5 },
  { id: 'contacts', icon: 'Users', label: 'Контакты' },
  { id: 'notifications', icon: 'Bell', label: 'Уведомления', badge: 12 },
  { id: 'settings', icon: 'Settings', label: 'Настройки' },
];

export default function Sidebar({ activeTab, onTabChange, onProfileClick }: SidebarProps) {
  return (
    <div className="w-20 h-full bg-gradient-to-b from-gradient-purple via-messenger-purple to-gradient-blue flex flex-col items-center py-6 gap-4">
      <button
        onClick={onProfileClick}
        className="mb-4 group relative"
      >
        <Avatar className="h-12 w-12 border-2 border-white/20 transition-transform group-hover:scale-110">
          <AvatarImage src="" />
          <AvatarFallback className="bg-white/10 text-white font-semibold backdrop-blur">
            ВП
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gradient-purple" />
      </button>

      <div className="h-px w-10 bg-white/10 my-2" />

      <nav className="flex-1 flex flex-col gap-2 w-full px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'relative flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all group',
              activeTab === item.id
                ? 'bg-white/20 backdrop-blur'
                : 'hover:bg-white/10'
            )}
            title={item.label}
          >
            <Icon
              name={item.icon as any}
              size={24}
              className={cn(
                'transition-transform group-hover:scale-110',
                activeTab === item.id ? 'text-white' : 'text-white/70'
              )}
            />
            {item.badge && (
              <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl text-white/70 hover:text-white hover:bg-white/10"
        title="Выход"
      >
        <Icon name="LogOut" size={20} />
      </Button>
    </div>
  );
}
