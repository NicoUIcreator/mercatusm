import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, INITIAL_REVIEWS } from './constants';
import { TRANSLATIONS, Language, Product, Review } from './types';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductAssistant } from './components/ProductAssistant';
import { Reviews } from './components/Reviews';
import { X, Check } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  
  // State for CSS Transforms (Blobs)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Ref for Canvas Animation (Particles) - prevents re-renders
  const mousePosRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const t = TRANSLATIONS[lang];

  // Handle Theme Changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

  // Track Mouse for Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates for CSS blobs
      const x = (e.clientX - window.innerWidth / 2) * 0.05;
      const y = (e.clientY - window.innerHeight / 2) * 0.05;
      
      setMousePos({ x, y });
      
      // Update Ref for Canvas loop
      mousePosRef.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle System Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{x: number, y: number, size: number, speedX: number, speedY: number, opacity: number}> = [];

    const initParticles = () => {
      particles = [];
      // Responsive particle count
      const count = Math.floor(window.innerWidth < 768 ? 30 : 60); 
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Theme-aware particle color
      const r = theme === 'dark' ? 255 : 0;
      const g = theme === 'dark' ? 255 : 0;
      const b = theme === 'dark' ? 255 : 0;
      
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      particles.forEach(p => {
        // Natural drift + Inverse mouse movement (Parallax)
        p.x += p.speedX - (mx * 0.05); 
        p.y += p.speedY - (my * 0.05);

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-init if theme changes (to update color)

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 text-gray-900 dark:bg-[#050505] dark:text-white font-body selection:bg-neon-blue selection:text-black relative overflow-x-hidden">
      
      {/* --- Grand Illusion Background --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Orb 1 - Blue - Moves opposite to mouse */}
        <div 
          className="absolute w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] transition-transform duration-100 ease-out will-change-transform opacity-50 dark:opacity-20"
          style={{ 
            top: '10%', 
            left: '20%',
            transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` 
          }} 
        />
        
        {/* Orb 2 - Purple - Moves with mouse slightly */}
        <div 
          className="absolute w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[120px] transition-transform duration-150 ease-out will-change-transform opacity-50 dark:opacity-20"
          style={{ 
            bottom: '10%', 
            right: '10%',
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
          }} 
        />

        {/* Orb 3 - Green - Fast movement (Parallax foreground feel) */}
        <div 
          className="absolute w-[300px] h-[300px] bg-neon-green/20 rounded-full blur-[80px] transition-transform duration-75 ease-out will-change-transform opacity-30 dark:opacity-10"
          style={{ 
            top: '40%', 
            left: '50%',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` 
          }} 
        />

        {/* Particles Canvas Layer */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
        />
        
        {/* Grid/Noise Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <Header currentLang={lang} setLang={setLang} currentTheme={theme} toggleTheme={toggleTheme} />

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-12 overflow-hidden">
          
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto"
               style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
          >
            <h2 className="text-neon-blue font-display text-xs md:text-sm tracking-[0.5em] uppercase animate-fade-in">
              {t.heroSubtitle}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-700 to-gray-400 dark:from-white dark:via-gray-200 dark:to-gray-600 drop-shadow-2xl">
              {t.heroTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm md:text-base font-light leading-relaxed">
              {lang === 'en' && "Curated future-tech for the modern pioneer."}
              {lang === 'es' && "Tecnología futurista curada para el pionero moderno."}
              {lang === 'it' && "Tecnologia futuristica curata per il pioniere moderno."}
            </p>
            
            <button 
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 px-8 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-900/20 dark:border-white/20 hover:border-neon-blue dark:hover:border-neon-blue text-gray-900 dark:text-white hover:text-neon-blue dark:hover:text-neon-blue rounded-full font-display text-xs tracking-widest uppercase transition-all duration-300"
            >
              {t.ctaButton}
            </button>
          </div>
        </section>

        {/* Product Grid */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                lang={lang} 
                onClick={setSelectedProduct} 
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-white/5 py-12 bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 dark:text-gray-600 font-display text-xs tracking-widest uppercase">
              {t.footerText}
            </p>
          </div>
        </footer>
      </div>

      {/* Product Modal Overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />
          
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#0a0a0a] rounded-t-3xl sm:rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up sm:animate-zoom-in flex flex-col md:flex-row transition-colors duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-black/50 rounded-full text-gray-900 dark:text-white hover:text-neon-blue dark:hover:text-neon-blue transition-colors shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto shrink-0">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name[lang]} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0a0a0a] dark:via-transparent dark:to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="mb-auto">
                <div className="flex items-center gap-2 mb-2">
                   <span className="px-2 py-1 rounded bg-neon-blue/10 text-neon-blue text-[10px] font-display font-bold uppercase tracking-widest">
                     {selectedProduct.category}
                   </span>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {selectedProduct.name[lang]}
                </h2>
                
                <div className="text-2xl text-neon-blue dark:text-neon-green font-display font-bold mb-4">
                  ${selectedProduct.price}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed mb-6">
                  {selectedProduct.description[lang]}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-display text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-200 dark:border-white/10 pb-2">
                    {t.featuresTitle}
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.features[lang].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-neon-blue mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {/* Buy Button */}
                <button 
                  onClick={() => {
                    setCartCount(p => p + 1);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-display font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                  {t.buyNow} - ${selectedProduct.price}
                </button>

                {/* Gemini AI Assistant */}
                <ProductAssistant product={selectedProduct} lang={lang} />

                {/* Customer Reviews */}
                <Reviews 
                  productId={selectedProduct.id}
                  reviews={reviews}
                  onAddReview={handleAddReview}
                  lang={lang}
                />
              </div>
            </div>

          </div>
        </div>
      )}
      
      {/* Cart Floating Bubble */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-neon-green text-black font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(10,255,104,0.4)] animate-bounce">
          {cartCount}
        </div>
      )}
    </div>
  );
};

export default App;