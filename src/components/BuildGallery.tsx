import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Build {
  id: number;
  title: string;
  image: string;
  author: string;
  likes: number;
  category: 'castle' | 'modern' | 'redstone' | 'pixel-art';
  description: string;
}

const builds: Build[] = [
  {
    id: 1,
    title: "Киберзамок XTRA",
    image: "/api/placeholder/400/300",
    author: "CyberBuilder",
    likes: 847,
    category: 'castle',
    description: "Эпический замок с неоновой подсветкой и футуристическими элементами"
  },
  {
    id: 2,
    title: "Неоновый город",
    image: "/api/placeholder/400/300", 
    author: "NeonArchitect",
    likes: 1205,
    category: 'modern',
    description: "Современный мегаполис с киберпанк атмосферой"
  },
  {
    id: 3,
    title: "Редстоун процессор",
    image: "/api/placeholder/400/300",
    author: "RedstoneGuru",
    likes: 623,
    category: 'redstone',
    description: "Функциональный 8-битный процессор на редстоуне"
  },
  {
    id: 4,
    title: "Пиксель-арт дракон",
    image: "/api/placeholder/400/300",
    author: "PixelMaster",
    likes: 956,
    category: 'pixel-art',
    description: "Огромный 3D пиксель-арт дракона"
  }
];

const categoryColors = {
  castle: 'from-purple-500 to-pink-500',
  modern: 'from-blue-500 to-cyan-500',
  redstone: 'from-red-500 to-orange-500',
  'pixel-art': 'from-green-500 to-emerald-500'
};

export default function BuildGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredBuild, setHoveredBuild] = useState<number | null>(null);

  const filteredBuilds = selectedCategory === 'all' 
    ? builds 
    : builds.filter(build => build.category === selectedCategory);

  return (
    <div className="py-20 bg-gradient-to-b from-dark-surface to-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Галерея Построек
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Впечатляющие творения участников гильдии XTRA
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'castle', 'modern', 'redstone', 'pixel-art'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-dark-card text-muted-foreground hover:bg-dark-surface border border-border'
              }`}
            >
              {category === 'all' ? 'Все' : 
               category === 'castle' ? 'Замки' :
               category === 'modern' ? 'Современное' :
               category === 'redstone' ? 'Редстоун' : 'Пиксель-арт'}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBuilds.map((build) => (
            <div
              key={build.id}
              className="group relative overflow-hidden rounded-2xl bg-dark-card border border-border hover:border-primary/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              onMouseEnter={() => setHoveredBuild(build.id)}
              onMouseLeave={() => setHoveredBuild(null)}
              style={{
                boxShadow: hoveredBuild === build.id 
                  ? '0 20px 40px rgba(0, 255, 136, 0.3)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={build.image}
                  alt={build.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${categoryColors[build.category]} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[build.category]} text-white`}>
                  {build.category === 'castle' ? 'Замки' :
                   build.category === 'modern' ? 'Современное' :
                   build.category === 'redstone' ? 'Редстоун' : 'Пиксель-арт'}
                </div>

                {/* Hover Icons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Icon name="Eye" size={20} className="text-white" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Icon name="Heart" size={20} className="text-white" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Icon name="Share2" size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {build.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {build.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {build.author[0]}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {build.author}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Heart" size={16} className="text-red-500" />
                    <span className="text-sm font-medium">{build.likes}</span>
                  </div>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
            Загрузить ещё
          </button>
        </div>
      </div>
    </div>
  );
}