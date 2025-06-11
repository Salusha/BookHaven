import { Book, Author, Category } from "./types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Fiction",
    description: "Novels, short stories, and literary fiction",
    image: "/placeholder.svg",
    bookCount: 234,
  },
  {
    id: "2",
    name: "Non-Fiction",
    description: "Biography, history, science, and more",
    image: "/placeholder.svg",
    bookCount: 189,
  },
  {
    id: "3",
    name: "Mystery & Thriller",
    description: "Suspenseful and thrilling stories",
    image: "/placeholder.svg",
    bookCount: 156,
  },
  {
    id: "4",
    name: "Romance",
    description: "Love stories and romantic novels",
    image: "/placeholder.svg",
    bookCount: 98,
  },
  {
    id: "5",
    name: "Science Fiction",
    description: "Futuristic and imaginative stories",
    image: "/placeholder.svg",
    bookCount: 134,
  },
  {
    id: "6",
    name: "Self-Help",
    description: "Personal development and improvement",
    image: "/placeholder.svg",
    bookCount: 87,
  },
];

export const authors: Author[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    bio: "Bestselling author of contemporary fiction with over 2 million books sold worldwide.",
    image: "/placeholder.svg",
    bookCount: 12,
    website: "https://sarahjohnson.com",
  },
  {
    id: "2",
    name: "Michael Chen",
    bio: "Award-winning science fiction writer known for his innovative storytelling.",
    image: "/placeholder.svg",
    bookCount: 8,
  },
  {
    id: "3",
    name: "Emma Davis",
    bio: "Romance novelist and New York Times bestselling author.",
    image: "/placeholder.svg",
    bookCount: 15,
  },
  {
    id: "4",
    name: "Robert Wilson",
    bio: "Master of mystery and suspense with 20 years of writing experience.",
    image: "/placeholder.svg",
    bookCount: 18,
  },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Garden",
    author: "Sarah Johnson",
    description:
      "A captivating story about love, loss, and the magic that connects us all. When Emma inherits her grandmother's mysterious garden, she discovers more than just flowers and memories.",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 342,
    category: "Fiction",
    isbn: "978-0-123456-78-9",
    publisher: "Harmony Books",
    publishedDate: "2024-01-15",
    pages: 384,
    language: "English",
    coverImage: "/placeholder.svg",
    inStock: true,
    featured: true,
    bestseller: true,
    newRelease: false,
  },
  {
    id: "2",
    title: "Quantum Dreams",
    author: "Michael Chen",
    description:
      "In a world where consciousness can be transferred between bodies, detective Alex Reed must solve a murder that defies the laws of physics and reality.",
    price: 22.99,
    rating: 4.6,
    reviewCount: 189,
    category: "Science Fiction",
    isbn: "978-0-234567-89-0",
    publisher: "Future Press",
    publishedDate: "2023-11-03",
    pages: 432,
    language: "English",
    coverImage: "/placeholder.svg",
    inStock: true,
    featured: true,
    bestseller: false,
    newRelease: true,
  },
  {
    id: "3",
    title: "Hearts in Harmony",
    author: "Emma Davis",
    description:
      "When classical pianist Luna meets rock guitarist Jake, their worlds collide in the most beautiful way. A story of music, passion, and finding love where you least expect it.",
    price: 19.99,
    rating: 4.7,
    reviewCount: 278,
    category: "Romance",
    isbn: "978-0-345678-90-1",
    publisher: "Love Stories Publishing",
    publishedDate: "2024-02-14",
    pages: 298,
    language: "English",
    coverImage: "/placeholder.svg",
    inStock: true,
    featured: true,
    bestseller: false,
    newRelease: false,
  },
  {
    id: "4",
    title: "The Silent Witness",
    author: "Robert Wilson",
    description:
      "Detective Morgan Kane thought she had seen it all, until a case involving a mute child witness to a brutal crime challenges everything she believes about justice.",
    price: 26.99,
    rating: 4.9,
    reviewCount: 456,
    category: "Mystery & Thriller",
    isbn: "978-0-456789-01-2",
    publisher: "Crime & Mystery Co.",
    publishedDate: "2023-09-22",
    pages: 368,
    language: "English",
    coverImage: "/placeholder.svg",
    inStock: true,
    featured: false,
    bestseller: true,
    newRelease: false,
  },
  {
    id: "5",
    title: "Mindful Living",
    author: "Dr. Patricia Martinez",
    description:
      "Transform your life with practical mindfulness techniques. This comprehensive guide offers tools for reducing stress, improving focus, and finding inner peace.",
    price: 21.99,
    rating: 4.5,
    reviewCount: 123,
    category: "Self-Help",
    isbn: "978-0-567890-12-3",
    publisher: "Wellness Books",
    publishedDate: "2024-03-01",
    pages: 256,
    language: "English",
    coverImage: "/placeholder.svg",
    inStock: true,
    featured: false,
    bestseller: false,
    newRelease: true,
  },
  {
    id: "6",
    title: "The History of Tomorrow",
    author: "Prof. David Thompson",
    description:
      "A fascinating exploration of how historical patterns can help us understand and predict future trends in technology, society, and human behavior.",
    price: 28.99,
    rating: 4.4,
    reviewCount: 87,
    category: "Non-Fiction",
    isbn: "978-0-678901-23-4",
    publisher: "Academic Press",
    publishedDate: "2023-12-10",
    pages: 512,
    language: "English",
    coverImage: "/placeholder.svg",
    inStock: true,
    featured: false,
    bestseller: false,
    newRelease: false,
  },
];

export const featuredBooks = books.filter((book) => book.featured);
export const bestsellers = books.filter((book) => book.bestseller);
export const newReleases = books.filter((book) => book.newRelease);

export const getBooksByCategory = (categoryName: string) =>
  books.filter((book) => book.category === categoryName);

export const getBooksByAuthor = (authorName: string) =>
  books.filter((book) => book.author === authorName);

export const getBookById = (id: string) => books.find((book) => book.id === id);
