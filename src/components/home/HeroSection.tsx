import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-dark-700 to-dark-500 rounded-xl">
      <div className="absolute inset-0 bg-[url('https://resizer.mail.ru/p/e31ccb11-e7e2-518b-9f6b-6001d3f12580/AQAOTby79Bupy3yUWgmKme-CCIqlSKc1SnRXV4tEEl_UT2hGFrRoal_4Cqv-hFCIwckcnTvOSC0pvpZdSgN8-7wEZ7A.jpg')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative z-10 py-16 px-8 md:py-24 md:px-12 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Лучшие скины <span className="text-primary-500">Dota 2</span> и <span className="text-secondary-500">CS2</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Огромный выбор скинов по выгодным ценам. Быстрая доставка и безопасные сделки с гарантией.
        </p>
        
        <Link to="/catalog">
          <Button variant="primary" size="lg">
            Смотреть каталог
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;