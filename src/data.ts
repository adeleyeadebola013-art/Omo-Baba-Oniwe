import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'things-fall-apart',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    category: 'African Classics',
    price: 14.99,
    rating: 4.8,
    pages: 209,
    year: 1958,
    isbn: '978-0385474542',
    publisher: 'Heinemann Educational Books',
    synopsis: 'A classic of African literature, this novel chronicles the life of Okonkwo, a leader and local wrestling champion in Umuofia—a fictional group of nine villages in Nigeria—and the arrival of white missionaries and colonial forces.',
    excerpt: 'Okonkwo was well known throughout the nine villages and even beyond. His fame rested on solid personal achievements. As a young man of eighteen he had brought honor to his village by throwing Amalinze the Cat. Amalinze was the great wrestler who for seven years was unbeaten, from Umuofia to Mbaino.',
    isBestSeller: true,
    coverDesign: {
      themeColor: '#7c2d12', // Warm Terracotta Dark
      textColor: '#ffedd5',  // Very warm bright cream
      accentColor: '#fbbf24', // Amber accent stripe
      pattern: 'ornate'
    },
    reviews: [
      { id: 'tfa-r1', userName: 'Tunde O.', rating: 5, comment: 'A timeless masterpiece that everyone must read. The 3D cover matches the earthy tones of the original Heinemann editions!', date: '2026-03-12' },
      { id: 'tfa-r2', userName: 'Sarah K.', rating: 4, comment: 'Powerful writing, beautifully crafted characters, and rich cultural details.', date: '2026-04-01' }
    ]
  },
  {
    id: 'half-of-a-yellow-sun',
    title: 'Half of a Yellow Sun',
    author: 'Chimamanda Ngozi Adichie',
    category: 'African Classics',
    price: 16.99,
    rating: 4.9,
    pages: 433,
    year: 2006,
    isbn: '978-1400095209',
    publisher: 'Fourth Estate',
    synopsis: 'A haunting and beautiful novel set during the Nigerian-Biafran War of the late 1960s, portraying the lives of five characters swept up in the struggle for Biafra\'s short-lived independence.',
    excerpt: 'Master was a short man, not much taller than Ugwu, with a dense crown of curly hair and a face that looked as if it had been built out of dark brick. He wore thick, scholarly glasses that grew cloudy whenever he got excited, which was often.',
    isBestSeller: true,
    isNewArrival: false,
    coverDesign: {
      themeColor: '#991b1b', // Deep crimson
      textColor: '#fef08a',  // Pale yellow (representing the sun)
      accentColor: '#eab308', // Yellow sun emblem background
      pattern: 'modern-art'
    },
    reviews: [
      { id: 'hys-r1', userName: 'Amina B.', rating: 5, comment: 'Adichie captures grief, love, and history so elegantly. Heartbreaking and gorgeous.', date: '2026-02-18' }
    ]
  },
  {
    id: 'baba-segi-wives',
    title: "The Secret Lives of Baba Segi's Wives",
    author: 'Lola Shoneyin',
    category: 'Contemporary Fiction',
    price: 13.50,
    rating: 4.7,
    pages: 245,
    year: 2010,
    isbn: '978-0061946059',
    publisher: 'HarperCollins',
    synopsis: 'A multi-layered, humorous, yet poignant novel exposing the secrets, rivalries, and bonds in a polygamous Nigerian household after the entry of Baba Segi\'s fourth, college-educated wife, Bolanle.',
    excerpt: 'To the untrained eye, Baba Segi was a giant of a man, wide-shouldered and formidable. But inside, he was as delicate as a newborn snail. Bolanle entered our household like a drop of fresh water into a boiling pot of palm oil.',
    isBestSeller: false,
    coverDesign: {
      themeColor: '#065f46', // Emerald Green
      textColor: '#ecfdf5',  // Super light mint
      accentColor: '#f59e0b', // Gold banner
      pattern: 'geometric'
    },
    reviews: [
      { id: 'bs-r1', userName: 'Femi G.', rating: 5, comment: 'Laughed out loud several times, but it has so much deep sociological insight. Lola Shoneyin is a genius.', date: '2026-05-10' }
    ]
  },
  {
    id: 'famished-road',
    title: 'The Famished Road',
    author: 'Ben Okri',
    category: 'African Classics',
    price: 15.99,
    rating: 4.6,
    pages: 500,
    year: 1991,
    isbn: '978-0385425131',
    publisher: 'Jonathan Cape',
    synopsis: 'Winner of the Booker Prize, this magical realist novel follows Azaro, an abiku or spirit-child, living in an unnamed African city, who constantly struggles against his spirit companions who wish to pull him back to their idyllic world.',
    excerpt: 'In the beginning there was a river. The river became a road and the road branched out to the whole world. And because the road was once a river it was always hungry. In that land of beginnings spirits mingled with the living, and children died and were born again.',
    coverDesign: {
      themeColor: '#3b0764', // Deep mystical purple
      textColor: '#f5f3ff',  // Soft lavender cream
      accentColor: '#06b6d4', // Bright cyan mystical glow
      pattern: 'vintage'
    },
    reviews: [
      { id: 'fr-r1', userName: 'Ngozi A.', rating: 4, comment: 'Poetic, dreamlike, and profoundly traditional yet modern. Reading it feels like a spirit journey.', date: '2026-01-20' }
    ]
  },
  {
    id: 'yoruba-wisdom',
    title: 'Yoruba Culture & Proverbial Wisdom',
    author: 'Dr. Kunle Babalola',
    category: 'History & Heritage',
    price: 18.00,
    rating: 4.9,
    pages: 280,
    year: 2021,
    isbn: '978-0192837315',
    publisher: 'Omo Baba Oniwe Press',
    synopsis: 'A beautifully researched compilation of traditional Yoruba oral histories, worldview, philosophy, and over 500 hand-translated proverbs with their deep metaphorical meanings explained for the modern reader.',
    excerpt: 'Ile la n wo, ka to so omo l\'oruko—"We look at the home before we name a child." In this proverb lies the foundational core of Yoruba sociological wisdom, prioritizing community identity and context above individual naming.',
    isNewArrival: true,
    coverDesign: {
      themeColor: '#1e3a8a', // Royal Indigo Blue (Woven Aso-Oke style)
      textColor: '#eff6ff',  // Bright light ice blue
      accentColor: '#d97706', // Rich bronze copper
      pattern: 'ornate'
    },
    reviews: [
      { id: 'yw-r1', userName: 'Rotimi I.', rating: 5, comment: 'Produced right here by Omo Baba Oniwe Press! The compilation of proverbs is unmatched. Standard reference for our household.', date: '2026-05-15' }
    ]
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Personal Growth',
    price: 15.00,
    rating: 4.9,
    pages: 320,
    year: 2018,
    isbn: '978-0735211291',
    publisher: 'Avery',
    synopsis: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits and break bad ones.',
    excerpt: 'An atomic habit refers to a tiny change, a marginal gain, a 1 percent improvement. But when aggregated over a lifetime, these tiny compound gains yield massive, life-altering breakthroughs. Breakthroughs are the result of compounding patterns.',
    isBestSeller: true,
    coverDesign: {
      themeColor: '#111827', // Pitch Black
      textColor: '#f3f4f6',  // Pure bright gray
      accentColor: '#10b981', // Neon Emerald Green stripe
      pattern: 'minimalist'
    },
    reviews: [
      { id: 'ah-r1', userName: 'David J.', rating: 5, comment: 'Phenomenal book. Practical, actionable, life-changing. Clean cover accent!', date: '2026-03-24' }
    ]
  },
  {
    id: 'clean-code',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Tech & Science',
    price: 29.99,
    rating: 4.7,
    pages: 464,
    year: 2008,
    isbn: '978-0132350884',
    publisher: 'Prentice Hall',
    synopsis: 'Even bad code can run. But if code isn\'t clean, it can bring a development organization to its knees. Master software craftsman Robert C. Martin presents a revolutionary paradigm with Clean Code, describing the principles and craft of writing elegant, clean systems.',
    excerpt: 'The ratio of time spent reading code versus writing it is well over 10 to 1. We are constantly reading old code in order to write new code. Therefore, making it easy to read makes it easy to write. Focus on clarity at all levels.',
    coverDesign: {
      themeColor: '#1e293b', // Deep Slate
      textColor: '#f8fafc',  // Crisp white
      accentColor: '#38bdf8', // Cool Tech Cyan
      pattern: 'geometric'
    },
    reviews: [
      { id: 'cc-r1', userName: 'Developer T.', rating: 5, comment: 'Essential reading for every single programmer. It transformed how I write software.', date: '2026-04-14' }
    ]
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi & Fantasy',
    price: 12.99,
    rating: 4.8,
    pages: 604,
    year: 1965,
    isbn: '978-0441172719',
    publisher: 'Chilton Books',
    synopsis: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
    excerpt: 'A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows. To begin your study of the life of Muad\'Dib, then, take care that you first place him in his time...',
    coverDesign: {
      themeColor: '#451a03', // Sandalwood Amber Brown
      textColor: '#fef3c7',  // Amber Cream
      accentColor: '#f59e0b', // Glowing Orange Spice
      pattern: 'vintage'
    },
    reviews: [
      { id: 'dn-r1', userName: 'Jessica M.', rating: 4, comment: 'An absolute masterpiece of worldbuilding. The desert description feels dry in your throat.', date: '2026-02-09' }
    ]
  },
  {
    id: 'creative-act',
    title: 'The Creative Act: A Way of Being',
    author: 'Rick Rubin',
    category: 'Creative Arts',
    price: 24.00,
    rating: 4.9,
    pages: 432,
    year: 2023,
    isbn: '978-0593652886',
    publisher: 'Penguin Press',
    synopsis: 'A beautiful and gentle guide to cultivating a creative life, from legendary music producer Rick Rubin. He shares his wisdom on how to tune in to the universe, silence your doubts, and offer your unique vision to the world.',
    excerpt: 'The object of art is not to make saleable goods. It is to enter a state of being which makes life itself beautiful. Simply by bringing ourselves fully, we are engaging in a sacred dialogue with the source of all things.',
    isNewArrival: true,
    coverDesign: {
      themeColor: '#18181b', // Matte dark zinc
      textColor: '#ffffff',  // Stark white
      accentColor: '#ffffff', // Minimalist central dot
      pattern: 'minimalist'
    },
    reviews: [
      { id: 'ca-r1', userName: 'Kole A.', rating: 5, comment: 'Minimal, profound, and deeply meditative. It sits on my nightstand and I open a page every morning.', date: '2026-05-18' }
    ]
  }
];

export const CATEGORIES = [
  'All Books',
  'African Classics',
  'Contemporary Fiction',
  'History & Heritage',
  'Personal Growth',
  'Tech & Science',
  'Sci-Fi & Fantasy',
  'Creative Arts'
];

export const PRESET_COLORS = [
  { name: 'Terracotta', bg: '#7c2d12', text: '#ffedd5', accent: '#fbbf24' },
  { name: 'Royal Blue', bg: '#1e3a8a', text: '#eff6ff', accent: '#f59e0b' },
  { name: 'Forest Green', bg: '#064e3b', text: '#ecfdf5', accent: '#f59e0b' },
  { name: 'Imperial Maroon', bg: '#581c87', text: '#f3e8ff', accent: '#fb7185' },
  { name: 'Deep Carbon', bg: '#18181b', text: '#ffffff', accent: '#3b82f6' },
  { name: 'Amber Sandwood', bg: '#451a03', text: '#fef3c7', accent: '#f97316' },
  { name: 'Vibrant Teal', bg: '#115e59', text: '#f0fdfa', accent: '#10b981' }
];

export const DESIGN_PATTERNS = [
  { id: 'minimalist', name: 'Ultra Minimalist', desc: 'Centralized typography, sleek and thin borders' },
  { id: 'geometric', name: 'Geometric Modern', desc: 'Structured grid lines and architectural shapes' },
  { id: 'ornate', name: 'Classic Ornate', desc: 'Elegant vintage frames and sophisticated gold lines' },
  { id: 'vintage', name: 'Vintage Novel', desc: 'Faded, distressed headers with traditional borders' },
  { id: 'modern-art', name: 'Abstract Art', desc: 'Vibrant shapes and expressive asymmetrical blocks' }
];
