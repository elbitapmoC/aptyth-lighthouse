import { query } from "@/lib/db";
import { BibleContent } from "@/lib/types";

export async function getBibleContent(
  book: string,
  chapter: number
): Promise<BibleContent | null> {
  try {
    const result = await query(
      "SELECT book, chapter, content FROM bible WHERE book = $1 AND chapter = $2",
      [book, chapter]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const { book: fetchedBook, chapter: fetchedChapter, content } = result.rows[0];
    return {
      book: fetchedBook,
      chapter: fetchedChapter,
      content,
    };
  } catch (error) {
    console.error("Error fetching Bible content:", error);
    throw new Error("Failed to fetch Bible content");
  }
}

export async function searchBibleContent(
  keyword: string
): Promise<BibleContent[]> {
  try {
    const result = await query(
      "SELECT book, chapter, content FROM bible WHERE content ILIKE $1",
      [`%${keyword}%`]
    );

    return result.rows.map((row) => ({
      book: row.book,
      chapter: row.chapter,
      content: row.content,
    }));
  } catch (error) {
    console.error("Error searching Bible content:", error);
    throw new Error("Failed to search Bible content");
  }
}