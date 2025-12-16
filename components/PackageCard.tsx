import React from 'react';
import { Package } from '../types';
import { Check, Star } from 'lucide-react';

interface Props {
  pkg: Package;
  onBook: (pkgId: string) => void;
}

const PackageCard: React.FC<Props> = ({ pkg, onBook }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border border-mistic-gold/20">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-mistic-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {pkg.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-serif text-mistic-red">{pkg.name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 italic line-clamp-2">
          {pkg.description}
        </p>

        <div className="space-y-2 mb-6">
          {pkg.features.slice(0, 4).map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-mistic-gold" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-xs text-gray-400 block uppercase tracking-wide">Starting from</span>
            <span className="text-2xl font-bold text-mistic-dark">{pkg.price}</span>
          </div>
          <button 
            onClick={() => onBook(pkg.id)}
            className="bg-mistic-red text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-800 transition-colors shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
