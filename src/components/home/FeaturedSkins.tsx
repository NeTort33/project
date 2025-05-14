import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkinGrid from '../skin/SkinGrid';
import { Skin } from '../../types';

const FeaturedSkins: React.FC = () => {
  const [featuredSkins, setFeaturedSkins] = useState<Skin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchFeaturedSkins = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/skins');
        if (!response.ok) {
          throw new Error('Failed to fetch featured skins');
        }
        
        const data = await response.json();
        setFeaturedSkins(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching featured skins:', err);
        setError('Failed to load featured skins');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedSkins();
  }, []);
  
  if (isLoading) {
    return (
      <div className="py-10">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-10">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Рекомендуемые товары</h2>
        <Link to="/catalog" className="text-primary-500 hover:text-primary-400 text-sm">
          Смотреть все →
        </Link>
      </div>
      
      <SkinGrid skins={featuredSkins} />
    </div>
  );
};

export default FeaturedSkins;