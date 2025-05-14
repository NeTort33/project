import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/home/HeroSection';
import FeaturedSkins from '../components/home/FeaturedSkins';
import CategorySection from '../components/home/CategorySection';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <CategorySection />
      <FeaturedSkins />
      

      <div className="py-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Почему выбирают нас</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-400 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-500 text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Безопасные сделки</h3>
            <p className="text-gray-400 text-sm">Гарантия безопасности при каждой покупке и защищенные платежи.</p>
          </div>
          
          <div className="bg-dark-400 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-500 text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Быстрая доставка</h3>
            <p className="text-gray-400 text-sm">Получайте скины мгновенно после оплаты, без задержек.</p>
          </div>
          
          <div className="bg-dark-400 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-500 text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Выгодные цены</h3>
            <p className="text-gray-400 text-sm">Конкурентные цены и регулярные скидки на популярные предметы.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;