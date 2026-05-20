import React, { useState } from 'react';
import { Book } from '../types';
import { PRESET_COLORS, DESIGN_PATTERNS } from '../data';
import { Book3D } from './Book3D';
import { Sparkles, FileText, Check, Library } from 'lucide-react';

interface AddBookAdminProps {
  onAddBook: (book: Book) => void;
}

export const AddBookAdmin: React.FC<AddBookAdminProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Personal Growth');
  const [price, setPrice] = useState(14.99);
  const [pages, setPages] = useState(250);
  const [synopsis, setSynopsis] = useState('');
  const [excerpt, setExcerpt] = useState('');
  
  // Custom cover styling State
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [pattern, setPattern] = useState<'minimalist' | 'geometric' | 'ornate' | 'vintage' | 'modern-art'>('minimalist');
  const [badgeText, setBadgeText] = useState('NEW');

  const [publishSuccess, setPublishSuccess] = useState(false);

  // Derive dynamic custom book representation for the Live 3D Preview Canvas
  const preset = PRESET_COLORS[selectedColorIndex] || PRESET_COLORS[0];
  const draftBook: Book = {
    id: 'draft-book',
    title: title || 'Inscribed Title...',
    author: author || 'Scribe Name...',
    category,
    price: Number(price),
    rating: 5.0,
    pages: Number(pages),
    year: 2026,
    isbn: '978-' + Math.floor(1000000000 + Math.random() * 9000000000),
    publisher: 'Self Published / OBO Press',
    synopsis: synopsis || 'This contains the custom synopsis text compiled by the author.',
    excerpt: excerpt || 'This contains the excerpt snippet rendering live inside the flippable page margins.',
    coverDesign: {
      themeColor: preset.bg,
      textColor: preset.text,
      accentColor: preset.accent,
      pattern: pattern,
      badgeText: badgeText || undefined
    },
    reviews: []
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;

    const finalBookId = title.toLowerCase().replace(/[^a-z0-str]/g, '-') + '-' + Math.floor(100 + Math.random() * 900);
    const publishedBook: Book = {
      ...draftBook,
      id: finalBookId,
      year: new Date().getFullYear(),
      reviews: [
        {
          id: 'review-welcome',
          userName: 'Omo Baba Oniwe Scribe',
          rating: 5,
          comment: 'Welcome to our bookshelves! Your book is officially published and sitting on the shelves.',
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };

    onAddBook(publishedBook);
    setPublishSuccess(true);

    // Reset Form
    setTitle('');
    setAuthor('');
    setSynopsis('');
    setExcerpt('');
    setBadgeText('NEW');

    setTimeout(() => {
      setPublishSuccess(false);
    }, 4500);
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="cover-creator-container">
      
      {/* LEFT COLUMN: Controls form */}
      <div className="lg:col-span-7 bg-neutral-950/70 border border-neutral-900 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="border-b border-neutral-900 pb-4">
          <legend className="font-serif text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Library className="w-5 h-5 text-amber-500" />
            Baba Oniwe Self-Publishing Press
          </legend>
          <p className="text-xs text-neutral-400 mt-1">Configure your book parameters, craft your custom cover design, and publish instantly.</p>
        </div>

        {publishSuccess && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Success! "{(draftBook.title !== 'Inscribed Title...' ? draftBook.title : 'Your Book')}" has officially been registered and placed on the virtual bookracks!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Book Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Echoes of the Village"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Author Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Olawale Babatunde"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Category Shelf</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="African Classics">African Classics</option>
                <option value="Contemporary Fiction">Contemporary Fiction</option>
                <option value="History & Heritage">History & Heritage</option>
                <option value="Personal Growth">Personal Growth</option>
                <option value="Tech & Science">Tech & Science</option>
                <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                <option value="Creative Arts">Creative Arts</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.99"
                max="99.99"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Page Count</label>
              <input
                type="number"
                min="10"
                max="1200"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {/* COLOR SWATCHER */}
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-2">
              Jacket Leather Theme Color
            </label>
            <div className="flex flex-wrap gap-3">
              {PRESET_COLORS.map((col, index) => (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-9 h-9 rounded-full relative transition-all border shadow ${
                    selectedColorIndex === index 
                      ? 'scale-110 border-white ring-2 ring-amber-500/50' 
                      : 'border-neutral-800 hover:border-neutral-600'
                  }`}
                  style={{ backgroundColor: col.bg }}
                  title={col.name}
                >
                  {selectedColorIndex === index && (
                    <span 
                      className="absolute inset-0 flex items-center justify-center text-[10px]"
                      style={{ color: col.text }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* DESIGN PATTERNS BOX SELECTOR */}
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-2">
              Spine / Border Design Pattern
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {DESIGN_PATTERNS.map((pat) => (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => setPattern(pat.id as any)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    pattern === pat.id 
                      ? 'bg-amber-500/10 border-amber-500 text-white' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <span className="block text-xs font-bold capitalize mb-0.5">{pat.name}</span>
                  <span className="block text-[8px] text-neutral-500 truncate">{pat.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Optional Cover Badge Badge Text</label>
            <input
              type="text"
              placeholder="e.g. AUTHOR'S EDITION"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Jacket Synopsis Synopsis</label>
              <textarea
                placeholder="Enter some introductory background details to explain the book theme..."
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                rows={4}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none resize-none font-serif"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">Book Excerpt excerpt (Opens Live 3D Reader pages)</label>
              <textarea
                placeholder="Enter a descriptive couple of sentences. Visitors can 'open' the cover and read this segment live inside the interactive sheet margins..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={4}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none resize-none font-serif"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-1"
          >
            <FileText className="w-4 h-4" />
            Publish Draft & Align on Shelf
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: LIVE REFRESHING 3D CANVAS PREVIEW */}
      <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center self-stretch relative overflow-hidden text-center max-h-[500px] lg:max-h-full">
        {/* Soft radial aura */}
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full mb-6">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">OBO CUSTOM PRESS</span>
          <h4 className="font-serif text-base text-neutral-200 font-bold tracking-tight">
            Live 3D Speculative Canvas
          </h4>
          <p className="text-[10px] text-neutral-500 uppercase font-mono mt-0.5">Hover or Tilt the design preset</p>
        </div>

        {/* The Live Interactive Render Canvas */}
        <div className="h-72 w-full flex items-center justify-center my-4 relative">
          <Book3D book={draftBook} size="lg" />
        </div>

        <div className="text-[10px] font-mono text-neutral-400/80 max-w-xs mt-6">
          This preview updates dynamically as you key in values, selecting patterns and colors on the left panel!
        </div>
      </div>

    </div>
  );
};
