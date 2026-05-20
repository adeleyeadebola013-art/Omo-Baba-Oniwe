import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_BOOKS } from './data';
import { Book, CartItem, ActiveTab } from './types';
import { Shelf } from './components/Shelf';
import { Recommender } from './components/Recommender';
import { AddBookAdmin } from './components/AddBookAdmin';
import { StoreCartAndCheckout } from './components/StoreCartAndCheckout';
import { InteractiveBookViewer } from './components/Book3D';
import { 
  BookOpen, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Wand2, 
  BookMarked, 
  PlusCircle, 
  MapPin, 
  ChevronRight, 
  Feather, 
  Heart,
  Clock
} from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('shelf');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart Handlers
  const handleAddToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.id === book.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (bookId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.book.id === bookId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Admin New Book Addition
  const handleAddCustomBook = (newBook: Book) => {
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  // Searching logic
  const searchedBooks = useMemo(() => {
    if (!searchQuery) return books;
    const query = searchQuery.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  // Total cart quantities
  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Feature book (The first bestseller)
  const heroBook = useMemo(() => {
    return books.find((b) => b.isBestSeller) || books[0];
  }, [books]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* GLOBAL HEADER BAR */}
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('shelf')}>
            <div className="w-10 h-10 bg-amber-500/15 rounded-xl border border-amber-500/25 flex items-center justify-center text-amber-500 font-serif font-bold text-lg shadow-lg shadow-amber-500/5">
              OBO
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-white tracking-tight leading-none">
                OmoBabaOniwe
              </h1>
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-semibold">
                Bookstore & Press
              </span>
            </div>
          </div>

          {/* Center navigation controls */}
          <nav className="flex items-center gap-1.5 md:gap-3 bg-neutral-900/60 p-1 rounded-xl border border-neutral-900">
            {[
              { id: 'shelf', label: 'Bookracks', icon: BookMarked },
              { id: 'recommend', label: 'Concierge', icon: Wand2 },
              { id: 'custom', label: 'Self Press', icon: Feather },
              { id: 'reviews', label: 'Cart Basket', icon: ShoppingBag, count: totalCartCount },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as ActiveTab);
                    setSearchQuery(''); // reset search on tab shift
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] leading-none font-bold font-mono ${isActive ? 'bg-neutral-950 text-amber-400' : 'bg-amber-500 text-neutral-950'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right system metadata overview */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            {/* Clock */}
            <div className="hidden lg:flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-850">
              <Clock className="w-3.5 h-3.5 text-neutral-500 animate-pulse" />
              <span>Lagos / Peak Reading Hour</span>
            </div>
          </div>

        </div>
      </header>

      {/* SEARCH CAPABILITIES OVERLAY FOR SHELF TAB */}
      {activeTab === 'shelf' && (
        <section className="bg-neutral-950 border-b border-neutral-900 px-4 py-8 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 animate-bounce" /> Unveiling Traditional & Global masteries
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-none">
                Browse Africa’s Finest Virtual Bookshelves
              </h2>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
                Hover, slide out, and flip open titles to read live traditional excerpts directly on our textured physical 3D canvas!
              </p>
            </div>

            {/* Input Search box */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by Title, Author, or Category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/40 rounded-xl p-3 pl-10 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-white rounded text-[9px] font-mono mt-0.5"
                >
                  Clear Clear
                </button>
              )}
            </div>

          </div>
        </section>
      )}

      {/* MAIN SCREEN CANVAS */}
      <main className="flex-1 px-4 py-8 md:px-8 max-w-7xl w-full mx-auto space-y-12">
        
        {/* HERO FEATURE BOOK BANNER (Only on bookshelf tab before search query hits) */}
        {activeTab === 'shelf' && !searchQuery && heroBook && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-radial-gradient from-amber-500/[0.04] to-transparent p-6 md:p-10 rounded-2xl border border-neutral-900/80 flex flex-col md:flex-row gap-8 items-center"
            id="featured-hero-display"
          >
            {/* Visual 3D Book card */}
            <div className="flex-none h-64 w-44 flex items-center justify-center">
              <div 
                onClick={() => setSelectedBook(heroBook)}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-500 ease-out"
              >
                {/* Embedded dynamic look */}
                <div className="absolute -inset-1 rounded-lg bg-amber-500/10 blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative rounded-lg shadow-2xl p-2 bg-neutral-900/60 border border-neutral-800">
                  <div className="w-[120px] h-44 rounded-sm flex flex-col justify-between p-3" style={{ backgroundColor: heroBook.coverDesign.themeColor, color: heroBook.coverDesign.textColor }}>
                    <span className="text-[7px] uppercase font-mono tracking-widest">{heroBook.category}</span>
                    <span className="font-serif text-[10px] font-bold text-center leading-tight">{heroBook.title}</span>
                    <span className="text-right text-[7px] font-sans italic opacity-85">by {heroBook.author}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information side */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider rounded border border-amber-500/20">
                  ★ Bestseller of the Month
                </span>
                <span className="px-2 py-0.5 bg-neutral-900 text-neutral-400 text-[10px] font-mono uppercase tracking-wider rounded border border-neutral-850">
                  Heritage Highlight
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                  {heroBook.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Written by <span className="font-semibold text-neutral-200">{heroBook.author}</span> — Publisher: <span className="italic">{heroBook.publisher}</span>
                </p>
              </div>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-serif max-w-2xl">
                {heroBook.synopsis}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={() => setSelectedBook(heroBook)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-lg"
                >
                  📖 Open 3D Page Reader
                </button>
                <button
                  onClick={() => handleAddToCart(heroBook)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 font-mono text-xs uppercase tracking-widest rounded-lg border border-neutral-800 hover:border-neutral-700 transition"
                >
                  Add to Cart (${heroBook.price.toFixed(2)})
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* COMPONENT VIEWS DISPATCHER */}
        <div className="transition-all duration-500">
          {activeTab === 'shelf' && (
            <Shelf
              books={searchedBooks}
              onSelectBook={(book) => setSelectedBook(book)}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'recommend' && (
            <Recommender
              books={books}
              onSelectBook={(book) => setSelectedBook(book)}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'custom' && (
            <AddBookAdmin onAddBook={handleAddCustomBook} />
          )}

          {activeTab === 'reviews' && (
            <StoreCartAndCheckout
              cart={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
            />
          )}
        </div>

      </main>

      {/* ABSOLUTE OVERLAY MODAL: 3D FLIPPABLE INTERACTIVE READER DRAWER */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedBook(null)}
          >
            {/* Modal Card body */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-4xl relative"
              onClick={(e) => e.stopPropagation()} // halt backdrop close triggers
            >
              <InteractiveBookViewer 
                book={selectedBook} 
                onClose={() => setSelectedBook(null)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER COBWEB MARGIN LINES */}
      <footer className="mt-auto bg-neutral-950 border-t border-neutral-900 px-4 py-8 md:px-8 text-neutral-400 font-sans text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1.5">
            <h4 className="font-serif text-sm font-semibold text-white">
              Omo Baba Oniwe Bookstore & Literary Press
            </h4>
            <p className="text-[11px] text-neutral-500 max-w-md">
              A premium, digitally preserved legacy Bookstore dedicated to oral poetry compilation, folklore translation, educational school books, and modern global creative engineering.
            </p>
          </div>

          <div className="space-y-2 text-center md:text-right font-mono text-[10px]">
            <p>Ile la n wo, ka to so omo l\'oruko</p>
            <div className="flex justify-center md:justify-end items-center gap-1.5 text-neutral-500">
              <span>Made in preservation of arts</span>
              <span>© {new Date().getFullYear()} OBO Press</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
