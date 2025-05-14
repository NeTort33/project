import React from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, Sword } from 'lucide-react';

const CategorySection: React.FC = () => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-white mb-6">Категории игр</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dota 2 */}
        <Link to="/dota2" className="group">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://th.bing.com/th/id/R.d1b79b5af17baa2c723fe72bf9562b18?rik=yK2YZHzpCFYS6A&riu=http%3a%2f%2fwww.techreviewer.co.uk%2fwp-content%2fuploads%2f2014%2f02%2fDota2.jpg&ehk=P7zVtaukw8Xe5RiImUCOMgN0yJni%2fPxfii4Ejg26cXw%3d&risl=&pid=ImgRaw&r=0')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-dark-600 rounded-full mr-4">
                  <Sword size={24} className="text-primary-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Dota 2</h3>
                  <p className="text-gray-300">Лучшие предметы для героев</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* CS2 */}
        <Link to="/cs2" className="group">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://tse2.mm.bing.net/th/id/OIP.xPQizy-z1bLAK3EtCSy_8wHaEK?cb=iwc1&rs=1&pid=ImgDetMain')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-dark-600 rounded-full mr-4">
                  <Crosshair size={24} className="text-secondary-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">CS2</h3>
                  <p className="text-gray-300">Редкие скины оружия и ножей</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategorySection;