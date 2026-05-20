export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CoverDesign {
  themeColor: string;      // Tailwind class or hex e.g., 'bg-amber-800' or '#78350f'
  textColor: string;      // Tailwind class e.g., 'text-amber-100'
  accentColor: string;     // Tailwind class or hex e.g., 'bg-yellow-500' or '#f59e0b'
  pattern: 'minimalist' | 'geometric' | 'ornate' | 'vintage' | 'modern-art';
  badgeText?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  pages: number;
  year: number;
  isbn: string;
  publisher: string;
  synopsis: string;
  excerpt: string;         // An interactive snippet users can "read" in the 3D book
  coverDesign: CoverDesign;
  reviews: Review[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export type ActiveTab = 'home' | 'shelf' | 'recommend' | 'custom' | 'reviews';
