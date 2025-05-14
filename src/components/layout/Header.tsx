import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="sticky top-0 z-50 bg-dark-500 border-b border-dark-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
   
          <Link to="/" className="flex items-center">
            <span className="text-primary-500 font-bold text-2xl">Лавка Рыжего</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm ${location.pathname === '/' ? 'text-primary-500' : 'text-gray-200 hover:text-primary-400'}`}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className={`text-sm ${location.pathname.includes('/catalog') ? 'text-primary-500' : 'text-gray-200 hover:text-primary-400'}`}
            >
              Каталог
            </Link>
            <Link 
              to="/dota2" 
              className={`text-sm ${location.pathname.includes('/dota2') ? 'text-primary-500' : 'text-gray-200 hover:text-primary-400'}`}
            >
              Dota 2
            </Link>
            <Link 
              to="/cs2" 
              className={`text-sm ${location.pathname.includes('/cs2') ? 'text-primary-500' : 'text-gray-200 hover:text-primary-400'}`}
            >
              CS2
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/catalog" className="text-gray-300 hover:text-white">
              <Search size={20} />
            </Link>
        
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 border-t border-dark-300 mt-3">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-sm ${location.pathname === '/' ? 'text-primary-500' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className={`text-sm ${location.pathname.includes('/catalog') ? 'text-primary-500' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link 
                to="/dota2" 
                className={`text-sm ${location.pathname.includes('/dota2') ? 'text-primary-500' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dota 2
              </Link>
              <Link 
                to="/cs2" 
                className={`text-sm ${location.pathname.includes('/cs2') ? 'text-primary-500' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                CS2
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;