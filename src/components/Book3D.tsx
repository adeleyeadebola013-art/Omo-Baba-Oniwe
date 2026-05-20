import React, { useState } from 'react';
import { Book } from '../types';

interface Book3DProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'shelf';
  mode?: 'grid' | 'standalone' | 'active-shelf';
  onClick?: () => void;
  isOpened?: boolean;
}

export const Book3D: React.FC<Book3DProps> = ({
  book,
  size = 'md',
  mode = 'grid',
  onClick,
  isOpened = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const { title, author, coverDesign } = book;
  const { themeColor, textColor, accentColor, pattern, badgeText } = coverDesign;

  // Sizing definitions
  const dimensions = {
    sm: { width: 'w-28', height: 'h-40', fontTitle: 'text-xs', fontAuthor: 'text-[10px]' },
    md: { width: 'w-40', height: 'h-56', fontTitle: 'text-sm', fontAuthor: 'text-xs' },
    lg: { width: 'w-56', height: 'h-80', fontTitle: 'text-lg', fontAuthor: 'text-sm' },
    shelf: { width: 'w-10', height: 'h-48', fontTitle: 'text-[10px]', fontAuthor: 'text-[8px]' },
  }[size];

  // Pattern overlay renderer
  const renderPattern = () => {
    switch (pattern) {
      case 'geometric':
        return (
          <div className="absolute inset-0 overflow-hidden opacity-25">
            <div className="absolute top-0 left-0 w-2/3 h-2/3 border-b border-r border-[currentColor] rounded-br-[40px]" />
            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 border-t border-l border-[currentColor] rounded-tl-[40px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 border border-[currentColor]" />
          </div>
        );
      case 'ornate':
        return (
          <div className="absolute inset-2 border border-[currentColor] opacity-35">
            <div className="absolute inset-1.5 border border-[currentColor] border-dashed" />
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[currentColor] bg-transparent" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[currentColor] bg-transparent" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[currentColor] bg-transparent" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[currentColor] bg-transparent" />
          </div>
        );
      case 'vintage':
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-30">
            <div className="h-2 border-y border-[currentColor]" />
            <div className="flex-1 flex items-center justify-center">
              <div className="w-10/12 h-5/6 border border-[currentColor] flex items-center justify-center">
                <div className="w-4/5 h-4/5 border border-[currentColor] border-dashed" />
              </div>
            </div>
            <div className="h-2 border-y border-[currentColor]" />
          </div>
        );
      case 'modern-art':
        return (
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-1/4 -left-10 w-24 h-24 rounded-full" style={{ backgroundColor: accentColor || '#fbbf24' }} />
            <div className="absolute bottom-1/4 -right-10 w-32 h-32 rounded-full opacity-60" style={{ backgroundColor: accentColor || '#fbbf24' }} />
            <div className="absolute top-1/2 left-1/6 w-12 h-20 -rotate-12 border border-[currentColor]" />
          </div>
        );
      case 'minimalist':
      default:
        return (
          <div className="absolute inset-x-4 top-1/4 bottom-1/4 border-y border-[currentColor]/25 flex flex-col justify-between py-2">
            <div className="w-1/3 h-[2px] mx-auto opacity-40 bg-[currentColor]" />
            <div className="w-1/3 h-[2px] mx-auto opacity-40 bg-[currentColor]" />
          </div>
        );
    }
  };

  // 3D Transforms logic
  /*
    Our 3D Book features:
    - Cover face
    - Paper slide (thickness layers visible on the right)
    - Left hinge Spine edge
  */
  const bookStyle: React.CSSProperties = {
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    cursor: 'pointer',
  };

  // Base transition behavior
  let transformValue = '';
  if (isOpened) {
    // When opened in details view, slightly turned towards the viewer or open state flat
    transformValue = 'rotateY(0deg)';
  } else if (mode === 'grid') {
    transformValue = hovered
      ? 'rotateX(5deg) rotateY(-10deg) rotateZ(0deg) scale3d(1.06, 1.06, 1.06) translate3d(0, -8px, 15px)'
      : 'rotateX(10deg) rotateY(-20deg) rotateZ(-2deg) translate3d(0, 0, 0)';
  } else if (mode === 'active-shelf') {
    transformValue = hovered
      ? 'translateY(-18px) rotateY(-5deg) scale(1.05)'
      : 'translateY(0) rotateY(0deg) scale(1)';
  }

  const innerBookStyle: React.CSSProperties = {
    transform: transformValue,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s',
  };

  // Render book for normal views
  if (size === 'shelf') {
    // Spine-facing vertical book on a bookshelf
    return (
      <div
        className="relative flex-none h-44 cursor-pointer group"
        style={{ perspective: '800px', width: '30px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        id={`shelf-book-${book.id}`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-l shadow-[3px_5px_15px_rgba(0,0,0,0.4)] origin-left h-full w-7 text-[9px] uppercase font-bold flex flex-col justify-between items-center py-4 transition-all duration-300"
          style={{
            backgroundColor: themeColor,
            color: textColor,
            borderLeft: '1.5px solid rgba(255,255,255,0.25)',
            borderRight: '1px solid rgba(0,0,0,0.3)',
            transform: hovered ? 'rotateY(-25deg) translateZ(10px) scale(1.04)' : 'rotateY(0deg)',
          }}
        >
          {/* Accent foil marker */}
          <div className="w-1.5 h-6 rounded-sm opacity-70" style={{ backgroundColor: accentColor }} />
          {/* Vertical rotated title */}
          <div className="flex-1 overflow-hidden pointer-events-none mt-2 flex items-center justify-center">
            <span
              className="whitespace-nowrap inline-block text-[8px] tracking-widest font-mono text-center"
              style={{
                writingMode: 'vertical-rl',
                textTransform: 'uppercase',
                maxWidth: '12px',
                lineHeight: '1.1',
              }}
            >
              {title}
            </span>
          </div>
          {/* Publisher logo/initials marker */}
          <span className="text-[7px] opacity-60 tracking-tighter">OBO</span>
        </div>
        {/* Soft floating glow behind hovered book on shelf */}
        {hovered && (
          <div className="absolute inset-0 bg-yellow-500/10 blur-xl -translate-y-4 transition-all duration-300" />
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative select-none ${dimensions.width} ${dimensions.height}`}
      style={bookStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      id={`book-container-${book.id}`}
    >
      <div
        className="w-full h-full relative rounded-r-[4px]"
        style={innerBookStyle}
      >
        {/* SPINE EFFECT EDGE (Hinge shadow on the left) */}
        <div className="absolute top-0 bottom-0 left-0 w-[6px] bg-gradient-to-r from-black/50 to-transparent z-40 rounded-l-[2px]" />
        
        {/* SPINE THICKNESS SIDE (Visible on 3D tilt - Left Side Spine) */}
        <div
          className="absolute top-[2px] bottom-[2px] left-0 w-[18px] bg-neutral-900 border-y border-neutral-800 origin-left z-20"
          style={{
            transform: 'rotateY(-90deg) translateX(-18px)',
            backgroundColor: themeColor,
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(255,255,255,0.1))',
            borderColor: 'rgba(0,0,0,0.2)',
          }}
        />

        {/* PAGES THICKNESS SIDE (Visible on 3D tilt - Right Side Pages Layer) */}
        <div
          className="absolute top-[3px] bottom-[3px] right-0 w-[15px] bg-neutral-100 origin-right transition-all z-10"
          style={{
            transform: 'rotateY(90deg) translateX(15px)',
            backgroundImage: 'repeating-linear-gradient(90deg, #f5f5f5, #f5f5f5 2px, #e2e8f0 2px, #e2e8f0 4px)',
            boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.15)',
            borderRadius: '0 2px 2px 0',
          }}
        />

        {/* FRONT COVER */}
        <div
          className={`absolute inset-0 rounded-r-[5px] flex flex-col justify-between p-4 flex-none border-l-[3.5px] border-black/30 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] select-none`}
          style={{
            backgroundColor: themeColor,
            color: textColor,
            transform: `translateZ(6px)`, // Keeps font distinct and layered forward
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Content Border Patterns */}
          {renderPattern()}

          {/* Header Badge */}
          <div className="relative z-10 flex justify-between items-center text-[9px] uppercase font-mono tracking-widest opacity-80">
            <span>{book.category}</span>
            {badgeText && (
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-500 text-neutral-950 font-bold">
                {badgeText}
              </span>
            )}
            {book.isBestSeller && !badgeText && (
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-red-600 font-bold" style={{ color: coverDesign.textColor }}>
                BEST
              </span>
            )}
          </div>

          {/* Book Title / Author Cluster */}
          <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center my-4">
            <h3 className={`font-serif tracking-tight font-semibold leading-tight mb-2 ${dimensions.fontTitle}`}>
              {title}
            </h3>
            <div className="w-8 h-[1px] my-1" style={{ backgroundColor: accentColor || 'currentColor', opacity: 0.6 }} />
            <p className={`font-sans font-medium tracking-wide italic opacity-90 ${dimensions.fontAuthor}`}>
              {author}
            </p>
          </div>

          {/* Spine foot details */}
          <div className="relative z-10 flex justify-between items-end text-[8px] opacity-75 font-mono tracking-wider">
            <span>{book.year}</span>
            <span className="font-bold border border-current px-1 text-[7px] leading-tight">OBO PRESS</span>
          </div>
        </div>

        {/* DIAGONAL BASE SHADOW UNDER BOOK */}
        <div
          className="absolute inset-0 bg-neutral-950/40 rounded-r-[5px] pointer-events-none transition-all duration-300 blur-md"
          style={{
            transform: hovered 
              ? 'translate3d(12px, 15px, -30px) scale(0.95) rotateX(10deg)' 
              : 'translate3d(4px, 6px, -15px) scale(0.98)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
};

// 3D Flippable Interactive Book (Open and Close Hinge Cover view)
interface InteractiveBookViewerProps {
  book: Book;
  onClose: () => void;
}

export const InteractiveBookViewer: React.FC<InteractiveBookViewerProps> = ({ book, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeColor, textColor, accentColor } = book.coverDesign;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 md:p-8 bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-neutral-800 max-w-4xl w-full mx-auto shadow-2xl overflow-hidden relative">
      
      {/* Absolute Header close marker */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-all z-50 text-xs tracking-wider uppercase font-mono"
      >
        ✕ Close Preview
      </button>

      {/* LEFT: Complete 3D Flip Book Animator Container */}
      <div className="flex flex-col items-center justify-center py-6 select-none" style={{ perspective: '1600px' }}>
        
        <p className="text-xs font-mono text-neutral-400 mb-6 text-center tracking-widest uppercase">
          {isOpen ? '⭐ Interactive Pages Shared' : '👉 Tap / Hover Spine Cover to Read'}
        </p>

        {/* 3D Binder Canvas */}
        <div 
          className="relative w-64 h-96 cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1500px',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* INDEPENDENT 3D Spine Anchor structure */}
          <div 
            className="w-full h-full relative transition-transform duration-1000 ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              // Dynamic positioning shift in space upon opening
              transform: isOpen ? 'rotateX(5deg) rotateY(15deg) translateX(80px)' : 'rotateX(8deg) rotateY(-25deg) translateX(0px)',
            }}
          >
            {/* AGED CREAM INSIDE PAGES BOOKBLOCK (Static right leaf) */}
            <div 
              className="absolute inset-[3px] rounded-r-md flex flex-col justify-start p-6 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 border border-neutral-300 z-10 shadow-lg text-neutral-800"
              style={{
                transform: 'translateZ(1px)',
              }}
            >
              <div className="h-full flex flex-col justify-between font-serif">
                <div>
                  <div className="flex justify-between items-center text-[10px] tracking-wide text-neutral-500 uppercase font-sans border-b border-neutral-300 pb-1.5 mb-3">
                    <span>Chapter I</span>
                    <span>Page 1</span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 leading-snug mb-3">
                    {book.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-700 font-serif whitespace-pre-line select-text cursor-text" onClick={(e) => e.stopPropagation()}>
                    "{book.excerpt}"
                  </p>
                </div>
                
                <div className="text-center font-sans text-[9px] text-neutral-400 tracking-wider pt-2 border-t border-neutral-200/50">
                  Omo Baba Oniwe Digital Shelf
                </div>
              </div>
            </div>

            {/* FLIP FRONT COVER (Swing Left anchor) */}
            <div 
              className="absolute inset-0 rounded-r shadow-2xl origin-left z-30 transition-transform duration-1000 ease-in-out border-l-4 border-black/40"
              style={{
                backgroundColor: themeColor,
                color: textColor,
                transform: isOpen ? 'rotateY(-145deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
                boxShadow: isOpen ? '10px 10px 30px rgba(0,0,0,0.6)' : 'none',
              }}
            >
              {/* FACE FRONT OUTSIDE COVER */}
              <div 
                className="absolute inset-0 flex flex-col justify-between p-6 rounded-r border-l-2 border-white/10"
                style={{
                  backfaceVisibility: 'hidden',
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* Visual cover line styles */}
                <div className="absolute inset-2 border border-current/20 pointer-events-none" />
                <div className="text-center text-[10px] tracking-widest uppercase font-mono opacity-80 mt-2">
                  {book.category}
                </div>
                
                <div className="text-center my-auto flex flex-col items-center">
                  <h3 className="font-serif font-bold text-xl tracking-tight leading-snug mb-2 select-none">
                    {book.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-amber-400 my-2" style={{ backgroundColor: accentColor }} />
                  <p className="font-sans italic text-xs tracking-wide opacity-90 select-none">
                    {book.author}
                  </p>
                </div>

                <div className="flex justify-between text-[9px] font-mono opacity-70">
                  <span>OBO PRESS</span>
                  <span>{book.year}</span>
                </div>
              </div>

              {/* FACE BACK INSIDE COVER (Aged parchment pattern backing) */}
              <div 
                className="absolute inset-0 bg-neutral-800 text-neutral-200 p-6 flex flex-col justify-between rounded-r uppercase font-serif"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  width: '100%',
                  height: '100%',
                  borderRight: '4px solid rgba(0,0,0,0.5)',
                  backgroundImage: 'radial-gradient(circle, rgba(64,64,64,0.15) 0%, rgba(38,38,38,0.7) 100%)',
                }}
              >
                <div className="border border-neutral-700/60 p-4 h-full flex flex-col justify-between items-center text-center">
                  <h4 className="text-xs text-neutral-400 tracking-widest font-sans font-bold">INSIDE JACKET</h4>
                  <div>
                    <p className="text-[10px] text-amber-100/80 tracking-wider normal-case italic leading-relaxed mb-1">
                      "A book is a companion that travels across oceans of timelines."
                    </p>
                    <span className="text-[8px] text-neutral-500 font-sans tracking-tight">Omo Baba Oniwe legacy</span>
                  </div>
                  <div className="h-6 w-1 bg-neutral-600 rounded-full" />
                </div>
              </div>
            </div>

            {/* Spine Depth Back cover sheet to conceal empty hollow gap */}
            <div 
              className="absolute inset-0 bg-neutral-950/80 rounded z-0"
              style={{
                transform: 'translateZ(-2px)',
              }}
            ></div>
          </div>
        </div>

        {/* Action helper */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 font-mono text-xs uppercase tracking-widest rounded-lg transition-all border border-neutral-700"
        >
          {isOpen ? '📖 Close Cover' : '📖 Swing Cover Open'}
        </button>
      </div>

      {/* RIGHT: High-fidelity details & description metadata */}
      <div className="flex-1 flex flex-col justify-between self-stretch text-left">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-wider rounded border border-amber-500/20">
              {book.category}
            </span>
            {book.isBestSeller && (
              <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-wider rounded border border-red-500/20">
                ⭐ Bestseller
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              {book.title}
            </h2>
            <p className="text-sm md:text-base text-neutral-400 mt-1">
              By <span className="font-semibold text-neutral-200">{book.author}</span>
            </p>
          </div>

          <p className="text-neutral-300 text-xs md:text-sm leading-relaxed whitespace-pre-line font-serif">
            {book.synopsis}
          </p>

          {/* Book physical bio indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 border-y border-neutral-800 font-mono">
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase">Released</span>
              <span className="text-xs text-neutral-300 font-semibold">{book.year}</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase">Pages</span>
              <span className="text-xs text-neutral-300 font-semibold">{book.pages}</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase">Publisher</span>
              <span className="text-xs text-neutral-300 font-semibold truncate max-w-full block" title={book.publisher}>
                {book.publisher}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 uppercase">ISBN-13</span>
              <span className="text-xs text-neutral-300 font-semibold">{book.isbn}</span>
            </div>
          </div>
        </div>

        {/* Dynamic checkout or add to cart button footer */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex justify-between items-center bg-neutral-900 p-3 rounded-lg border border-neutral-800">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-mono">Investment price</span>
              <span className="text-xl font-mono text-amber-400 block">${book.price.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Community Trust</span>
              <span className="text-sm font-semibold text-neutral-200 block">★ {book.rating} / 5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
