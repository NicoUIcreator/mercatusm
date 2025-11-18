import React from 'react';
import { Language } from '../types';
import { Globe, ShoppingBag, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, setLang, currentTheme, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
        
        {/* Left Area (Spacer for balance or future menu) */}
        <div className="flex-1 flex justify-start">
          {/* Placeholder for hamburger menu if needed later */}
        </div>

        {/* Centered Logo Area */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-2 group cursor-pointer">
          <ShoppingBag className="w-6 h-6 text-neon-blue group-hover:animate-bounce transition-transform" />
          <div className="flex flex-col items-center leading-none">
            <span className="font-display font-bold text-lg tracking-[0.2em] text-gray-900 dark:text-white group-hover:text-neon-blue transition-colors">
              MERCATUS
            </span>
            <span className="font-display text-[10px] tracking-[0.5em] text-gray-500 dark:text-gray-400 hidden sm:block">
              MAXIMUS
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-full px-2 sm:px-3 py-1 border border-gray-200 dark:border-white/10">
            <Globe className="w-3 h-3 text-gray-500 dark:text-gray-400" />
            <select 
              value={currentLang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-xs font-body text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer uppercase w-10 sm:w-auto"
            >
              <option value="en" className="bg-white dark:bg-black">EN</option>
              <option value="es" className="bg-white dark:bg-black">ES</option>
              <option value="it" className="bg-white dark:bg-black">IT</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};