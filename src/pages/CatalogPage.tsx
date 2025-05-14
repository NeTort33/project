import React, { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import SkinGrid from '../components/skin/SkinGrid';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { games } from '../data/mockData';
import { Skin } from '../types';

const CatalogPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (location.pathname === '/dota2') {
      setSelectedGame('1');
    } else if (location.pathname === '/cs2') {
      setSelectedGame('2');
    } else {
      setSelectedGame('all');
    }
  }, [location.pathname]);
  
  const fetchSkins = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedGame !== 'all') {
        params.append('game', selectedGame);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      if (minPrice) {
        params.append('min_price', minPrice);
      }
      if (maxPrice) {
        params.append('max_price', maxPrice);
      }
      
      const response = await fetch(`http://localhost:5000/api/skins?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch skins');
      }
      
      const data = await response.json();
      setFilteredSkins(data);
    } catch (err) {
      console.error('Error fetching skins:', err);
      setError('Failed to load skins. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { q: searchQuery } : {});
    fetchSkins();
  };
  
  useEffect(() => {
    fetchSkins();
  }, [selectedGame]);
  
  const getPageTitle = () => {
    if (selectedGame === '1') return 'Скины Dota 2';
    if (selectedGame === '2') return 'Скины CS2';
    return 'Каталог скинов';
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">{getPageTitle()}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-dark-400 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Игры</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="game"
                    checked={selectedGame === 'all'}
                    onChange={() => setSelectedGame('all')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Все игры</span>
                </label>
                {games.map(game => (
                  <label key={game.id} className="flex items-center">
                    <input
                      type="radio"
                      name="game"
                      checked={selectedGame === game.id}
                      onChange={() => setSelectedGame(game.id)}
                      className="mr-2"
                    />
                    <span className="text-gray-300">{game.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-dark-400 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Цена</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="От"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  placeholder="До"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <Button 
                variant="primary" 
                className="mt-3 w-full"
                onClick={fetchSkins}
              >
                Применить
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Toggle */}
            <div className="flex items-center gap-3 mb-6">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Поиск скинов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>
              
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                Фильтры
              </Button>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-dark-400 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Игры</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedGame === 'all' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-dark-300 text-gray-300'
                    }`}
                    onClick={() => setSelectedGame('all')}
                  >
                    Все
                  </button>
                  {games.map(game => (
                    <button
                      key={game.id}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedGame === game.id 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-dark-300 text-gray-300'
                      }`}
                      onClick={() => setSelectedGame(game.id)}
                    >
                      {game.name}
                    </button>
                  ))}
                </div>
                
                <h3 className="text-lg font-medium text-white mb-3">Цена</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="От"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input
                    placeholder="До"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <Button 
                  variant="primary" 
                  className="mt-3 w-full"
                  onClick={() => {
                    fetchSkins();
                    setShowFilters(false);
                  }}
                >
                  Применить фильтры
                </Button>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="text-center py-10">
                <p className="text-error mb-4">{error}</p>
                <Button variant="primary" onClick={fetchSkins}>
                  Попробовать снова
                </Button>
              </div>
            )}
            
            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-400">Загрузка...</p>
              </div>
            ) : (
              <SkinGrid skins={filteredSkins} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CatalogPage;