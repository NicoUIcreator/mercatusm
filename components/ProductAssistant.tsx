import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Product, Language, TRANSLATIONS } from '../types';
import { askProductAssistant } from '../services/geminiService';

interface ProductAssistantProps {
  product: Product;
  lang: Language;
}

export const ProductAssistant: React.FC<ProductAssistantProps> = ({ product, lang }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const t = TRANSLATIONS[lang];

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const answer = await askProductAssistant(product, query, lang);
      setResponse(answer);
    } catch (err) {
      setResponse("System offline.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black border border-gray-200 dark:border-white/10 shadow-inner transition-colors duration-300">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-neon-purple" />
        <h3 className="text-sm font-display text-neon-purple tracking-wider">{t.askAi}</h3>
      </div>

      {response && (
        <div className="mb-4 p-3 rounded-lg bg-white dark:bg-white/5 border-l-2 border-neon-purple text-sm font-body text-gray-700 dark:text-gray-300 animate-fade-in shadow-sm">
          {response}
        </div>
      )}

      <form onSubmit={handleAsk} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.aiPlaceholder}
          className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/20 rounded-lg pl-3 pr-10 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-neon-blue transition-colors font-body shadow-sm dark:shadow-none"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
      <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-2 text-right italic">
        {t.aiDisclaimer}
      </p>
    </div>
  );
};