import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ProfilePanelProps {
  onClose: () => void;
}

export default function ProfilePanel({ onClose }: ProfilePanelProps) {
  return (
    <div className="w-96 h-full bg-card border-l border-border flex flex-col animate-slide-in-right">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Профиль</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full hover:bg-accent"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-28 w-28 border-4 border-accent">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-gradient-purple to-gradient-blue text-white text-3xl font-bold">
                  ВП
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-110">
                <Icon name="Camera" size={16} />
              </button>
            </div>
            <h3 className="text-xl font-semibold mb-1">Ваше Имя</h3>
            <p className="text-sm text-muted-foreground mb-3">@username</p>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              В сети
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Информация
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-accent rounded-lg">
                    <Icon name="Phone" size={18} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Телефон</p>
                    <p className="text-sm font-medium">+7 (900) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-accent rounded-lg">
                    <Icon name="Mail" size={18} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">user@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-accent rounded-lg">
                    <Icon name="MapPin" size={18} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Город</p>
                    <p className="text-sm font-medium">Москва, Россия</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Настройки
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Icon name="Bell" size={18} className="text-accent-foreground" />
                    </div>
                    <Label htmlFor="notifications" className="text-sm font-medium cursor-pointer">
                      Уведомления
                    </Label>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Icon name="Moon" size={18} className="text-accent-foreground" />
                    </div>
                    <Label htmlFor="dark-mode" className="text-sm font-medium cursor-pointer">
                      Темная тема
                    </Label>
                  </div>
                  <Switch id="dark-mode" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Icon name="Shield" size={18} className="text-accent-foreground" />
                    </div>
                    <Label htmlFor="privacy" className="text-sm font-medium cursor-pointer">
                      Приватность
                    </Label>
                  </div>
                  <Switch id="privacy" defaultChecked />
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-gradient-purple to-gradient-blue hover:opacity-90 rounded-xl">
              <Icon name="Edit" size={18} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
