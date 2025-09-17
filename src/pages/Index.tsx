import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const guildMembers = [
    { name: "Sazuke_", rank: "Владелец", status: "online" },
    { name: "_user1945", rank: "Билдер", status: "online" },
    { name: "Kevuab", rank: "Билдер", status: "offline" },
    { name: "assuming_", rank: "Модератор", status: "online" },
    { name: "qwxsik_", rank: "Модератор", status: "offline" }
  ];

  const achievements = [
    {
      title: "Epic Explorer",
      description: "Исследовано 10+ новых биомов",
      icon: "MapPin",
      rarity: "legendary"
    },
    {
      title: "Master Builder",
      description: "Построено 50+ уникальных зданий",
      icon: "Building",
      rarity: "epic"
    },
    {
      title: "Guild Leader",
      description: "Основание гильдии XTRA",
      icon: "Crown",
      rarity: "legendary"
    },
    {
      title: "Resource King",
      description: "Добыто 100K+ ресурсов",
      icon: "Pickaxe",
      rarity: "rare"
    }
  ];

  const guildStats = [
    { label: "Участников", value: "5", icon: "Users" },
    { label: "Построек", value: "127", icon: "Building2" },
    { label: "Достижений", value: "45", icon: "Trophy" },
    { label: "Дней активности", value: "234", icon: "Calendar" }
  ];

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Владелец": return "bg-neon-green text-dark-bg";
      case "Модератор": return "bg-neon-pink text-white";
      case "Билдер": return "bg-neon-blue text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "border-neon-green bg-neon-green/10";
      case "epic": return "border-neon-pink bg-neon-pink/10";
      case "rare": return "border-neon-blue bg-neon-blue/10";
      default: return "border-muted bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dark-bg via-dark-card to-dark-surface">
        <div className="absolute inset-0 opacity-20 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FF88' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 font-['Orbitron'] bg-gradient-to-r from-neon-green via-neon-pink to-neon-blue bg-clip-text text-transparent">
              GUILD XTRA
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Элитная Minecraft гильдия с богатой историей побед и невероятных построек
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {guildStats.map((stat, index) => (
                <Card key={index} className="bg-dark-card border-border hover:border-primary transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-2">
                      <Icon name={stat.icon} size={24} className="text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button size="lg" className="bg-neon-green text-dark-bg hover:bg-neon-green/90 font-semibold px-8">
              <Icon name="Sword" size={20} className="mr-2" />
              Присоединиться к гильдии
            </Button>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-['Orbitron'] text-primary">Достижения гильдии</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наши главные победы и достижения в мире Minecraft
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className={`bg-dark-card border-2 ${getRarityColor(achievement.rarity)} hover:scale-105 transition-all duration-300`}>
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon name={achievement.icon} size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <Badge variant="outline" className={`${getRarityColor(achievement.rarity)} border-current`}>
                  {achievement.rarity}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guild Members Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center font-['Orbitron'] text-primary">Участники гильдии</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guildMembers.map((member, index) => (
              <Card key={index} className="bg-dark-card border-border hover:border-primary transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{member.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-neon-green' : 'bg-gray-500'}`}></div>
                          <span className="text-sm text-muted-foreground">
                            {member.status === 'online' ? 'В сети' : 'Не в сети'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getRankColor(member.rank)} w-full justify-center font-medium`}>
                    {member.rank}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rules & News Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-dark-card border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Icon name="ScrollText" size={24} className="text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">Правила гильдии</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-neon-green mr-2 mt-1 flex-shrink-0" />
                  Уважение к другим участникам обязательно
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-neon-green mr-2 mt-1 flex-shrink-0" />
                  Запрещено разрушение чужих построек
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-neon-green mr-2 mt-1 flex-shrink-0" />
                  Активность в Discord и на сервере
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-neon-green mr-2 mt-1 flex-shrink-0" />
                  Помощь новичкам и поддержка команды
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Icon name="Newspaper" size={24} className="text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">Последние новости</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-neon-green pl-4">
                  <h4 className="font-semibold text-foreground">Новый мега-проект!</h4>
                  <p className="text-sm text-muted-foreground">Начато строительство огромного замка в новом биоме.</p>
                  <span className="text-xs text-neon-green">2 дня назад</span>
                </div>
                <div className="border-l-4 border-neon-pink pl-4">
                  <h4 className="font-semibold text-foreground">Турнир по PvP</h4>
                  <p className="text-sm text-muted-foreground">Победитель получит уникальное снаряжение!</p>
                  <span className="text-xs text-neon-pink">5 дней назад</span>
                </div>
                <div className="border-l-4 border-neon-blue pl-4">
                  <h4 className="font-semibold text-foreground">Обновление сервера</h4>
                  <p className="text-sm text-muted-foreground">Добавлены новые плагины и возможности.</p>
                  <span className="text-xs text-neon-blue">1 неделя назад</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Icon name="MessageSquare" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Icon name="Users" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Icon name="Globe" size={20} />
            </Button>
          </div>
          <p className="text-muted-foreground">
            © 2024 Guild XTRA. Создано с ❤️ для лучшего Minecraft сообщества
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;