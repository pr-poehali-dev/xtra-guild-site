import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ProfileBackground {
  id: string;
  name: string;
  gradient: string;
  pattern?: string;
}

interface ProfileTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  rank: string;
  xp: number;
  maxXp: number;
  achievements: number;
  builds: number;
  background: ProfileBackground;
  theme: ProfileTheme;
  status: 'online' | 'offline' | 'away';
  title: string;
  joinDate: string;
}

const backgrounds: ProfileBackground[] = [
  {
    id: 'neon-city',
    name: 'Неоновый город',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.3) 0%, transparent 50%)'
  },
  {
    id: 'cyber-matrix',
    name: 'Кибер матрица',
    gradient: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 136, 0.1) 2px, rgba(0, 255, 136, 0.1) 4px)'
  },
  {
    id: 'space-nebula',
    name: 'Космическая туманность',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #5d4e75 50%, #b4a7d6 100%)',
    pattern: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 60%)'
  }
];

const themes: ProfileTheme[] = [
  {
    id: 'neon-green',
    name: 'Неоновый зелёный',
    colors: { primary: '#00FF88', secondary: '#00CC6A', accent: '#88FFB8' }
  },
  {
    id: 'cyber-blue',
    name: 'Кибер синий',
    colors: { primary: '#00D9FF', secondary: '#0099CC', accent: '#88E5FF' }
  },
  {
    id: 'royal-purple',
    name: 'Королевский фиолетовый',
    colors: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#C4B5FD' }
  }
];

interface AnimatedAvatarProps {
  src: string;
  size?: number;
  status: 'online' | 'offline' | 'away';
  rank: string;
  isAnimated?: boolean;
}

function AnimatedAvatar({ src, size = 80, status, rank, isAnimated = true }: AnimatedAvatarProps) {
  const statusColors = {
    online: '#00FF88',
    away: '#FFB800',
    offline: '#666'
  };

  return (
    <div className="relative">
      {/* Outer Glow Ring */}
      <div 
        className={`absolute inset-0 rounded-full ${isAnimated ? 'animate-pulse' : ''}`}
        style={{
          background: `conic-gradient(from 0deg, ${statusColors[status]}, transparent, ${statusColors[status]})`,
          padding: '3px',
          filter: 'blur(2px)'
        }}
      />
      
      {/* Main Avatar Container */}
      <div 
        className="relative bg-dark-card rounded-full p-1"
        style={{ width: size + 6, height: size + 6 }}
      >
        {/* Rotating Border */}
        <div 
          className={`absolute inset-0 rounded-full ${isAnimated ? 'animate-spin' : ''}`}
          style={{
            background: `conic-gradient(from 0deg, ${statusColors[status]}, transparent, ${statusColors[status]})`,
            animation: isAnimated ? 'spin 3s linear infinite' : 'none'
          }}
        />
        
        {/* Avatar Image */}
        <div 
          className="relative bg-dark-surface rounded-full overflow-hidden"
          style={{ width: size, height: size }}
        >
          <img
            src={src}
            alt="Avatar"
            className={`w-full h-full object-cover ${isAnimated ? 'hover:scale-110' : ''} transition-transform duration-300`}
          />
          
          {/* Status Indicator */}
          <div 
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-dark-card"
            style={{ backgroundColor: statusColors[status] }}
          />
        </div>
      </div>
      
      {/* Rank Badge */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
        {rank}
      </div>
    </div>
  );
}

interface CustomProfileProps {
  profile: UserProfile;
  isOwn?: boolean;
  onEditProfile?: () => void;
}

export default function CustomProfile({ profile, isOwn = false, onEditProfile }: CustomProfileProps) {
  const [isHovered, setIsHovered] = useState(false);

  const xpPercentage = (profile.xp / profile.maxXp) * 100;

  return (
    <div 
      className="relative overflow-hidden rounded-3xl border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:scale-105"
      style={{
        background: `${profile.background.gradient}${profile.background.pattern ? `, ${profile.background.pattern}` : ''}`,
        boxShadow: isHovered ? `0 20px 40px rgba(${profile.theme.colors.primary === '#00FF88' ? '0, 255, 136' : '0, 217, 255'}, 0.3)` : '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30 animate-float"
            style={{
              background: profile.theme.colors.accent,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="relative p-8 pb-4">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <AnimatedAvatar
              src={profile.avatar}
              size={100}
              status={profile.status}
              rank={profile.rank}
              isAnimated={true}
            />
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {profile.username}
              </h2>
              <p className="text-lg text-white/80 mb-2">{profile.title}</p>
              <div className="flex items-center gap-2 text-white/70">
                <Icon name="Calendar" size={16} />
                <span>В гильдии с {profile.joinDate}</span>
              </div>
            </div>
          </div>
          
          {isOwn && (
            <button
              onClick={onEditProfile}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              <Icon name="Settings" size={20} className="text-white" />
            </button>
          )}
        </div>

        {/* Level & XP Bar */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Уровень {profile.level}</span>
            <span className="text-white/80 text-sm">{profile.xp} / {profile.maxXp} XP</span>
          </div>
          <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${xpPercentage}%`,
                background: `linear-gradient(90deg, ${profile.theme.colors.primary}, ${profile.theme.colors.secondary})`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-black/30 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">{profile.achievements}</div>
            <div className="text-white/70 text-sm">Достижения</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-black/30 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">{profile.builds}</div>
            <div className="text-white/70 text-sm">Постройки</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-black/30 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">{profile.level}</div>
            <div className="text-white/70 text-sm">Уровень</div>
          </div>
        </div>
      </div>

      {/* Glowing Border Effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent, ${profile.theme.colors.primary}40, transparent)`,
          filter: 'blur(1px)'
        }}
      />
    </div>
  );
}