import React from 'react';
import SkinCard from './SkinCard';
import { Skin } from '../../types';

interface SkinGridProps {
  skins: Skin[];
}

const SkinGrid: React.FC<SkinGridProps> = ({ skins }) => {
  // Handle case where skins is undefined or null
  if (!skins || skins.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-400">Товары не найдены</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skins.filter(skin => skin && skin.id).map((skin) => (
        <SkinCard key={skin.id} skin={skin} />
      ))}
    </div>
  );
};

export default SkinGrid;