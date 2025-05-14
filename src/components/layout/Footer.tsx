import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-600 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Сайт */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Лавка Рыжего</h3>
            <p className="text-sm mb-4">
              Лучший магазин скинов для Dota 2 и CS2 с гарантией качества и 100% выдачей.
            </p>           
          </div>
          
          {/* Навигация */}
          <div>
            <h3 className="text-md font-semibold text-white mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-500">Главная</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-primary-500">Каталог</Link>
              </li>
              <li>
                <Link to="/dota2" className="hover:text-primary-500">Dota 2</Link>
              </li>
              <li>
                <Link to="/cs2" className="hover:text-primary-500">CS2</Link>
              </li>
            </ul>
          </div>
          
          {/* Поддержка */}
          <div>
            <h3 className="text-md font-semibold text-white mb-4">Поддержка</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://t.me/CHEJIOBEK_CJIOH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-500"
                >
                  <Mail size={16} className="mr-2 text-primary-500" />
                  <span>Поддержка</span>
                </a>
              </li>
             
              <li className="flex items-center">
                <ShieldCheck size={16} className="mr-2 text-primary-500" />
                <span>Гарантии безопасности</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-300 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 Лавка Рыжего. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;