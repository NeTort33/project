import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Skin } from '../../types';

interface SkinCardProps {
  skin: Skin;
}

const SkinCard: React.FC<SkinCardProps> = ({ skin }) => {
  const discountedPrice = skin.discount 
    ? Math.round(skin.price * (1 - skin.discount / 100)) 
    : null; 
  
  const rarityStyles: Record<string, { border: string; glow: string }> = {
    'Arcana': {
      border: 'border-orange-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]'
    },
    'Immortal': {
      border: 'border-yellow-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]'
    },
    'Тайное': {
      border: 'border-red-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]'
    },
    'Засекреченное': {
      border: 'border-purple-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]'
    },
    'Restricted': {
      border: 'border-blue-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
    },
    'Classified': {
      border: 'border-blue-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
    },
    'Covert': {
      border: 'border-pink-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]'
    },
    'default': {
      border: 'border-gray-500',
      glow: 'group-hover:shadow-[0_0_15px_rgba(107,114,128,0.5)]'
    },
  };
  
  const style = rarityStyles[skin.rarity] || rarityStyles.default;
  
  return (
    <Link to={`/skin/${skin.id}`}>
      <div className={`bg-dark-400 rounded-lg overflow-hidden border ${style.border} transition-all duration-300 hover:scale-[1.02] transform-gpu ${style.glow}`}>
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
          <img 
            src={skin.imageUrl} 
            alt={skin.name}
            className="w-full h-48 object-cover"
          />
          
          {skin.discount && (
            <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{skin.discount}%
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-600 to-transparent p-2">
            <span className="inline-block text-xs px-2 py-1 bg-dark-500 rounded text-white">
              {skin.game.name}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-white truncate">{skin.name}</h3>
          
          <div className="flex items-center text-sm text-gray-400 mt-1 mb-3">
            <span>{skin.type}</span>
            {skin.hero && <span className="ml-1 before:content-['•'] before:mx-1">{skin.hero}</span>}
            {skin.float !== undefined && (
              <span className="ml-1 before:content-['•'] before:mx-1">Float: {skin.float}</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              {discountedPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">{discountedPrice} ₽</span>
                  <span className="text-sm line-through text-gray-500">{skin.price} ₽</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-white">{skin.price} ₽</span>
              )}
            </div>
            
            <div className="flex items-center text-gray-400">
              <Tag size={16} className="mr-1" />
              <span>ID: {skin.id}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkinCard;