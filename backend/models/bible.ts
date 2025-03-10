import db from "../db/mod.ts";

/**
 * Represents a Bible book in the system.
 */
export interface BibleBook {
  id: number;
  name: string;
  testament: string;
}

/**
 * Represents a Bible chapter in the system.
 */
export interface BibleChapter {
  chapterNumber: number;
}

/**
 * Represents a Bible verse in the system.
 */
export interface BibleVerse {
  verseNumber: number;
  text: string;
}

/**
 * Fetches all Bible books from the database.
 * @returns An array of BibleBook objects.
 */
export async function getAllBibleBooks(): Promise<BibleBook[]> {
  const queryText = "SELECT id, name, testament FROM bible_books ORDER BY id";
  const result = await db.query(queryText);

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    testament: row.testament,
  }));
}

/**
 * Fetches all chapters for a specific Bible book.
 * @param bookId - The ID of the Bible book.
 * @returns An array of BibleChapter objects.
 */
export async function getChaptersByBookId(bookId: number): Promise<BibleChapter[]> {
  const queryText =
    "SELECT chapter_number FROM bible_chapters WHERE book_id = $1 ORDER BY chapter_number";
  const result = await db.query(queryText, [bookId]);

  return result.rows.map((row) => ({
    chapterNumber: row.chapter_number,
  }));
}

/**
 * Fetches all verses for a specific chapter in a Bible book.
 * @param bookId - The ID of the Bible book.
 * @param chapterNumber - The chapter number.
 * @returns An array of BibleVerse objects.
 */
export async function getVersesByChapter(
  bookId: number,
  chapterNumber: number
): Promise<BibleVerse[]> {
  const queryText =
    "SELECT verse_number, text FROM bible_verses WHERE book_id = $1 AND chapter_number = $2 ORDER BY verse_number";
  const result = await db.query(queryText, [bookId, chapterNumber]);

  return result.rows.map((row) => ({
    verseNumber: row.verse_number,
    text: row.text,
  }));
}
