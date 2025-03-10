import db from "../db/mod.ts";

/**
 * Represents a Bible verse.
 */
interface BibleVerse {
  verse_number: number;
  text: string;
}

/**
 * Fetches Bible content for a specific book and chapter.
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number.
 * @returns A promise resolving to an array of Bible verses.
 */
export async function getBibleContent(
  book: string,
  chapter: number
): Promise<BibleVerse[]> {
  const queryText = `
    SELECT verse_number, text
    FROM bible_content
    WHERE book = $1 AND chapter = $2
    ORDER BY verse_number
  `;
  const result = await db.query(queryText, [book, chapter]);

  return result.rows.map((row) => ({
    verse_number: row.verse_number,
    text: row.text,
  }));
}

/**
 * Adds a new Bible verse to the database.
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number.
 * @param verseNumber - The verse number.
 * @param text - The text of the verse.
 * @returns A promise resolving to the ID of the inserted verse.
 */
export async function addBibleVerse(
  book: string,
  chapter: number,
  verseNumber: number,
  text: string
): Promise<number> {
  const queryText = `
    INSERT INTO bible_content (book, chapter, verse_number, text)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  const result = await db.query(queryText, [book, chapter, verseNumber, text]);

  return result.rows[0].id;
}

/**
 * Updates an existing Bible verse in the database.
 * @param id - The ID of the verse to update.
 * @param text - The new text of the verse.
 * @returns A promise resolving to the number of rows updated.
 */
export async function updateBibleVerse(
  id: number,
  text: string
): Promise<number> {
  const queryText = `
    UPDATE bible_content
    SET text = $1
    WHERE id = $2
  `;
  const result = await db.query(queryText, [text, id]);

  return result.rowCount;
}

/**
 * Deletes a Bible verse from the database.
 * @param id - The ID of the verse to delete.
 * @returns A promise resolving to the number of rows deleted.
 */
export async function deleteBibleVerse(id: number): Promise<number> {
  const queryText = `
    DELETE FROM bible_content
    WHERE id = $1
  `;
  const result = await db.query(queryText, [id]);

  return result.rowCount;
}
