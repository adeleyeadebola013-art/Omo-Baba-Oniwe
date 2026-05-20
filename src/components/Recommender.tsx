import React, { useState } from 'react';
import { Book } from '../types';
import { Book3D } from './Book3D';
import { Sparkles, Compass, Lightbulb, RefreshCw, ShoppingCart, UserCheck } from 'lucide-react';

interface RecommenderProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

export const Recommender: React.FC<RecommenderProps> = ({ books, onSelectBook, onAddToCart }) => {
  const [step, setStep] = useState<number>(0);
  const [mood, setMood] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [recommendations, setRecommendations] = useState<{ book: Book; matchPercentage: number; MatchReason: string }[]>([]);

  // Reset helper
  const handleReset = () => {
    setStep(0);
    setMood('');
    setPace('');
    setInterests('');
    setRecommendations([]);
  };

  // Tag Matching engine
  const runMatcher = (selectedMood: string, selectedPace: string, selectedInterests: string) => {
    const list = books.map((book) => {
      let score = 50; // Base baseline score
      let reasons: string[] = [];

      // Mood Matchers
      if (selectedMood === 'wisdom') {
        if (book.category === 'History & Heritage' || book.category === 'Personal Growth') {
          score += 25;
          reasons.push('Matches your appetite for foundational cultural wisdom & personal progress.');
        }
      } else if (selectedMood === 'magic') {
        if (book.category === 'African Classics' && book.id === 'famished-road') {
          score += 35;
          reasons.push(' Azaro’s mystical spirit realm matches your magical-realism search.');
        } else if (book.category === 'Sci-Fi & Fantasy') {
          score += 20;
          reasons.push('Fulfills your preference for immersive speculative fiction.');
        }
      } else if (selectedMood === 'structured') {
        if (book.category === 'Tech & Science' || book.category === 'Personal Growth') {
          score += 30;
          reasons.push('Tailor-made for individuals seeking systems, habits, or clean structural engineering.');
        }
      } else if (selectedMood === 'drama') {
        if (book.category === 'African Classics' || book.category === 'Contemporary Fiction') {
          score += 25;
          reasons.push('Perfect match for profound, character-driven familial relationships and histories.');
        }
      }

      // Page / Pace matchers
      if (selectedPace === 'short') {
        if (book.pages < 300) {
          score += 15;
          reasons.push('A breezy read under 300 pages suited for quick, impactful sessions.');
        } else {
          score -= 10;
        }
      } else if (selectedPace === 'epic') {
        if (book.pages >= 400) {
          score += 20;
          reasons.push('A comprehensive, rich epic of over 400 pages to get fully lost in.');
        } else {
          score -= 10;
        }
      }

      // Special interests matchers
      if (selectedInterests === 'african') {
        if (book.category === 'African Classics' || book.category === 'Contemporary Fiction' || book.category === 'History & Heritage') {
          score += 25;
          reasons.push('Delivers authentic traditional or modern Nigerian and African voices.');
        }
      } else if (selectedInterests === 'tech') {
        if (book.category === 'Tech & Science') {
          score += 30;
          reasons.push('Contains technical craft guidelines to refine your software engineering skills.');
        }
      } else if (selectedInterests === 'philosophy') {
        if (book.category === 'Creative Arts' || book.id === 'famished-road' || book.id === 'yoruba-wisdom') {
          score += 25;
          reasons.push('Dives into abstract creative philosophies, heritage traditions, and being.');
        }
      }

      // Safeguard scores
      const finalPercent = Math.min(Math.max(score, 60), 98);

      return {
        book,
        matchPercentage: finalPercent,
        MatchReason: reasons.join(' ') || 'A delightful literature recommendation designed to broaden your horizons.'
      };
    });

    // Sort descending
    const sorted = list.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 2);
    setRecommendations(sorted);
    setStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto bg-neutral-950/70 border border-neutral-900 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden shadow-2xl" id="recommender-card">
      {/* Background soft glow decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full" />
      
      {/* Step 0: Welcome Header */}
      {step === 0 && (
        <div className="space-y-6 py-6 animate-fade-in">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Omo Baba Oniwe Reader Concierge
            </h3>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
              Struggling to select your next investment in paper? Answer three quick aesthetic questions, and let our legacy shelf assistant compile your perfect literary matches.
            </p>
          </div>
          <button
            onClick={() => setStep(1)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-mono uppercase tracking-widest font-bold rounded-lg transition-all shadow-lg shadow-amber-500/10"
          >
            Commence Search
          </button>
        </div>
      )}

      {/* Step 1: Mood */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 mb-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Step 01 of 03</span>
            <span className="text-xs font-mono text-amber-500 font-semibold">Mood & Mindset</span>
          </div>
          
          <h4 className="font-serif text-lg text-white font-bold leading-tight mb-2">
            What is your current intellectual state or mood hunger?
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'wisdom', title: 'Philosophical & Wise', desc: 'I wish to absorb cultural legacy, proverbs, or structured personal wisdom.' },
              { id: 'magic', title: 'Magical & Speculative', desc: 'Take me to dreamlike folklore worlds, cosmic dunes, or magical-realism realms.' },
              { id: 'structured', title: 'Structured & Rational', desc: 'Give me technical protocols, habits, algorithms, or concrete facts.' },
              { id: 'drama', title: 'Emotional & Human', desc: 'I want intense relationships, cultural histories, and families facing real struggle.' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setMood(opt.id);
                  setStep(2);
                }}
                className="p-4 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 text-left transition-all hover:border-amber-500/35 relative group"
              >
                <span className="block font-serif text-sm font-semibold text-white mb-1 group-hover:text-amber-400 transition-all">
                  {opt.title}
                </span>
                <span className="block text-xs text-neutral-400 leading-normal">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>

          <button onClick={handleReset} className="text-xs text-neutral-500 hover:text-neutral-400 font-mono mt-4 uppercase tracking-widest">
            ← Cancel
          </button>
        </div>
      )}

      {/* Step 2: Pace */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 mb-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Step 02 of 03</span>
            <span className="text-xs font-mono text-amber-500 font-semibold">Book Depth</span>
          </div>

          <h4 className="font-serif text-lg text-white font-bold leading-tight mb-2">
            What commitment format or sizing do you have available?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'short', title: 'Short & Punchy', desc: 'Breezy prose. Excellent for a quick weekend finish (< 300 pages).' },
              { id: 'indifferent', title: 'Medium Standard', desc: 'Standard sweet-spot proportions (300 - 450 pages).' },
              { id: 'epic', title: 'Immersive Epic', desc: 'Huge worldbuilding. I want to live in this world for weeks (> 450 pages).' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setPace(opt.id);
                  setStep(3);
                }}
                className="p-4 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 text-left transition-all hover:border-amber-500/35 group"
              >
                <span className="block font-serif text-sm font-semibold text-white mb-1 group-hover:text-amber-400 transition-all">
                  {opt.title}
                </span>
                <span className="block text-xs text-neutral-400 leading-normal">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="text-xs text-neutral-500 hover:text-neutral-400 font-mono uppercase tracking-widest">
              ← Prev Step
            </button>
            <button onClick={handleReset} className="text-xs text-neutral-500 hover:text-neutral-400 font-mono uppercase tracking-widest">
              Reset Query
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Interest Area */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 mb-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Step 03 of 03</span>
            <span className="text-xs font-mono text-amber-500 font-semibold">Thematic Arena</span>
          </div>

          <h4 className="font-serif text-lg text-white font-bold leading-tight mb-2">
            Which domain calls out to you the loudest?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'african', title: 'African Voices', desc: 'Rich Nigerian families, cultural lore, postcolonial histories, traditional proverbs.' },
              { id: 'tech', title: 'Software & Craft', desc: 'Systems engineering rules, algorithmic design clarity, clean structured guidelines.' },
              { id: 'philosophy', title: 'Creative Philosophy', desc: 'Zen thinking guidelines, artistic being, pure focus and cosmic meditations.' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setInterests(opt.id);
                  runMatcher(mood, pace, opt.id);
                }}
                className="p-4 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 text-left transition-all hover:border-amber-500/35 group"
              >
                <span className="block font-serif text-sm font-semibold text-white mb-1 group-hover:text-amber-400 transition-all">
                  {opt.title}
                </span>
                <span className="block text-xs text-neutral-400 leading-normal">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(2)} className="text-xs text-neutral-500 hover:text-neutral-400 font-mono uppercase tracking-widest">
              ← Prev Step
            </button>
            <button onClick={handleReset} className="text-xs text-neutral-500 hover:text-neutral-400 font-mono uppercase tracking-widest">
              Reset Query
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results Rendering */}
      {step === 4 && (
        <div className="space-y-8 animate-fade-in text-left">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
            <span className="text-xs font-mono text-emerald-400 font-semibold animate-pulse">✓ Perfect Fits Calculated</span>
            <button
              onClick={handleReset}
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-white rounded-md text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              Reset Quiz
            </button>
          </div>

          <div className="text-center py-2">
            <h4 className="font-serif text-xl font-bold text-white tracking-tight">
              Calculated Selections For You
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Hand-picked matching volumes ready on Baba Oniwe's digital mahogany rack.
            </p>
          </div>

          {/* Matches grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {recommendations.map(({ book, matchPercentage, MatchReason }) => (
              <div 
                key={book.id}
                className="bg-neutral-900/50 border border-neutral-850 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-center transition-all duration-300 hover:border-neutral-800 shadow-xl"
              >
                {/* 3D Book view */}
                <div className="flex-none h-48 w-32 flex items-center justify-center">
                  <Book3D book={book} size="sm" onClick={() => onSelectBook(book)} />
                </div>

                {/* Details side */}
                <div className="flex-1 flex flex-col justify-between py-1 self-stretch space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-amber-500 uppercase tracking-widest">{book.category}</span>
                      <span className="text-emerald-400 font-medium">{matchPercentage}% Match</span>
                    </div>

                    <h5 
                      onClick={() => onSelectBook(book)}
                      className="font-serif font-bold text-white text-sm tracking-tight cursor-pointer hover:text-amber-400 transition-all line-clamp-1"
                    >
                      {book.title}
                    </h5>
                    <p className="text-[11px] text-neutral-400 italic">By {book.author}</p>
                    <p className="text-xs text-neutral-300 leading-normal line-clamp-3 font-serif">
                      {MatchReason}
                    </p>
                  </div>

                  <div className="flex gap-2 font-mono text-[9px] uppercase tracking-wider">
                    <button
                      onClick={() => onAddToCart(book)}
                      className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-2.5 h-2.5" />
                      Add (${book.price.toFixed(2)})
                    </button>
                    <button
                      onClick={() => onSelectBook(book)}
                      className="px-2 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 rounded border border-neutral-700 transition-all"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
