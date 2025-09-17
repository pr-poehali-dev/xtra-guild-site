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
  username: string;
  title: string;
  avatar: string;
  background: ProfileBackground;
  theme: ProfileTheme;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
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
  },
  {
    id: 'fire-storm',
    name: 'Огненная буря',
    gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff006e 100%)',
    pattern: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
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
  },
  {
    id: 'fire-orange',
    name: 'Огненный оранжевый',
    colors: { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFB366' }
  }
];

const avatarOptions = [
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100'
];

export default function ProfileModal({ isOpen, onClose, profile, onSave }: ProfileModalProps) {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'backgrounds'>('general');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-dark-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Редактирование профиля</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-surface rounded-full transition-colors"
          >
            <Icon name="X" size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-6 border-b border-border">
          <div 
            className="relative overflow-hidden rounded-2xl p-6 mb-4"
            style={{
              background: `${editedProfile.background.gradient}${editedProfile.background.pattern ? `, ${editedProfile.background.pattern}` : ''}`,
              minHeight: '200px'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={editedProfile.avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full border-4 border-white/20"
                />
                <div 
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: editedProfile.theme.colors.primary }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {editedProfile.username}
                </h3>
                <p className="text-white/80">{editedProfile.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {[
            { id: 'general', label: 'Общие', icon: 'User' },
            { id: 'appearance', label: 'Внешний вид', icon: 'Palette' },
            { id: 'backgrounds', label: 'Фоны', icon: 'Image' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={editedProfile.username}
                  onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-surface border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Титул
                </label>
                <input
                  type="text"
                  value={editedProfile.title}
                  onChange={(e) => setEditedProfile({ ...editedProfile, title: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-surface border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Например: Мастер строитель"
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Аватар
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {avatarOptions.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => setEditedProfile({ ...editedProfile, avatar })}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                        editedProfile.avatar === avatar
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Цветовая тема
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setEditedProfile({ ...editedProfile, theme })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        editedProfile.theme.id === theme.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {theme.name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {Object.values(theme.colors).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backgrounds' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Фон профиля
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setEditedProfile({ ...editedProfile, background: bg })}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                      editedProfile.background.id === bg.id
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div 
                      className="h-24 flex items-center justify-center"
                      style={{
                        background: `${bg.gradient}${bg.pattern ? `, ${bg.pattern}` : ''}`
                      }}
                    >
                      <span className="text-white font-medium drop-shadow-lg">
                        {bg.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
}