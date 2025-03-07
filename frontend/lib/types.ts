export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface Book {
  name: string;
  chapters: number;
}

export interface BibleReaderProps {
  initialBook?: string;
  initialChapter?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}
