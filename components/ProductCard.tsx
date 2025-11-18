import React from 'react';
import { Product, Language } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onClick: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-blue/10 dark:hover:shadow-neon-blue/20"
    >
      {/* Image Container */}
      <div className="relative w-full pt-[100%] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name[lang]}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-black/90 via-transparent to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/60 backdrop-blur-md border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full shadow-sm">
          <span className="text-neon-blue dark:text-neon-green font-display font-bold tracking-widest text-sm">
            ${product.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col justify-end relative">
        <div className="absolute -top-4 left-5 px-2 py-0.5 bg-neon-blue/10 dark:bg-neon-blue/20 border border-neon-blue/20 dark:border-neon-blue/30 backdrop-blur-sm rounded text-[10px] text-neon-blue font-display uppercase tracking-widest">
          {product.category}
        </div>
        
        <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-1 group-hover:text-neon-blue transition-colors">
          {product.name[lang]}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 font-body mb-4">
          {product.description[lang]}
        </p>

        <button className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 hover:bg-neon-blue hover:text-black border border-gray-200 dark:border-white/10 hover:border-neon-blue text-gray-900 dark:text-white py-3 rounded-lg transition-all duration-300 font-display text-xs tracking-widest uppercase font-bold">
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};