import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, Info, Award, ChevronLeft } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { Skin } from '../types';
import SkinGrid from '../components/skin/SkinGrid';

const SkinDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [skin, setSkin] = useState<Skin | null>(null);
  const [relatedSkins, setRelatedSkins] = useState<Skin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSkinDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:5000/api/skins/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch skin details');
        }
        
        const skinData = await response.json();
        setSkin(skinData);
        
        // Fetch related skins
        const relatedResponse = await fetch(`http://localhost:5000/api/skins?game=${skinData.game.id}`);
        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related skins');
        }
        
        const relatedData = await relatedResponse.json();
        setRelatedSkins(relatedData.filter((s: Skin) => s.id !== id).slice(0, 4));
      } catch (err) {
        console.error('Error fetching skin details:', err);
        setError('Failed to load skin details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchSkinDetails();
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-400">Загрузка...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !skin) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <p className="text-lg text-error mb-4">{error || 'Товар не найден'}</p>
          <Link to="/catalog" className="text-primary-500 hover:text-primary-400 mt-4 inline-block">
            Вернуться в каталог
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const discountedPrice = skin.discount 
    ? Math.round(skin.price * (1 - skin.discount / 100)) 
    : null;
    
  return (
    <MainLayout>
      <Link to="/catalog" className="flex items-center text-gray-400 hover:text-white mb-6">
        <ChevronLeft size={20} className="mr-1" />
        <span>Вернуться в каталог</span>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="bg-dark-400 rounded-lg overflow-hidden">
          <img 
            src={skin.imageUrl} 
            alt={skin.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{skin.name}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-dark-400 rounded-md text-sm text-gray-300">
              {skin.game.name}
            </span>
            <span className="px-3 py-1 bg-dark-400 rounded-md text-sm text-gray-300">
              {skin.type}
            </span>
            {skin.hero && (
              <span className="px-3 py-1 bg-dark-400 rounded-md text-sm text-gray-300">
                {skin.hero}
              </span>
            )}
          </div>
          
          <div className="bg-dark-400 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                {discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-white">{discountedPrice} ₽</span>
                    <span className="text-xl line-through text-gray-500 ml-3">{skin.price} ₽</span>
                    <span className="bg-primary-500 text-white text-sm font-bold px-2 py-1 rounded ml-3">
                      -{skin.discount}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-white">{skin.price} ₽</span>
                )}
              </div>
              <div className="text-gray-400">
                <span className="flex items-center">
                  <Tag size={16} className="mr-1" />
                  ID: {skin.id}
                </span>
              </div>
            </div>
            
            <div className="bg-primary-500/10 border border-primary-500 rounded-lg p-4 text-center">
              <p className="text-white text-lg mb-2">Хотите купить этот предмет?</p>
              <p className="text-primary-500 font-bold">
                Пишите в Telegram: <a href="https://t.me/stroke_power" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400">@stroke_power</a>
              </p>
            </div>
          </div>
          
          <div className="bg-dark-400 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Info size={18} className="mr-2 text-primary-500" />
              Характеристики
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Игра:</span>
                <span className="text-white">{skin.game.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Тип:</span>
                <span className="text-white">{skin.type}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Редкость:</span>
                <span className="text-white">{skin.rarity}</span>
              </div>
              
              {skin.hero && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Герой:</span>
                  <span className="text-white">{skin.hero}</span>
                </div>
              )}
              
              {skin.float !== null && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Float:</span>
                  <span className="text-white">{skin.float}</span>
                </div>
              )}
              
              {skin.pattern && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Pattern:</span>
                  <span className="text-white">{skin.pattern}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-dark-400 rounded-lg p-5">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Award size={18} className="mr-2 text-primary-500" />
              Гарантии
            </h3>
            
            <ul className="space-y-2">
              <li className="flex items-start">
                <Award size={16} className="mr-2 text-success mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Гарантия безопасной сделки</span>
              </li>
              <li className="flex items-start">
                <Award size={16} className="mr-2 text-success mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">100% соответствие описанию</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Skins */}
      {relatedSkins.length > 0 && (
        <div className="my-10">
          <h2 className="text-2xl font-bold text-white mb-6">Похожие товары</h2>
          <SkinGrid skins={relatedSkins} />
        </div>
      )}
    </MainLayout>
  );
};

export default SkinDetailPage;