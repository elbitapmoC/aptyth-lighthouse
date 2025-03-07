import { NextResponse } from "next/server";
import { query } from "@/lib/db";

/**
 * Fetches Bible content based on the provided book and chapter.
 * @param {string} book - The name of the book in the Bible.
 * @param {number} chapter - The chapter number.
 * @returns {Promise<any>} - The Bible content for the specified book and chapter.
 */
async function fetchBibleContent(book: string, chapter: number): Promise<any> {
  const sql = `
    SELECT verse_number, text
    FROM bible_content
    WHERE book = $1 AND chapter = $2
    ORDER BY verse_number
  `;
  const params = [book, chapter];
  return query(sql, params);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");

  if (!book || !chapter) {
    return NextResponse.json(
      { error: "Missing required query parameters: book and chapter" },
      { status: 400 }
    );
  }

  const chapterNumber = parseInt(chapter, 10);
  if (isNaN(chapterNumber) || chapterNumber <= 0) {
    return NextResponse.json(
      { error: "Invalid chapter number. It must be a positive integer." },
      { status: 400 }
    );
  }

  try {
    const verses = await fetchBibleContent(book, chapterNumber);
    if (verses.length === 0) {
      return NextResponse.json(
        { error: "No content found for the specified book and chapter." },
        { status: 404 }
      );
    }
    return NextResponse.json({ book, chapter: chapterNumber, verses });
  } catch (error) {
    console.error("Error fetching Bible content:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching Bible content." },
      { status: 500 }
    );
  }
}
