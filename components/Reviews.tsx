import React, { useState, useMemo } from 'react';
import { Star, User, Filter, Send, Clock } from 'lucide-react';
import { Review, Language, TRANSLATIONS } from '../types';

interface ReviewsProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  lang: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ productId, reviews, onAddReview, lang }) => {
  const t = TRANSLATIONS[lang];
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWriting, setIsWriting] = useState(false);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');

  const productReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchId = r.productId === productId;
      const matchRating = filterRating === 'all' || r.rating === filterRating;
      return matchId && matchRating;
    });
  }, [reviews, productId, filterRating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      userName,
      rating: userRating,
      comment: userComment,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' // Simulate admin approval requirement
    };

    onAddReview(newReview);
    
    // Reset form
    setUserName('');
    setUserComment('');
    setUserRating(5);
    setIsWriting(false);
  };

  const renderStars = (count: number, filled: boolean = true, size: string = "w-3 h-3") => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`${size} ${i < count ? (filled ? 'fill-neon-green text-neon-green' : 'text-gray-300 dark:text-gray-600') : 'text-gray-300 dark:text-gray-800'}`} 
      />
    ));
  };

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-white/10 pt-8 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white tracking-wider uppercase">
          {t.reviewsTitle}
        </h3>
        <button 
          onClick={() => setIsWriting(!isWriting)}
          className="text-xs font-display uppercase tracking-widest text-neon-blue hover:text-white transition-colors border border-neon-blue/30 hover:border-neon-blue px-3 py-1.5 rounded-full"
        >
          {isWriting ? t.close : t.writeReview}
        </button>
      </div>

      {/* Write Review Form */}
      {isWriting && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-neon-blue/20 animate-slide-up transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-display uppercase text-gray-500 mb-1">{t.namePlaceholder}</label>
                <input 
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/20 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-neon-blue focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-display uppercase text-gray-500 mb-1">{t.rating}</label>
                <div className="flex gap-1 items-center h-[38px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-5 h-5 ${star <= userRating ? 'fill-neon-green text-neon-green' : 'text-gray-300 dark:text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-display uppercase text-gray-500 mb-1">{t.commentPlaceholder}</label>
              <textarea 
                required
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                rows={3}
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/20 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-neon-blue focus:outline-none transition-colors"
              />
            </div>
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 bg-neon-green/10 hover:bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-lg text-xs font-display uppercase tracking-widest transition-colors"
            >
              <Send className="w-3 h-3" />
              {t.submitReview}
            </button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setFilterRating('all')}
          className={`px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-wider border transition-all ${filterRating === 'all' ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white' : 'bg-transparent text-gray-500 border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'}`}
        >
          {t.filterAll}
        </button>
        {[5, 4, 3, 2, 1].map(rating => (
          <button
            key={rating}
            onClick={() => setFilterRating(rating)}
            className={`px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-wider border transition-all flex items-center gap-1 ${filterRating === rating ? 'bg-neon-green/20 text-neon-green border-neon-green' : 'bg-transparent text-gray-500 border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'}`}
          >
            {rating} <Star className="w-2 h-2 fill-current" />
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {productReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic text-sm">
            {t.noReviews}
          </div>
        ) : (
          productReviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-[#0f0f0f] p-4 rounded-lg border border-gray-200 dark:border-white/5 hover:border-neon-blue/20 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  </div>
                  <span className="text-sm font-display font-bold text-gray-900 dark:text-white">{review.userName}</span>
                  {review.status === 'pending' && (
                    <span className="flex items-center gap-1 text-[9px] bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wider">
                      <Clock className="w-2 h-2" /> {t.reviewPending}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{review.date}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {renderStars(review.rating, true, "w-2.5 h-2.5")}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-body leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};