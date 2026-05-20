import React, { useState } from 'react';
import { Book } from '../types';
import { Book3D } from './Book3D';
import { BookOpen, Sparkles, PlusCircle } from 'lucide-react';

interface ShelfProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

export const Shelf: React.FC<ShelfProps> = ({ books, onSelectBook, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Categorization
  const categories = ['All', ...Array.from(new Set(books.map((b) => b.category)))];

  const filteredBooks = activeCategory === 'All'
    ? books
    : books.filter((b) => b.category === activeCategory);

  return (
    <div className="space-y-8" id="shelf-component-wrapper">
      {/* Category Ribbon */}
      <div className="flex flex-wrap items-center gap-2 pb-2 overflow-x-auto justify-center md:justify-start">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
              activeCategory === category
                ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* VIRTUAL WOODEN SHELF PRESENTATION */}
      <div className="relative bg-neutral-950/80 rounded-2xl p-6 md:p-8 border border-neutral-850 shadow-inner overflow-hidden">
        {/* Soft atmospheric amber light overlay representing a warm bookstore aisle */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-neutral-200 tracking-tight">
              Virtual Library Bookrack ({filteredBooks.length} items)
            </h3>
          </div>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
            Traditional Row Arrangement
          </p>
        </div>

        {/* Dynamic Shelf Rows */}
        <div className="space-y-12">
          {/* We partition filtered books in rows of ~7 */}
          {Array.from({ length: Math.ceil(filteredBooks.length / 8) }).map((_, rowIndex) => {
            const rowBooks = filteredBooks.slice(rowIndex * 8, (rowIndex + 1) * 8);
            
            return (
              <div key={rowIndex} className="relative pt-6 pb-2" id={`shelf-row-${rowIndex}`}>
                {/* Book Spines aligned side-by-side */}
                <div className="flex items-end gap-3 px-4 md:px-8 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-neutral-800">
                  {rowBooks.map((book) => (
                    <div key={book.id} className="flex flex-col items-center gap-2 group relative">
                      {/* Vertical Spine */}
                      <Book3D 
                        book={book} 
                        size="shelf" 
                        onClick={() => onSelectBook(book)}
                      />
                      
                      {/* Interactive hover item ribbon overview */}
                      <div className="invisible group-hover:visible absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-neutral-900 border border-neutral-800 p-3 rounded-lg shadow-2xl z-50 text-left pointer-events-none">
                        <p className="text-xs font-serif font-bold text-white line-clamp-1">{book.title}</p>
                        <p className="text-[10px] text-neutral-400 italic mb-1.5">by {book.author}</p>
                        <div className="flex justify-between items-center text-[9px] font-mono text-amber-500">
                          <span>${book.price.toFixed(2)}</span>
                          <span>★ {book.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Empty Spacer fallback */}
                  {rowBooks.length === 0 && (
                    <div className="h-44 flex items-center justify-center text-neutral-600 font-mono text-xs italic">
                      Empty row
                    </div>
                  )}
                </div>

                {/* THE PHYSICAL WOODEN BELT / SHELF PLANK */}
                <div 
                  className="w-full h-4 bg-gradient-to-b from-amber-900 to-amber-950 border-t border-amber-800 shadow-[0_10px_20px_rgba(0,0,0,0.6)] rounded-sm relative z-10"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 15px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Grain pattern panel */}
                  <div className="absolute inset-0 bg-neutral-950/20 opacity-30 mix-blend-overlay" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPULAR GRID SPREAD (For standard grid browsing) */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <h3 className="font-serif text-xl font-bold text-white tracking-tight">
            Detailed Book Catalog Table
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div 
              key={book.id}
              className="bg-neutral-950/60 hover:bg-neutral-950 border border-neutral-900 p-5 rounded-xl flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-neutral-800 group"
              id={`catalog-card-${book.id}`}
            >
              {/* Dynamic 3D Book on display */}
              <div className="mb-4 h-60 flex items-center justify-center">
                <Book3D book={book} size="md" onClick={() => onSelectBook(book)} />
              </div>

              {/* Information cluster */}
              <div className="w-full space-y-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-500">
                    {book.category}
                  </span>
                  {book.isBestSeller && (
                    <span className="text-[8px] uppercase tracking-wider font-mono bg-red-600/20 text-red-500 px-1 py-0.5 rounded font-bold">
                      Best
                    </span>
                  )}
                </div>
                
                <h4 
                  onClick={() => onSelectBook(book)}
                  className="font-serif font-bold text-white tracking-tight leading-snug line-clamp-1 cursor-pointer hover:text-amber-400 transition-all"
                >
                  {book.title}
                </h4>
                <p className="text-xs text-neutral-400">By {book.author}</p>
                
                <div className="text-xs font-mono text-amber-500 font-bold">
                  ${book.price.toFixed(2)}
                </div>
              </div>

              {/* Action Ribbon row */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => onSelectBook(book)}
                  className="px-2 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 rounded text-[10px] font-mono uppercase tracking-wider border border-neutral-800 hover:border-neutral-700 transition-all flex items-center justify-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  Read Excerpt
                </button>
                <button
                  onClick={() => onAddToCart(book)}
                  className="px-2 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded text-[10px] font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-1"
                >
                  <PlusCircle className="w-3 h-3" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <Sparkles className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-400 font-serif italic text-sm">
                No matching books are currently sitting on our shelves in this category.
              </p>
              <button 
                onClick={() => setActiveCategory('All')} 
                className="mt-4 px-3 py-1 bg-neutral-850 hover:bg-neutral-850 border border-neutral-850 text-amber-500 text-xs font-mono uppercase tracking-widest rounded-lg"
              >
                Restore Rack Row
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
